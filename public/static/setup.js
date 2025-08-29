// Setup script for creating admin user
document.addEventListener('DOMContentLoaded', function() {
  const setupForm = document.getElementById('setup-form');
  if (!setupForm) return;
  
  setupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const errorMsg = document.getElementById('error-message');
    const successMsg = document.getElementById('success-message');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating user...';
    if (errorMsg) errorMsg.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    
    try {
      // Try to create user via Better Auth API
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          name,
          data: {
            email,
            password
          }
        }),
        credentials: 'same-origin'
      });
      
      const responseText = await response.text();
      console.log('Response:', response.status, responseText);
      
      if (response.ok) {
        if (successMsg) {
          successMsg.textContent = 'Admin user created successfully! Redirecting to login...';
          successMsg.style.display = 'block';
        }
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        let errorMessage = 'Failed to create user';
        try {
          const data = JSON.parse(responseText);
          errorMessage = data.error || data.message || errorMessage;
        } catch (e) {
          // Response wasn't JSON
        }
        
        if (errorMsg) {
          errorMsg.textContent = errorMessage;
          errorMsg.style.display = 'block';
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (errorMsg) {
        errorMsg.textContent = 'An error occurred. Please check the console.';
        errorMsg.style.display = 'block';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Admin User';
    }
  });
});