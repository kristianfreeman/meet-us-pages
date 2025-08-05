import { Context, Next } from 'hono';
import { createAuth, AuthEnv } from '../lib/auth';

export interface AuthContext {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  session?: {
    id: string;
    userId: string;
  };
}

export async function authMiddleware(c: Context<{ Bindings: AuthEnv }, any, {}>, next: Next) {
  const auth = createAuth(c.env);
  
  try {
    // Get the session using Better Auth's API
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    
    if (!session || !session.user) {
      return c.redirect('/login');
    }
    
    // Add user and session to context
    c.set('user', session.user);
    c.set('session', session.session);
    
    await next();
  } catch (error) {
    // If session verification fails, redirect to login
    return c.redirect('/login');
  }
}

// Helper function to check if user is authenticated in routes
export function requireAuth(c: Context): AuthContext {
  const user = c.get('user');
  const session = c.get('session');
  
  if (!user || !session) {
    throw new Error('Unauthorized');
  }
  
  return { user, session };
}