import { FC } from 'hono/jsx';

interface DashboardProps {
  eventCount: number;
  resourceCount: number;
  upcomingEventCount: number;
}

export const AdminDashboard: FC<DashboardProps> = ({ eventCount, resourceCount, upcomingEventCount }) => {
  return (
    <div class="admin-content">
      <div class="admin-header">
        <h1 class="admin-title">Dashboard</h1>
      </div>
      
      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-icon events">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">{eventCount}</span>
            <span class="stat-label">Total Events</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon upcoming">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">{upcomingEventCount}</span>
            <span class="stat-label">Upcoming Events</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon resources">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">{resourceCount}</span>
            <span class="stat-label">Resources</span>
          </div>
        </div>
      </div>
      
      <div class="admin-actions">
        <h2 class="section-title">Quick Actions</h2>
        <div class="action-grid">
          <a href="/admin/events/new" class="action-card">
            <svg class="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>Add New Event</span>
          </a>
          <a href="/admin/resources/new" class="action-card">
            <svg class="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <span>Add New Resource</span>
          </a>
        </div>
      </div>
    </div>
  );
};