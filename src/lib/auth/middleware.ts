import { Context, Next } from 'hono';
import { auth, AuthEnv } from './better-auth';

export const betterAuthMiddleware = async (c: Context<{ Bindings: AuthEnv }>, next: Next) => {
  const authInstance = auth(c.env);
  
  try {
    const session = await authInstance.api.getSession({ headers: c.req.raw.headers });
    
    if (!session) {
      return c.redirect('/login');
    }
    
    // Set session in context for use in routes
    c.set('session', session);
    c.set('user', session.user);
    
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.redirect('/login');
  }
};