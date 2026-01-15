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
import { getEvents, getEvent, deleteEvent, createEvent, updateEvent } from "./routes/api/events";
import { getResources, getResource, deleteResource, createResource, updateResource } from "./routes/api/resources";
import { deleteUser } from "./routes/api/users";
import { createUserByAdmin } from "./routes/api/admin-users";

// Auth
import { auth } from "./lib/auth/better-auth";
import { betterAuthMiddleware } from "./lib/auth/middleware";
import { apiKeyMiddleware } from "./lib/auth/api-key-middleware";

// Database
import { createDb } from "./db";
import { events, resources } from "./db/schema";

// Data
import eventsData from "./data/events.json";

type Bindings = {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  API_KEY?: string;
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

// API Key routes for scripting/automation
app.get("/api/v1/events", apiKeyMiddleware, getEvents);
app.get("/api/v1/events/:id", apiKeyMiddleware, getEvent);
app.post("/api/v1/events", apiKeyMiddleware, createEvent);
app.put("/api/v1/events/:id", apiKeyMiddleware, updateEvent);
app.delete("/api/v1/events/:id", apiKeyMiddleware, deleteEvent);

app.get("/api/v1/resources", apiKeyMiddleware, getResources);
app.get("/api/v1/resources/:id", apiKeyMiddleware, getResource);
app.post("/api/v1/resources", apiKeyMiddleware, createResource);
app.put("/api/v1/resources/:id", apiKeyMiddleware, updateResource);
app.delete("/api/v1/resources/:id", apiKeyMiddleware, deleteResource);

// Content management API (protected - requires user login)
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
    
    // Group resources by category
    const resourcesByCategory = safeResourceRows.reduce((acc, resource) => {
      if (!acc[resource.category]) acc[resource.category] = [];
      acc[resource.category].push(resource);
      return acc;
    }, {} as Record<string, typeof safeResourceRows>);
    
    // Get featured content from JSON for now
    const hackTheSafe = eventsData.featuredContent?.hackTheSafe;

    // Calculate which regions have events (within the last week or future)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];
    
    const relevantEvents = safeEventRows.filter(event => event.date >= oneWeekAgoStr);
    const availableRegions = [...new Set(relevantEvents.map(event => event.region).filter(Boolean))];
    
    // Define all possible regions with their display names
    const allRegions = [
      { id: 'EMEA', label: 'EMEA' },
      { id: 'NAMER', label: 'NAMER' },
      { id: 'APAC', label: 'APAC' },
      { id: 'LATAM', label: 'LATAM' },
      { id: 'VIRTUAL', label: 'Virtual' },
    ];
    
    // Filter to only regions that have events
    const activeRegions = allRegions.filter(region => availableRegions.includes(region.id));

    return c.html(
      <Layout>
        <Header />
        
        <div class="container main-container">
          {featuredEvents.length > 0 && <Hero featuredEvents={featuredEvents} />}
          
          {/* {hackTheSafe && <FeaturedContent hackTheSafe={hackTheSafe} />} */}
          
          <main id="main-content" class="flex-grow">
            {/* Hero Section - Workers pricing style */}
            <section class="pricing-hero">
              <div class="pricing-hero-spacer"></div>
              <div class="pricing-hero-content">
                <div class="pricing-hero-inner">
                  {/* Title + Subtitle */}
                  <div class="pricing-hero-text">
                    <h2 class="pricing-hero-title">Meet the Cloudflare Team</h2>
                    <h5 class="pricing-hero-subtitle">
                      Connect with us at conferences, events, and online communities around the world
                    </h5>
                  </div>
                  
                  {/* Filter Pills - only show if there are multiple regions */}
                  {activeRegions.length > 1 && (
                    <div class="events-filter-toggle" data-region-filter-toggle>
                      <div class="filter-indicator" data-filter-indicator></div>
                      <button class="filter-button active" data-region-filter="all">All Regions</button>
                      {activeRegions.map(region => (
                        <button class="filter-button" data-region-filter={region.id}>{region.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
            
            {/* Events Container - Workers pricing style */}
            <div class="events-container-wrapper">
              {/* Corner decorations */}
              <div class="corner-decorations" aria-hidden="true">
                <div class="corner-decoration corner-top-left"></div>
                <div class="corner-decoration corner-top-right"></div>
                <div class="corner-decoration corner-bottom-left"></div>
                <div class="corner-decoration corner-bottom-right"></div>
              </div>
              
              {/* Middle frame container (darker) - 8px padding creates gap */}
              <div class="events-frame">
                {/* Month cards container with 8px gap */}
                <div class="events-content-wrapper" data-events-container>
                  <EventList
                    title=""
                    events={safeEventRows}
                  />
                </div>
              </div>
            </div>
            
            <script dangerouslySetInnerHTML={{ __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const regionFilterButtons = document.querySelectorAll('[data-region-filter]');
                const eventsContainer = document.querySelector('[data-events-container]');
                const filterIndicator = document.querySelector('[data-filter-indicator]');

                let currentRegionFilter = 'all';

                // Function to move indicator to active button
                function moveIndicator(button) {
                  const buttonRect = button.getBoundingClientRect();
                  const parentRect = button.parentElement.getBoundingClientRect();
                  const left = buttonRect.left - parentRect.left - 4;
                  const width = buttonRect.width;
                  
                  filterIndicator.style.width = width + 'px';
                  filterIndicator.style.transform = 'translateX(' + left + 'px)';
                }

                // Get date one week ago
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];

                // Function to apply filters
                function applyFilters() {
                  const eventItems = eventsContainer.querySelectorAll('.event-list-item');
                  eventItems.forEach(item => {
                    let show = true;

                    // Get event date from the item
                    const eventDateStr = item.getAttribute('data-date');

                    // Hide events older than one week
                    if (eventDateStr && eventDateStr < oneWeekAgoStr) {
                      show = false;
                    }

                    // Apply region filter
                    if (currentRegionFilter !== 'all') {
                      const itemRegion = item.getAttribute('data-region');
                      if (itemRegion !== currentRegionFilter) {
                        show = false;
                      }
                    }

                    item.style.display = show ? '' : 'none';
                  });

                  // Hide empty month cards
                  const monthCards = eventsContainer.querySelectorAll('.events-month-card');
                  monthCards.forEach(card => {
                    const visibleItems = card.querySelectorAll('.event-list-item:not([style*="display: none"])');
                    card.style.display = visibleItems.length === 0 ? 'none' : '';
                  });
                }

                // Initialize indicator position
                const activeButton = document.querySelector('.filter-button.active');
                if (activeButton) {
                  moveIndicator(activeButton);
                }

                // Recalculate indicator position on window resize
                window.addEventListener('resize', function() {
                  const currentActive = document.querySelector('.filter-button.active');
                  if (currentActive && filterIndicator) {
                    moveIndicator(currentActive);
                  }
                });

                // Apply default filters on page load
                applyFilters();

                // Add click handlers for region filter buttons
                regionFilterButtons.forEach(button => {
                  button.addEventListener('click', function() {
                    currentRegionFilter = this.getAttribute('data-region-filter');

                    // Update active state
                    regionFilterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Move indicator
                    moveIndicator(this);

                    // Apply filters
                    applyFilters();
                  });
                });

                // Month card collapse/expand functionality
                const monthToggleButtons = document.querySelectorAll('[data-month-toggle]');
                
                monthToggleButtons.forEach(button => {
                  button.addEventListener('click', function() {
                    const card = this.closest('[data-month-card]');
                    if (!card) return;
                    
                    const isExpanded = card.classList.contains('expanded');
                    
                    if (isExpanded) {
                      card.classList.remove('expanded');
                      card.classList.add('collapsed');
                      this.setAttribute('aria-expanded', 'false');
                    } else {
                      card.classList.remove('collapsed');
                      card.classList.add('expanded');
                      this.setAttribute('aria-expanded', 'true');
                    }
                  });
                });

                // If no current month card is expanded, expand the first visible one
                const expandedCards = eventsContainer.querySelectorAll('.events-month-card.expanded:not([style*="display: none"])');
                if (expandedCards.length === 0) {
                  const visibleCards = eventsContainer.querySelectorAll('.events-month-card:not([style*="display: none"])');
                  if (visibleCards.length > 0) {
                    visibleCards[0].classList.remove('collapsed');
                    visibleCards[0].classList.add('expanded');
                    const toggle = visibleCards[0].querySelector('[data-month-toggle]');
                    if (toggle) toggle.setAttribute('aria-expanded', 'true');
                  }
                }
              });
            `}} />
            
            {/* Resources Container - Workers pricing style */}
            <div class="resources-container-wrapper">
              {/* Corner decorations */}
              <div class="corner-decorations" aria-hidden="true">
                <div class="corner-decoration corner-top-left"></div>
                <div class="corner-decoration corner-top-right"></div>
                <div class="corner-decoration corner-bottom-left"></div>
                <div class="corner-decoration corner-bottom-right"></div>
              </div>
              
              {/* Middle frame container (darker) - 8px padding creates gap */}
              <div class="resources-frame">
                {/* Category cards container with 8px gap */}
                <div class="resources-content-wrapper">
                  <ResourceList
                    title="Community"
                    resources={resourcesByCategory.community || []}
                  />
                  
                  <ResourceList
                    title="Getting Started"
                    resources={resourcesByCategory.gettingStarted || []}
                  />
                  
                  <ResourceList
                    title="Developer Tools"
                    resources={resourcesByCategory.developerTools || []}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
        
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
