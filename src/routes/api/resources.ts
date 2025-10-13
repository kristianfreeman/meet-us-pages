import { Context } from 'hono';
import { createDb } from '../../db';
import { resources } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { createResourceSchema, updateResourceSchema } from '../../lib/validation';

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

  try {
    const body = await c.req.json();

    // Validate input
    const validatedData = createResourceSchema.parse(body);

    const newResource = {
      id: nanoid(),
      title: validatedData.title,
      description: validatedData.description || null,
      url: validatedData.url,
      category: validatedData.category,
      order: validatedData.order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await db.insert(resources).values(newResource);
    return c.json({ success: true, resource: newResource });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: error }, 400);
    }
    return c.json({ error: 'Failed to create resource' }, 500);
  }
}

export async function updateResource(c: Context<{ Bindings: any }>) {
  const id = c.req.param('id');
  const db = createDb(c.env.DB);

  try {
    const body = await c.req.json();

    // Validate input
    const validatedData = updateResourceSchema.parse(body);

    const updatedResource = {
      ...(validatedData.title !== undefined && { title: validatedData.title }),
      ...(validatedData.description !== undefined && { description: validatedData.description }),
      ...(validatedData.url !== undefined && { url: validatedData.url }),
      ...(validatedData.category !== undefined && { category: validatedData.category }),
      ...(validatedData.order !== undefined && { order: validatedData.order }),
      updatedAt: new Date().toISOString()
    };

    await db.update(resources).set(updatedResource).where(eq(resources.id, id));
    return c.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: error }, 400);
    }
    return c.json({ error: 'Failed to update resource' }, 500);
  }
}