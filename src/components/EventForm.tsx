import { FC } from "hono/jsx";

interface EventFormProps {
  event?: {
    id: string;
    title: string;
    description: string | null;
    date: string;
    end_date: string | null;
    location: string | null;
    url: string | null;
    type: string | null;
    tags: string | null;
    featured: boolean;
    virtual: boolean;
  };
  isEdit?: boolean;
}

export const EventForm: FC<EventFormProps> = ({ event, isEdit = false }) => {
  return (
    <div class="admin-content">
      <div class="admin-header">
        <h1>{isEdit ? 'Edit Event' : 'Create New Event'}</h1>
      </div>

      <form class="admin-form" id="eventForm">
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={event?.title || ''}
            placeholder="Event title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Event description"
            value={event?.description || ''}
          ></textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label for="date">Start Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={event?.date || ''}
            />
          </div>

          <div class="form-group">
            <label for="end_date">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={event?.end_date || ''}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event?.location || ''}
            placeholder="Event location"
          />
        </div>

        <div class="form-group">
          <label for="url">URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={event?.url || ''}
            placeholder="https://example.com"
          />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label for="type">Type</label>
            <select id="type" name="type">
              <option value="">Select type</option>
              <option value="conference" selected={event?.type === 'conference'}>Conference</option>
              <option value="workshop" selected={event?.type === 'workshop'}>Workshop</option>
              <option value="meetup" selected={event?.type === 'meetup'}>Meetup</option>
              <option value="summit" selected={event?.type === 'summit'}>Summit</option>
              <option value="demo" selected={event?.type === 'demo'}>Demo</option>
            </select>
          </div>

          <div class="form-group">
            <label for="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={event?.tags || ''}
              placeholder="tag1,tag2,tag3"
            />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <div class="form-checkbox">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={event?.featured || false}
              />
              <label for="featured">Featured Event</label>
            </div>
          </div>

          <div class="form-group">
            <div class="form-checkbox">
              <input
                type="checkbox"
                id="virtual"
                name="virtual"
                checked={event?.virtual || false}
              />
              <label for="virtual">Virtual Event</label>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <a href="/admin/events" class="btn btn-secondary">Cancel</a>
          <button type="submit" class="btn btn-primary">
            {isEdit ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('eventForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const data = {
              title: formData.get('title'),
              description: formData.get('description') || null,
              date: formData.get('date'),
              end_date: formData.get('end_date') || null,
              location: formData.get('location') || null,
              url: formData.get('url') || null,
              type: formData.get('type') || null,
              tags: formData.get('tags') || null,
              featured: formData.has('featured'),
              virtual: formData.has('virtual')
            };
            
            try {
              const url = ${isEdit ? `'/api/events/' + '${event?.id}'` : "'/api/events'"};
              const method = ${isEdit ? "'PUT'" : "'POST'"};
              
              const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'same-origin'
              });
              
              if (response.ok) {
                window.location.href = '/admin/events';
              } else {
                const error = await response.text();
                alert('Error saving event: ' + error);
              }
            } catch (error) {
              alert('Error saving event: ' + error.message);
            }
          });
        `
      }} />
    </div>
  );
};