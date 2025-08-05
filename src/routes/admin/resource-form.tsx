import { FC } from "hono/jsx";
import { Context } from "hono";
import { AdminLayout } from "../../components/AdminLayout";
import { ResourceForm } from "../../components/ResourceForm";
import { createDb } from "../../db";
import { resources } from "../../db/schema";
import { eq } from "drizzle-orm";

export const newResourceHandler = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const currentUser = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/resources" userName={currentUser?.name}>
      <ResourceForm />
    </AdminLayout>
  );
};

export const editResourceHandler = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const resourceId = c.req.param("id");
  const db = createDb(c.env.DB);
  
  const resource = await db.select().from(resources).where(eq(resources.id, resourceId)).get();
  
  if (!resource) {
    return c.notFound();
  }
  
  const currentUser = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/resources" userName={currentUser?.name}>
      <ResourceForm resource={resource} isEdit={true} />
    </AdminLayout>
  );
};