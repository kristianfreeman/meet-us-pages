import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Re-export auth tables
export * from '../lib/auth/schema';

// Events table
export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: text('date').notNull(), // ISO date string
  endDate: text('end_date'), // ISO date string
  location: text('location'),
  url: text('url'),
  type: text('type'), // conference, summit, meetup, etc.
  tags: text('tags'), // JSON array of tags
  featured: integer('featured', { mode: 'boolean' }).default(false),
  virtual: integer('virtual', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Resources table
export const resources = sqliteTable('resources', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  category: text('category').notNull(), // community, gettingStarted, developerTools
  order: integer('order').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Better Auth tables will be automatically generated
// We'll export the type definitions for TypeScript
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;