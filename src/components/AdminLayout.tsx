import { FC } from 'hono/jsx';
import { PropsWithChildren } from 'hono/jsx';

interface AdminLayoutProps extends PropsWithChildren {
  currentPath: string;
  userName?: string;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children, currentPath, userName }) => {
  const isActive = (path: string) => currentPath === path ? 'active' : '';
  
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin - Cloudflare Meet Us</title>
        <link rel="stylesheet" href="/static/index.css" />
        <link rel="stylesheet" href="/static/auth.css" />
        <link rel="stylesheet" href="/static/admin.css" />
        <script src="/static/theme.js"></script>
        <script src="/static/admin-client.js"></script>
      </head>
      <body>
        <div class="admin-container">
          <aside class="admin-sidebar">
            <div class="admin-sidebar-content">
              <div class="admin-logo">
                <picture>
                  <source media="(prefers-color-scheme: dark)" srcset="/static/images/svg/CF_logo_horizontal_whitetype.svg" />
                  <img src="/static/images/svg/CF_logo_horizontal_blktype.svg" alt="Cloudflare" />
                </picture>
                <span class="admin-badge">Admin</span>
              </div>
              
              <nav class="admin-nav">
              <a href="/admin" class={`admin-nav-link ${isActive('/admin')}`}>
                <svg class="admin-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </a>
              <a href="/admin/events" class={`admin-nav-link ${isActive('/admin/events')}`}>
                <svg class="admin-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Events
              </a>
              <a href="/admin/resources" class={`admin-nav-link ${isActive('/admin/resources')}`}>
                <svg class="admin-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Resources
              </a>
              <a href="/admin/users" class={`admin-nav-link ${isActive('/admin/users')}`}>
                <svg class="admin-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Users
              </a>
              </nav>
              
              <div class="admin-user">
                <div class="admin-user-info">
                  <span class="admin-user-name">{userName || 'Admin'}</span>
                  <a href="/api/sign-out" class="admin-logout">Sign Out</a>
                </div>
              </div>
            </div>
          </aside>
          
          <main class="admin-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};