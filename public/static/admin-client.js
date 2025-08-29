// Admin client-side functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle delete buttons
  document.addEventListener('click', async function(e) {
    if (e.target.closest('[data-delete-id]')) {
      const btn = e.target.closest('[data-delete-id]');
      const id = btn.getAttribute('data-delete-id');
      const isEvent = window.location.pathname.includes('/admin/events');
      const resourceType = isEvent ? 'event' : 'resource';
      
      if (confirm(`Are you sure you want to delete this ${resourceType}?`)) {
        try {
          const endpoint = isEvent ? `/api/events/${id}` : `/api/resources/${id}`;
          const response = await fetch(endpoint, {
            method: 'DELETE',
            credentials: 'same-origin'
          });
          
          if (response.ok) {
            // Reload the page to show updated list
            window.location.reload();
          } else {
            alert('Failed to delete. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      }
    }
  });
});