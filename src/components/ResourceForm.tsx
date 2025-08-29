import { FC } from "hono/jsx";

interface ResourceFormProps {
  resource?: {
    id: string;
    title: string;
    description: string | null;
    url: string;
    category: string;
    order: number;
  };
  isEdit?: boolean;
}

export const ResourceForm: FC<ResourceFormProps> = ({ resource, isEdit = false }) => {
  return (
    <div class="admin-content">
      <div class="admin-header">
        <h1>{isEdit ? 'Edit Resource' : 'Create New Resource'}</h1>
      </div>

      <form class="admin-form" id="resourceForm">
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={resource?.title || ''}
            placeholder="Resource title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Resource description"
            value={resource?.description || ''}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="url">URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            required
            value={resource?.url || ''}
            placeholder="https://example.com"
          />
        </div>

        <div style="display: grid; grid-template-columns: 1fr auto; gap: 1rem;">
          <div class="form-group">
            <label for="category">Category *</label>
            <select id="category" name="category" required>
              <option value="">Select category</option>
              <option value="gettingStarted" selected={resource?.category === 'gettingStarted'}>Getting Started</option>
              <option value="developerTools" selected={resource?.category === 'developerTools'}>Developer Tools</option>
              <option value="community" selected={resource?.category === 'community'}>Community</option>
            </select>
          </div>

          <div class="form-group">
            <label for="order">Order</label>
            <input
              type="number"
              id="order"
              name="order"
              value={resource?.order || 0}
              min="0"
              step="1"
              style="width: 100px;"
            />
          </div>
        </div>

        <div class="form-actions">
          <a href="/admin/resources" class="btn btn-secondary">Cancel</a>
          <button type="submit" class="btn btn-primary">
            {isEdit ? 'Update Resource' : 'Create Resource'}
          </button>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('resourceForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const data = {
              title: formData.get('title'),
              description: formData.get('description') || null,
              url: formData.get('url'),
              category: formData.get('category'),
              order: parseInt(formData.get('order')) || 0
            };
            
            try {
              const url = ${isEdit ? `'/api/resources/' + '${resource?.id}'` : "'/api/resources'"};
              const method = ${isEdit ? "'PUT'" : "'POST'"};
              
              const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'same-origin'
              });
              
              if (response.ok) {
                window.location.href = '/admin/resources';
              } else {
                const error = await response.text();
                alert('Error saving resource: ' + error);
              }
            } catch (error) {
              alert('Error saving resource: ' + error.message);
            }
          });
        `
      }} />
    </div>
  );
};