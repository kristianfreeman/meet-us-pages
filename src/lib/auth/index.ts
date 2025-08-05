import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../auth/schema';

export interface AuthEnv {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

// Create auth instance - must be called within route handler
export function createAuth(env: AuthEnv) {
  const db = drizzle(env.DB, { schema });
  
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite'
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    trustedOrigins: [
      env.BETTER_AUTH_URL,
      'http://localhost:8787',
      'http://localhost:8788',
    ],
  });
}