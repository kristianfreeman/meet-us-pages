import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: '19eb4a88-f170-4f6c-bf7b-7e8ad925ded3',
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});