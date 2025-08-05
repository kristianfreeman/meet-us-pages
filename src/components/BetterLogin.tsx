import { FC } from 'hono/jsx';

export const BetterLogin: FC = () => {
  return (
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Admin Login</h1>
        <form id="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-input"
              required
              placeholder="admin@example.com"
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
              placeholder="••••••••"
            />
          </div>
          <div id="error-message" class="error-message" style="display: none;"></div>
          <button type="submit" class="btn btn-primary" id="submit-btn">
            Sign In
          </button>
        </form>
      </div>
      <script src="/static/auth-client.js"></script>
    </div>
  );
};