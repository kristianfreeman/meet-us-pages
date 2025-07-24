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
        <div class="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
};