import { Context } from 'hono';
import { createDb } from '../../db';
import { events } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

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
  const body = await c.req.json();
  
  try {
    const newEvent = {
      id: nanoid(),
      title: body.title,
      description: body.description || null,
      date: body.date,
      endDate: body.endDate || null,
      location: body.location || null,
      url: body.url || null,
      type: body.type || null,
      tags: body.tags || null,
      featured: body.featured || false,
      virtual: body.virtual || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.insert(events).values(newEvent);
    return c.json({ success: true, event: newEvent });
  } catch (error) {
    return c.json({ error: 'Failed to create event' }, 500);
  }
}

export async function updateEvent(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);
  const body = await c.req.json();
  
  try {
    const updatedEvent = {
      title: body.title,
      description: body.description || null,
      date: body.date,
      endDate: body.endDate || null,
      location: body.location || null,
      url: body.url || null,
      type: body.type || null,
      tags: body.tags || null,
      featured: body.featured || false,
      virtual: body.virtual || false,
      updatedAt: new Date().toISOString()
    };
    
    await db.update(events).set(updatedEvent).where(eq(events.id, id));
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to update event' }, 500);
  }
}