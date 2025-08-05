import { Context } from 'hono';
import { Layout } from '../components/Layout';

export async function setupHandler(c: Context<{ Bindings: any }>) {
  return c.html(
    <Layout>
      <div class="login-container">
        <div class="login-card">
          <h1 class="login-title">Setup Admin User</h1>
          <div id="error-message" class="error-message" style="display: none;"></div>
          <div id="success-message" class="success-message" style="display: none; background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #16a34a; padding: 0.75rem; border-radius: 0.375rem; margin-bottom: 1rem;"></div>
          <form id="setup-form">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-input"
                required
                value="Admin User"
              />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input"
                required
                value="admin@cloudflare.com"
              />
            </div>
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-input"
                required
                placeholder="Enter a secure password"
                value="Cloudflare123!"
              />
            </div>
            <button type="submit" class="btn btn-primary" id="submit-btn">
              Create Admin User
            </button>
          </form>
          <div style="margin-top: 1rem; text-align: center; color: var(--color-text-muted); font-size: 0.875rem;">
            This page should be removed after initial setup
          </div>
        </div>
      </div>
      <script src="/static/setup.js"></script>
    </Layout>
  );
}