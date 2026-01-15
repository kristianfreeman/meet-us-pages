import { FC } from "hono/jsx";

export const Footer: FC = () => {
  return (
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-brand-text">
              <span class="footer-brand-label">Cloudflare</span>
              <span class="footer-brand-title">Cloudflare Events</span>
            </div>
          </div>
          
          <div class="footer-columns">
            <div class="footer-column">
              <div class="footer-column-header">
                <span>Getting Started</span>
              </div>
              <a href="https://dash.cloudflare.com/sign-up" class="footer-link">Sign Up</a>
              <a href="https://developers.cloudflare.com" class="footer-link">Documentation</a>
              <a href="https://workers.cloudflare.com" class="footer-link">Workers Platform</a>
            </div>
            
            <div class="footer-column">
              <div class="footer-column-header">
                <span>Resources</span>
              </div>
              <a href="https://blog.cloudflare.com" class="footer-link">Blog</a>
              <a href="https://discord.cloudflare.com" class="footer-link">Discord</a>
              <a href="https://community.cloudflare.com" class="footer-link">Community</a>
              <a href="https://github.com/cloudflare" class="footer-link">GitHub</a>
            </div>
            
            <div class="footer-column">
              <div class="footer-column-header">
                <span>Company</span>
              </div>
              <a href="https://cloudflare.com/about-overview" class="footer-link">About</a>
              <a href="https://cloudflare.com/careers" class="footer-link">Careers</a>
              <a href="https://cloudflare.com/press" class="footer-link">Press</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <span class="footer-copyright">© 2025 Cloudflare, Inc.</span>
          <div class="footer-legal">
            <a href="https://cloudflare.com/privacypolicy" class="footer-legal-link">Privacy Policy</a>
            <span>, </span>
            <a href="https://cloudflare.com/terms" class="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
