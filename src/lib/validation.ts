import { z } from 'zod';

// Event validation schema
export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(5000, 'Description must be less than 5000 characters').optional().nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format').optional().nullable(),
  location: z.string().max(200, 'Location must be less than 200 characters').optional().nullable(),
  url: z.string().url('Must be a valid URL').optional().nullable(),
  type: z.string().max(100, 'Type must be less than 100 characters').optional().nullable(),
  tags: z.string().max(500, 'Tags must be less than 500 characters').optional().nullable(),
  featured: z.boolean().optional().default(false),
  virtual: z.boolean().optional().default(false),
});

export const updateEventSchema = createEventSchema.partial();

// Resource validation schema
export const createResourceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(5000, 'Description must be less than 5000 characters').optional().nullable(),
  url: z.string().url('Must be a valid URL'),
  category: z.enum(['gettingStarted', 'developerTools', 'community'], {
    errorMap: () => ({ message: 'Category must be one of: gettingStarted, developerTools, community' })
  }),
  order: z.number().int().min(0).optional().default(0),
});

export const updateResourceSchema = createResourceSchema.partial();

// Type exports
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
