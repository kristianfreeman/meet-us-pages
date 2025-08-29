// Better Auth client-side login handler
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const errorMsg = document.getElementById('error-message');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    if (errorMsg) errorMsg.style.display = 'none';
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await fetch('/api/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin'
      });
      
      const data = await response.json();
      
      if (response.ok && data.token) {
        window.location.href = '/admin';
      } else {
        if (errorMsg) {
          errorMsg.textContent = data.error || 'Invalid email or password';
          errorMsg.style.display = 'block';
        }
      }
    } catch (error) {
      if (errorMsg) {
        errorMsg.textContent = 'An error occurred. Please try again.';
        errorMsg.style.display = 'block';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
    }
  });
});