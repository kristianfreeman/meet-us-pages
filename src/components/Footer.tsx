import { FC } from "hono/jsx";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Footer: FC = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <img 
            src="/static/images/svg/CF_logo_stacked_whitetype.svg" 
            alt="Cloudflare" 
            class="footer-logo"
          />
          
          <div class="footer-links">
            <a href="https://developers.cloudflare.com" class="footer-link">Developer Docs</a>
            <a href="https://cloudflare.com" class="footer-link">Cloudflare.com</a>
            <a href="https://discord.cloudflare.com" class="footer-link">Discord Community</a>
            <a href="https://github.com/cloudflare" class="footer-link">GitHub</a>
            <a href="https://blog.cloudflare.com" class="footer-link">Blog</a>
          </div>
          
          <div class="footer-divider"></div>
          
          <p class="footer-credit">
            Built with <a href="https://pages.cloudflare.com">Cloudflare Pages</a> and{" "}
            <a href="https://honojs.dev">Hono</a>
          </p>
          
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
};