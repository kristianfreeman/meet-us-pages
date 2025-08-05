import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import Database from 'better-sqlite3';

// This configuration is used by Better Auth CLI for schema generation
// It uses a local SQLite database for development
const db = new Database('dev.db');

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite'
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});