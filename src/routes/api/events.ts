import { Context } from 'hono';
import { createDb } from '../../db';
import { events } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { createEventSchema, updateEventSchema } from '../../lib/validation';

export async function getEvents(c: Context<{ Bindings: any }>) {
  const db = createDb(c.env.DB);

  try {
    const eventRows = await db.select().from(events).orderBy(desc(events.date)).all();
    return c.json({ success: true, events: eventRows });
  } catch (error) {
    return c.json({ error: 'Failed to fetch events' }, 500);
  }
}

export async function getEvent(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);

  try {
    const event = await db.select().from(events).where(eq(events.id, id)).get();
    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }
    return c.json({ success: true, event });
  } catch (error) {
    return c.json({ error: 'Failed to fetch event' }, 500);
  }
}

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
      region: validatedData.region || null,
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
      ...(validatedData.region !== undefined && { region: validatedData.region }),
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