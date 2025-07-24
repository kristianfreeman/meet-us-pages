import { jsxRenderer } from 'hono/jsx-renderer'

// This renderer is now deprecated in favor of the Layout component
// Keeping it for backwards compatibility if needed
export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
})