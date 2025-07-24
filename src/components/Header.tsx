import { FC } from "hono/jsx";

export const Header: FC = () => {
  return (
    <header class="header">
      <div class="container">
        <div class="header-content">
          <img 
            src="/static/images/svg/CF_logomark_singlecolor_wht.svg" 
            alt="Cloudflare" 
            class="header-logo"
          />
          <h1 class="fade-in">Meet the Cloudflare Team</h1>
          <p class="header-subtitle fade-in">
            Connect with us at conferences, events, and online
          </p>
        </div>
      </div>
    </header>
  );
};