import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export interface AuthEnv {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

// Create auth instance function that can be called in route handlers
export const auth = (env: AuthEnv) => {
  const db = drizzle(env.DB, { schema });
  
  // Provide a fallback secret for development
  const secret = env.BETTER_AUTH_SECRET || 'development-secret-at-least-32-characters-long-do-not-use-in-production';
  
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite'
    }),
    secret,
    baseURL: env.BETTER_AUTH_URL || 'http://localhost:8787',
    basePath: '/api', // Important: set base path to /api not /api/auth
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    trustedOrigins: [
      env.BETTER_AUTH_URL || 'http://localhost:8787',
      'http://localhost:8787',
      'http://localhost:8788',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
  });
};