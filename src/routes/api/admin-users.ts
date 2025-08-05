import { Context } from "hono";
import { createDb } from "../../db";
import { user, account } from "../../lib/auth/schema";
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const createUserByAdmin = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const { email, password, name } = await c.req.json();
  
  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }

  if (password.length < 8) {
    return c.json({ error: "Password must be at least 8 characters" }, 400);
  }

  const db = createDb(c.env.DB);
  
  try {
    // Check if user already exists
    const existingUser = await db.select().from(user).where(eq(user.email, email)).get();
    if (existingUser) {
      return c.json({ error: "User with this email already exists" }, 400);
    }

    // Create user
    const userId = nanoid();
    const hashedPassword = await hash(password, 10);
    const now = Date.now();

    await db.insert(user).values({
      id: userId,
      email,
      name: name || null,
      emailVerified: true, // Admin-created users are considered verified
      createdAt: now,
      updatedAt: now,
    });

    // Create password account
    await db.insert(account).values({
      id: nanoid(),
      accountId: email,
      providerId: "credential",
      userId,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    return c.json({ 
      success: true, 
      user: { id: userId, email, name } 
    });
    
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
};