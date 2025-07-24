# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Pages application built with Hono that serves as an event listing and resource page for the Cloudflare team. It's a server-side rendered application with minimal client-side JavaScript for UI interactions, designed to be lightweight and fast on Cloudflare's edge network.

## Tech Stack

- **Framework**: Hono v4.1.0 (lightweight web framework)
- **Runtime**: Cloudflare Pages/Workers
- **Build Tool**: Vite with Cloudflare Pages plugin
- **Language**: TypeScript with JSX (using Hono's JSX runtime, not React)
- **Deployment**: Wrangler CLI v4.25.0
- **Icons**: lucide-static v0.525.0

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server (uses wrangler dev)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

## Project Architecture

The application follows a modular server-side rendering pattern:

1. **`src/index.tsx`** - Main entry point that defines the Hono app and routes. Currently serves the root path (`/`) and uses the Layout component.

2. **`src/components/`** - Reusable JSX components:
   - `Layout.tsx` - Main HTML wrapper with meta tags and theme support
   - `Header.tsx` - Navigation header with Cloudflare branding
   - `Hero.tsx` - Featured events hero section
   - `EventCard.tsx` - Individual event display component
   - Additional UI components for sections and navigation

3. **`src/services/`** - Business logic layer:
   - `eventService.ts` - Handles event data fetching and filtering

4. **`src/data/`** - JSON data files containing event and resource information

5. **`src/types/`** - TypeScript type definitions for the application

6. **`public/static/`** - Static assets served directly by Cloudflare Pages:
   - Modular CSS files (base.css, components.css, utilities.css, variables.css)
   - `theme.js` - Client-side theme switching functionality
   - `images/` - Cloudflare logos and SVG assets

## Key Development Notes

### JSX Usage
This project uses Hono's JSX runtime, not React. JSX is configured in `tsconfig.json`:
```json
"jsx": "react-jsx",
"jsxImportSource": "hono/jsx"
```

### Workers Assets Configuration
The project uses Cloudflare Workers Assets (requires compatibility_date "2025-01-01"):
```toml
name = "meet-us-pages"
compatibility_date = "2025-01-01"
main = "dist/_worker.js"
assets = { directory = "./public" }
```

### Static Assets & Routing
- Static files in `public/static/` are served at `/static/*` paths
- `_routes.json` configures which paths are handled by the Worker vs served as static assets
- Images and CSS files bypass the Worker for optimal performance

### TypeScript Configuration
- Strict mode is enabled
- Target is ESNext
- Module resolution is set to Bundler for Vite compatibility

### CSS Architecture
The application uses a modular CSS approach:
- `base.css` - Reset and foundational styles
- `components.css` - Component-specific styles
- `utilities.css` - Utility classes
- `variables.css` - CSS custom properties for theming
- `index.css` - Main import file that combines all CSS modules

### Adding New Routes
To add new routes, modify `src/index.tsx`:
```typescript
app.get('/new-route', (c) => {
  return c.render(
    <Layout>
      <div>Your content here</div>
    </Layout>
  )
})
```

### Component Development
When creating new components:
1. Use Hono's JSX types: `import { FC } from "hono/jsx"`
2. Follow existing component patterns in `src/components/`
3. Keep components server-side only unless client interaction is needed

## Deployment

The project is configured for Cloudflare Pages deployment:
- `wrangler.toml` contains the deployment configuration with Workers Assets enabled
- Build output goes to the `dist` directory as `_worker.js`
- Static assets are served from the `public` directory
- Deployment happens via `npm run deploy` which builds and deploys in one step

## No Test Framework

Currently, there is no test framework configured. If tests need to be added, consider setting up Vitest which works well with Vite.

## Environment Variables

No environment variables are currently in use. If needed in the future, use Cloudflare's `wrangler secret` command or `.dev.vars` file for local development.

## Development Workflow

1. The `renderer.tsx` is deprecated in favor of the `Layout` component
2. All new pages should use the Layout component for consistent structure
3. Event data should be managed through the eventService
4. Client-side JavaScript should be minimal and only for UI interactions (like filtering)