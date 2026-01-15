import { FC } from "hono/jsx";

export const Header: FC = () => {
  return (
    <>
      <header class="site-header" data-variant="default">
        <div class="site-header-inner">
          <nav class="site-nav">
            <button 
              id="nav-logo-button"
              type="button" 
              onclick="handleLogoClick()" 
              class="nav-logo-button" 
              aria-label="Navigate to home">
              <div class="nav-logo-content">
                {/* Cloudflare Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="30" viewBox="0 0 66 30" fill="none" class="cloudflare-logo">
                  <path fill="currentColor" d="M52.688 13.028c-.22 0-.437.008-.654.015a.3.3 0 0 0-.102.024.37.37 0 0 0-.236.255l-.93 3.249c-.401 1.397-.252 2.687.422 3.634.618.876 1.646 1.39 2.894 1.45l5.045.306a.45.45 0 0 1 .435.41.5.5 0 0 1-.025.223.64.64 0 0 1-.547.426l-5.242.306c-2.848.132-5.912 2.456-6.987 5.29l-.378 1a.28.28 0 0 0 .248.382h18.054a.48.48 0 0 0 .464-.35c.32-1.153.482-2.344.48-3.54 0-7.22-5.79-13.072-12.933-13.072M44.807 29.578l.334-1.175c.402-1.397.253-2.687-.42-3.634-.62-.876-1.647-1.39-2.896-1.45l-23.665-.306a.47.47 0 0 1-.374-.199.5.5 0 0 1-.052-.434.64.64 0 0 1 .552-.426l23.886-.306c2.836-.131 5.9-2.456 6.975-5.29l1.362-3.6a.9.9 0 0 0 .04-.477C48.997 5.259 42.789 0 35.367 0c-6.842 0-12.647 4.462-14.73 10.665a6.92 6.92 0 0 0-4.911-1.374c-3.28.33-5.92 3.002-6.246 6.318a7.2 7.2 0 0 0 .18 2.472C4.3 18.241 0 22.679 0 28.133q0 .74.106 1.453a.46.46 0 0 0 .457.402h43.704a.57.57 0 0 0 .54-.418"></path>
                </svg>
                
                {/* Brand Text */}
                <div class="nav-brand-text">
                  <div class="nav-brand-label">Cloudflare</div>
                  <div class="nav-brand-title">Events</div>
                </div>
              </div>
            </button>

            {/* Navigation Links - Center */}
            <div class="nav-links">
              <a href="https://workers.cloudflare.com" class="nav-link">Workers Platform</a>
              <a href="https://developers.cloudflare.com" class="nav-link">Documentation</a>
              <a href="https://blog.cloudflare.com" class="nav-link">Blog</a>
            </div>

            {/* CTA Buttons - Right */}
            <div class="nav-actions">
              <a href="https://dash.cloudflare.com/sign-up/login" class="nav-cta nav-cta-secondary">
                Login
              </a>
              <a href="https://dash.cloudflare.com/sign-up/workers-and-pages" class="nav-cta nav-cta-primary">
                Start building
              </a>
            </div>
          </nav>
        </div>
      </header>

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        window.handleLogoClick = function() {
          const path = window.location.pathname;
          if (path === '/' || path === '/index.html') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.href = '/';
          }
        };

        // Header scroll behavior
        (function() {
          const header = document.querySelector('.site-header');
          if (!header) return;

          let ticking = false;
          const threshold = 20;

          function updateHeader() {
            const scrollY = window.scrollY;
            
            if (scrollY > threshold) {
              header.setAttribute('data-variant', 'floating');
            } else {
              header.setAttribute('data-variant', 'default');
            }
            
            ticking = false;
          }

          function requestTick() {
            if (!ticking) {
              window.requestAnimationFrame(updateHeader);
              ticking = true;
            }
          }

          window.addEventListener('scroll', requestTick, { passive: true });
          
          // Set initial state
          updateHeader();
        })();
      `}} />
    </>
  );
};
