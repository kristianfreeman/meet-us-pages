import { FC } from 'hono/jsx';
import { Context } from 'hono';
import { createDb } from '../../db';
import { events } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { AdminLayout } from '../../components/AdminLayout';

interface EventsListProps {
  events: any[];
}

export const EventsList: FC<EventsListProps> = ({ events }) => {
  return (
    <div class="admin-content">
      <div class="admin-header">
        <h1 class="admin-title">Events</h1>
        <a href="/admin/events/new" class="btn btn-primary">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Event
        </a>
      </div>
      
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Type</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location || 'Virtual'}</td>
                <td>{event.type || 'Event'}</td>
                <td>
                  <span class={`badge ${event.featured ? 'badge-success' : 'badge-secondary'}`}>
                    {event.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div class="table-actions">
                    <a href={`/admin/events/${event.id}/edit`} class="btn-icon" title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </a>
                    <button class="btn-icon btn-danger" title="Delete" data-delete-id={event.id}>
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
              const eventId = button.getAttribute('data-delete-id');
              
              if (confirm('Are you sure you want to delete this event?')) {
                try {
                  const response = await fetch('/api/events/' + eventId, {
                    method: 'DELETE',
                    credentials: 'same-origin'
                  });
                  
                  if (response.ok) {
                    window.location.reload();
                  } else {
                    alert('Error deleting event');
                  }
                } catch (error) {
                  alert('Error deleting event: ' + error.message);
                }
              }
            }
          });
        `
      }} />
    </div>
  );
};

export async function adminEventsHandler(c: Context<{ Bindings: any }>) {
  const db = createDb(c.env.DB);
  const eventRows = await db.select().from(events).orderBy(desc(events.date)).all();
  const user = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/events" userName={user?.name}>
      <EventsList events={eventRows} />
    </AdminLayout>
  );
}