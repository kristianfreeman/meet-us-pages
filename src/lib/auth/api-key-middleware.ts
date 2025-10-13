import { Context, Next } from 'hono';

type Bindings = {
  API_KEY?: string;
};

export const apiKeyMiddleware = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const authHeader = c.req.header('Authorization');
  const apiKey = c.env.API_KEY;

  if (!apiKey) {
    return c.json({ error: 'API key authentication not configured' }, 500);
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid Authorization header. Use: Authorization: Bearer YOUR_API_KEY' }, 401);
  }

  const providedKey = authHeader.substring(7); // Remove 'Bearer ' prefix

  if (providedKey !== apiKey) {
    return c.json({ error: 'Invalid API key' }, 401);
  }

  await next();
};
