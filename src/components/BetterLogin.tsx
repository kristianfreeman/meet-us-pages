import { FC } from 'hono/jsx';

export const BetterLogin: FC = () => {
  return (
    <div class="auth-page">
      <div class="container">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1 class="auth-title">Admin Login</h1>
              <p class="auth-subtitle">Sign in to access the admin dashboard</p>
            </div>
            <form id="login-form" class="auth-form">
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-input"
                  required
                  placeholder="admin@example.com"
                  autocomplete="email"
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
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
              </div>
              <div id="error-message" class="error-message" style="display: none;"></div>
              <button type="submit" class="btn btn-primary btn-block" id="submit-btn">
                Sign In
              </button>
            </form>
            <div class="auth-footer">
              <p class="auth-footer-text">
                <a href="/" class="auth-link">← Back to main site</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <script src="/static/auth-client.js"></script>
    </div>
  );
};