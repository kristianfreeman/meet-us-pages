import { FC } from 'hono/jsx';
import { Layout } from './Layout';

export const LoginPage: FC = () => {
  return (
    <Layout>
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
      </div>
      
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('login-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = document.getElementById('submit-btn');
          const errorMsg = document.getElementById('error-message');
          
          submitBtn.disabled = true;
          submitBtn.textContent = 'Signing in...';
          errorMsg.style.display = 'none';
          
          const formData = new FormData(e.target);
          const email = formData.get('email');
          const password = formData.get('password');
          
          try {
            const response = await fetch('/api/auth/sign-in/email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
              credentials: 'same-origin'
            });
            
            const data = await response.json();
            
            if (response.ok && data.session) {
              window.location.href = '/admin';
            } else {
              errorMsg.textContent = data.error || 'Invalid email or password';
              errorMsg.style.display = 'block';
            }
          } catch (error) {
            errorMsg.textContent = 'An error occurred. Please try again.';
            errorMsg.style.display = 'block';
          } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
          }
        });
      `}} />
    </Layout>
  );
};