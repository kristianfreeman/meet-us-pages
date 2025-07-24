import { Hono } from "hono";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedContent } from "./components/FeaturedContent";
import { EventList } from "./components/EventList";
import { ResourceList } from "./components/ResourceList";
import { Footer } from "./components/Footer";
import { eventService } from "./services/eventService";
import eventsData from "./data/events.json";

const app = new Hono();

app.get("/", (c) => {
  // Get data from our service
  const featuredEvents = eventService.getFeaturedEvents();
  const inPersonEvents = eventService.getInPersonEvents();
  const resources = eventService.getResources();
  
  // Get featured content
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
                <button class="filter-button active" data-filter="all">All Events</button>
                <button class="filter-button" data-filter="upcoming">Upcoming</button>
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
            
            filterButtons.forEach(button => {
              button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter events
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
              });
            });
          });
        `}} />
        
        <section class="resources-section">
          <div class="container">
            <h2 class="section-title">Online</h2>
            
            <ResourceList
              title="Community"
              resources={resources.community}
            />
            
            <h2 class="section-title mt-12">Resources</h2>
            
            <ResourceList
              title="Getting Started"
              resources={resources.gettingStarted}
            />
            
            <ResourceList
              title="Developer Tools"
              resources={resources.developerTools}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </Layout>
  );
});

export default app;