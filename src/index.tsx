import { Hono } from "hono";
import { desc } from "drizzle-orm";

// Components
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedContent } from "./components/FeaturedContent";
import { EventList } from "./components/EventList";
import { ResourceList } from "./components/ResourceList";
import { Footer } from "./components/Footer";
import { BetterLogin } from "./components/BetterLogin";
import { AdminLayout } from "./components/AdminLayout";

// Routes and handlers
import { AdminDashboard } from "./routes/admin";
import { adminEventsHandler } from "./routes/admin/events";
import { adminResourcesHandler } from "./routes/admin/resources";
import { adminUsersHandler } from "./routes/admin/users";
import { newEventHandler, editEventHandler } from "./routes/admin/event-form";
import { newResourceHandler, editResourceHandler } from "./routes/admin/resource-form";
import { deleteEvent, createEvent, updateEvent } from "./routes/api/events";
import { deleteResource, createResource, updateResource } from "./routes/api/resources";
import { deleteUser } from "./routes/api/users";
import { createUserByAdmin } from "./routes/api/admin-users";

// Auth
import { auth } from "./lib/auth/better-auth";
import { betterAuthMiddleware } from "./lib/auth/middleware";

// Database
import { createDb } from "./db";
import { events, resources } from "./db/schema";

// Data
import eventsData from "./data/events.json";

type Bindings = {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
};

const app = new Hono<{ 
  Bindings: Bindings;
  Variables: {
    session: any;
    user: any;
  };
}>();

// Authentication API routes (be specific to avoid catching other /api routes)
app.on(['GET', 'POST'], '/api/sign-up/*', (c) => {
  return c.json({ error: 'Public signup is disabled. Users must be created by administrators.' }, 403);
});

// Handle all better-auth routes (better-auth uses basePath: '/api')
app.on(['GET', 'POST'], '/api/sign-in/*', async (c) => {
  const response = await auth(c.env).handler(c.req.raw);
  return response;
});
app.on(['GET', 'POST'], '/api/sign-out', async (c) => {
  const response = await auth(c.env).handler(c.req.raw);
  return response;
});
app.on(['GET', 'POST'], '/api/session', async (c) => {
  const response = await auth(c.env).handler(c.req.raw);
  return response;
});
app.on(['GET', 'POST'], '/api/auth/*', async (c) => {
  const response = await auth(c.env).handler(c.req.raw);
  return response;
});

// Authentication pages
app.get("/login", (c) => {
  return c.html(
    <Layout title="Admin Login - Meet the Cloudflare Team">
      <BetterLogin />
    </Layout>
  );
});

// Admin dashboard and pages (protected)
app.get("/admin", betterAuthMiddleware, async (c) => {
  const db = createDb(c.env.DB);
  
  // Get counts from database
  const eventRows = await db.select().from(events).all();
  const resourceRows = await db.select().from(resources).all();
  
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = eventRows.filter(event => event.date >= today);
  
  const user = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin" userName={user?.name}>
      <AdminDashboard 
        eventCount={eventRows.length} 
        resourceCount={resourceRows.length}
        upcomingEventCount={upcomingEvents.length}
      />
    </AdminLayout>
  );
});

app.get("/admin/events", betterAuthMiddleware, adminEventsHandler);
app.get("/admin/resources", betterAuthMiddleware, adminResourcesHandler);
app.get("/admin/users", betterAuthMiddleware, adminUsersHandler);

// Admin form pages
app.get("/admin/events/new", betterAuthMiddleware, newEventHandler);
app.get("/admin/events/:id/edit", betterAuthMiddleware, editEventHandler);
app.get("/admin/resources/new", betterAuthMiddleware, newResourceHandler);
app.get("/admin/resources/:id/edit", betterAuthMiddleware, editResourceHandler);

// Content management API (protected)
app.delete("/api/events/:id", betterAuthMiddleware, deleteEvent);
app.post("/api/events", betterAuthMiddleware, createEvent);
app.put("/api/events/:id", betterAuthMiddleware, updateEvent);

app.delete("/api/resources/:id", betterAuthMiddleware, deleteResource);
app.post("/api/resources", betterAuthMiddleware, createResource);
app.put("/api/resources/:id", betterAuthMiddleware, updateResource);

// User management API (admin only)
app.delete("/api/users/:id", betterAuthMiddleware, deleteUser);
app.post("/api/admin/users", betterAuthMiddleware, createUserByAdmin);

