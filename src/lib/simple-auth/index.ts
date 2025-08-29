import { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { SignJWT, jwtVerify } from 'jose';

export interface AuthEnv {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

// Simple JWT-based auth for Cloudflare Workers
export class SimpleAuth {
  private secret: Uint8Array;
  
  constructor(secret: string) {
    this.secret = new TextEncoder().encode(secret);
  }
  
  async createSession(user: User): Promise<string> {
    const jwt = await new SignJWT({ user })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.secret);
    
    return jwt;
  }
  
  async verifySession(token: string): Promise<User | null> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      return payload.user as User;
    } catch {
      return null;
    }
  }
}

// Middleware for protecting routes
export async function simpleAuthMiddleware(c: Context<{ Bindings: AuthEnv }>, next: Function) {
  const token = getCookie(c, 'auth-token');
  
  if (!token) {
    return c.redirect('/login');
  }
  
  const auth = new SimpleAuth(c.env.BETTER_AUTH_SECRET);
  const user = await auth.verifySession(token);
  
  if (!user) {
    return c.redirect('/login');
  }
  
  c.set('user', user);
  await next();
}

// Login handler
export async function handleLogin(c: Context<{ Bindings: AuthEnv }>) {
  const { email, password } = await c.req.parseBody();
  
  // For demo purposes, check against hardcoded admin credentials
  // In production, you'd check against the database
  if (email === 'admin@cloudflare.com' && password === 'Cloudflare123!') {
    const auth = new SimpleAuth(c.env.BETTER_AUTH_SECRET);
    const user: User = {
      id: 'admin_user_1',
      email: 'admin@cloudflare.com',
      name: 'Admin User'
    };
    
    const token = await auth.createSession(user);
    setCookie(c, 'auth-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return c.redirect('/admin');
  }
  
  return c.redirect('/login?error=invalid');
}

// Logout handler
export async function handleLogout(c: Context) {
  setCookie(c, 'auth-token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 0
  });
  
  return c.redirect('/login');
}