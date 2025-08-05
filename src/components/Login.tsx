import { FC } from 'hono/jsx';

export const Login: FC = () => {
  return (
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Admin Login</h1>
        <form method="POST" action="/api/auth/login">
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
          <button type="submit" class="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};