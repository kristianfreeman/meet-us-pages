import { FC } from 'hono/jsx';
import { Context } from 'hono';
import { createDb } from '../../db';
import { resources } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { AdminLayout } from '../../components/AdminLayout';

interface ResourcesListProps {
  resources: any[];
}

export const ResourcesList: FC<ResourcesListProps> = ({ resources }) => {
  return (
    <div class="admin-content">
      <div class="admin-header">
        <h1 class="admin-title">Resources</h1>
        <a href="/admin/resources/new" class="btn btn-primary">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Resource
        </a>
      </div>
      
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>URL</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource.id}>
                <td>{resource.title}</td>
                <td>
                  <span class="badge badge-secondary">{resource.category}</span>
                </td>
                <td>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" class="link">
                    {resource.url}
                  </a>
                </td>
                <td>{resource.order || 0}</td>
                <td>
                  <div class="table-actions">
                    <a href={`/admin/resources/${resource.id}/edit`} class="btn-icon" title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </a>
                    <button class="btn-icon btn-danger" title="Delete" data-delete-id={resource.id}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('click', async (e) => {
            if (e.target.closest('[data-delete-id]')) {
              const button = e.target.closest('[data-delete-id]');
              const resourceId = button.getAttribute('data-delete-id');
              
              if (confirm('Are you sure you want to delete this resource?')) {
                try {
                  const response = await fetch('/api/resources/' + resourceId, {
                    method: 'DELETE',
                    credentials: 'same-origin'
                  });
                  
                  if (response.ok) {
                    window.location.reload();
                  } else {
                    alert('Error deleting resource');
                  }
                } catch (error) {
                  alert('Error deleting resource: ' + error.message);
                }
              }
            }
          });
        `
      }} />
    </div>
  );
};

export async function adminResourcesHandler(c: Context<{ Bindings: any }>) {
  const db = createDb(c.env.DB);
  const resourceRows = await db.select().from(resources).orderBy(resources.order).all();
  const user = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/resources" userName={user?.name}>
      <ResourcesList resources={resourceRows} />
    </AdminLayout>
  );
}