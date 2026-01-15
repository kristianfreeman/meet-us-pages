import { FC } from "hono/jsx";

interface LayoutProps {
  children: any;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title = "Meet the Cloudflare Team" }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Connect with the Cloudflare team at conferences, events, and online. Find upcoming meetups, resources, and ways to engage with our developer community." />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Connect with the Cloudflare team at conferences, events, and online." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/static/images/CF_logo_stacked_blktype.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" type="image/x-icon" href="https://www.cloudflare.com/favicon.ico" />
        <link href="/static/index.css" rel="stylesheet" />
        <title>{title}</title>
        <script src="/static/theme.js"></script>
      </head>
      <body>
        <a href="#main-content" class="skip-link">Skip to main content</a>
        
        {/* Background Grid - Workers style */}
        <div id="background-lines" class="background-lines" aria-hidden="true">
          {/* Center lines container */}
          <div class="background-lines-center">
            <div class="background-line-left"></div>
            <div class="background-line-right"></div>
          </div>
          
          {/* Outer lines with dots */}
          <div class="background-lines-outer">
            <svg class="background-dots" data-testid="rf__background" aria-hidden="true">
              <defs>
                <pattern id="dot-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="6" cy="6" r="0.75" fill="var(--color-border-100)"></circle>
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)"></rect>
            </svg>
            <div class="background-line-left"></div>
            <div class="background-line-right"></div>
          </div>
        </div>
        
        <div class="min-h-screen flex flex-col" style="position: relative; z-index: 1;">
          {children}
        </div>
      </body>
    </html>
  );
};