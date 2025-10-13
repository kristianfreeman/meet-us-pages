import { Context } from 'hono';
import { createDb } from '../../db';
import { events } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { createEventSchema, updateEventSchema } from '../../lib/validation';

export async function deleteEvent(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);
  
  try {
    await db.delete(events).where(eq(events.id, id));
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete event' }, 500);
  }
}

export async function createEvent(c: Context<{ Bindings: any }>) {
  const db = createDb(c.env.DB);

  try {
    const body = await c.req.json();

    // Validate input
    const validatedData = createEventSchema.parse(body);

    const newEvent = {
      id: nanoid(),
      title: validatedData.title,
      description: validatedData.description || null,
      date: validatedData.date,
      endDate: validatedData.endDate || null,
      location: validatedData.location || null,
      url: validatedData.url || null,
      type: validatedData.type || null,
      tags: validatedData.tags || null,
      featured: validatedData.featured || false,
      virtual: validatedData.virtual || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await db.insert(events).values(newEvent);
    return c.json({ success: true, event: newEvent });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: error }, 400);
    }
    return c.json({ error: 'Failed to create event' }, 500);
  }
}

export async function updateEvent(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);

  try {
    const body = await c.req.json();

    // Validate input
    const validatedData = updateEventSchema.parse(body);

    const updatedEvent = {
      ...(validatedData.title !== undefined && { title: validatedData.title }),
      ...(validatedData.description !== undefined && { description: validatedData.description }),
      ...(validatedData.date !== undefined && { date: validatedData.date }),
      ...(validatedData.endDate !== undefined && { endDate: validatedData.endDate }),
      ...(validatedData.location !== undefined && { location: validatedData.location }),
      ...(validatedData.url !== undefined && { url: validatedData.url }),
      ...(validatedData.type !== undefined && { type: validatedData.type }),
      ...(validatedData.tags !== undefined && { tags: validatedData.tags }),
      ...(validatedData.featured !== undefined && { featured: validatedData.featured }),
      ...(validatedData.virtual !== undefined && { virtual: validatedData.virtual }),
      updatedAt: new Date().toISOString()
    };

    await db.update(events).set(updatedEvent).where(eq(events.id, id));
    return c.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: error }, 400);
    }
    return c.json({ error: 'Failed to update event' }, 500);
  }
}