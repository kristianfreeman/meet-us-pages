// Theme management script
(function() {
  // Apply theme
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  // Get current system preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Initialize theme based on saved preference or system
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || getSystemTheme();
    applyTheme(theme);
  }
  
  // Initialize on load
  initTheme();
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only update if user hasn't set a manual preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();