import { FC } from "hono/jsx";
import { Context } from "hono";
import { AdminLayout } from "../../components/AdminLayout";
import { EventForm } from "../../components/EventForm";
import { createDb } from "../../db";
import { events } from "../../db/schema";
import { eq } from "drizzle-orm";

export const newEventHandler = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const currentUser = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/events" userName={currentUser?.name}>
      <EventForm />
    </AdminLayout>
  );
};

export const editEventHandler = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const eventId = c.req.param("id");
  const db = createDb(c.env.DB);
  
  const event = await db.select().from(events).where(eq(events.id, eventId)).get();
  
  if (!event) {
    return c.notFound();
  }
  
  const currentUser = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/events" userName={currentUser?.name}>
      <EventForm event={event} isEdit={true} />
    </AdminLayout>
  );
};