// Public routes
app.get("/", async (c) => {
  try {
    const db = createDb(c.env.DB);
    
    // Get events from database
    const eventRows = await db.select().from(events).orderBy(desc(events.date)).all();
    
    // Get resources from database  
    const resourceRows = await db.select().from(resources).orderBy(resources.order, resources.title).all();
    
    // Ensure we have arrays
    const safeEventRows = Array.isArray(eventRows) ? eventRows : [];
    const safeResourceRows = Array.isArray(resourceRows) ? resourceRows : [];
    
    // Filter featured and upcoming events
    const featuredEvents = safeEventRows.filter(event => event.featured);
    const today = new Date().toISOString().split('T')[0];
    const inPersonEvents = safeEventRows.filter(event => !event.virtual);
    
    // Group resources by category
    const resourcesByCategory = safeResourceRows.reduce((acc, resource) => {
      if (!acc[resource.category]) acc[resource.category] = [];
      acc[resource.category].push(resource);
      return acc;
    }, {} as Record<string, typeof safeResourceRows>);
    
    // Get featured content from JSON for now
    const hackTheSafe = eventsData.featuredContent?.hackTheSafe;

    return c.html(
      <Layout>
        <Header />
        
        {featuredEvents.length > 0 && <Hero featuredEvents={featuredEvents} />}
        
        {hackTheSafe && <FeaturedContent hackTheSafe={hackTheSafe} />}
        
        <main id="main-content" class="flex-grow">
          <div class="events-filter-section">
            <div class="container">
              <div class="events-filter-header">
                <h2 class="section-title">Events</h2>
                <div class="events-filter-toggle" data-filter-toggle>
                  <button class="filter-button" data-filter="all">All Events</button>
                  <button class="filter-button active" data-filter="upcoming">Upcoming</button>
                  <button class="filter-button" data-filter="past">Past</button>
                </div>
              </div>
            </div>
          </div>
          
          <div data-events-container>
            <EventList 
              title="" 
              events={inPersonEvents}
            />
          </div>
          
          <script dangerouslySetInnerHTML={{ __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const filterButtons = document.querySelectorAll('[data-filter]');
              const eventsContainer = document.querySelector('[data-events-container]');
              
              // Function to apply filter
              function applyFilter(filter) {
                const eventCards = eventsContainer.querySelectorAll('.event-card');
                eventCards.forEach(card => {
                  if (filter === 'all') {
                    card.style.display = '';
                  } else if (filter === 'upcoming' && card.classList.contains('past')) {
                    card.style.display = 'none';
                  } else if (filter === 'past' && !card.classList.contains('past')) {
                    card.style.display = 'none';
                  } else {
                    card.style.display = '';
                  }
                });
                
                // Hide empty month groups
                const monthGroups = eventsContainer.querySelectorAll('.events-month-group');
                monthGroups.forEach(group => {
                  const visibleCards = group.querySelectorAll('.event-card:not([style*="display: none"])');
                  group.style.display = visibleCards.length === 0 ? 'none' : '';
                });
              }
              
              // Apply default filter (upcoming) on page load
              applyFilter('upcoming');
              
              // Add click handlers for filter buttons
              filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                  const filter = this.getAttribute('data-filter');
                  
                  // Update active state
                  filterButtons.forEach(btn => btn.classList.remove('active'));
                  this.classList.add('active');
                  
                  // Apply filter
                  applyFilter(filter);
                });
              });
            });
          `}} />
          
          <section class="resources-section">
            <div class="container">
              <h2 class="section-title">Online</h2>
              
              <ResourceList
                title="Community"
                resources={resourcesByCategory.community || []}
              />
              
              <h2 class="section-title mt-12">Resources</h2>
              
              <ResourceList
                title="Getting Started"
                resources={resourcesByCategory.gettingStarted || []}
              />
              
              <ResourceList
                title="Developer Tools"
                resources={resourcesByCategory.developerTools || []}
              />
            </div>
          </section>
        </main>
        
        <Footer />
      </Layout>
    );
  } catch (e) {
    console.error(e);
    return c.html(
      <Layout>
        <Header />
        <main id="main-content" class="flex-grow">
          <div class="container">
            <h1 class="text-center">Something went wrong.</h1>
            <p class="text-center">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }
});

export default app;
