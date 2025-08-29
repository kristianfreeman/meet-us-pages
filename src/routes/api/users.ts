import { Context } from "hono";
import { createDb } from "../../db";
import { user, account, session } from "../../lib/auth/schema";
import { eq } from "drizzle-orm";

export const deleteUser = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const userId = c.req.param("id");
  const db = createDb(c.env.DB);
  
  const currentUser = c.get('user');
  
  if (currentUser.id === userId) {
    return c.json({ error: "Cannot delete your own account" }, 400);
  }
  
  try {
    await db.delete(session).where(eq(session.userId, userId));
    await db.delete(account).where(eq(account.userId, userId));
    await db.delete(user).where(eq(user.id, userId));
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
};