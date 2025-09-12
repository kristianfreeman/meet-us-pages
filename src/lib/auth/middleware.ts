import { Context, Next } from 'hono';
import { auth, AuthEnv } from './better-auth';

export const betterAuthMiddleware = async (c: Context<{ Bindings: AuthEnv }>, next: Next) => {
  const authInstance = auth(c.env);
  
  try {
    const session = await authInstance.api.getSession({ headers: c.req.raw.headers });
    
    if (!session) {
      // For API routes, return 401 instead of redirecting
      if (c.req.path.startsWith('/api/')) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
      return c.redirect('/login');
    }
    
    // Set session in context for use in routes
    c.set('session', session);
    c.set('user', session.user);
    
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    // For API routes, return 401 instead of redirecting
    if (c.req.path.startsWith('/api/')) {
      return c.json({ error: 'Authentication failed' }, 401);
    }
    return c.redirect('/login');
  }
};