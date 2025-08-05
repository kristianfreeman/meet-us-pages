import { Context } from 'hono';
import { createDb } from '../../db';
import { resources } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function deleteResource(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);
  
  try {
    await db.delete(resources).where(eq(resources.id, id));
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete resource' }, 500);
  }
}

export async function createResource(c: Context<{ Bindings: any }>) {
  const db = createDb(c.env.DB);
  const body = await c.req.json();
  
  try {
    const newResource = {
      id: nanoid(),
      title: body.title,
      description: body.description || null,
      url: body.url,
      category: body.category,
      order: body.order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.insert(resources).values(newResource);
    return c.json({ success: true, resource: newResource });
  } catch (error) {
    return c.json({ error: 'Failed to create resource' }, 500);
  }
}

export async function updateResource(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);
  const body = await c.req.json();
  
  try {
    const updatedResource = {
      title: body.title,
      description: body.description || null,
      url: body.url,
      category: body.category,
      order: body.order || 0,
      updatedAt: new Date().toISOString()
    };
    
    await db.update(resources).set(updatedResource).where(eq(resources.id, id));
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to update resource' }, 500);
  }
}