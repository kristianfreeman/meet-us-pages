import { Event, EventsData } from "../types";
import eventsData from "../data/events.json";

export class EventService {
  private data: EventsData;

  constructor() {
    this.data = eventsData as EventsData;
  }

  /**
   * Get all events, optionally filtered by whether they're upcoming
   */
  getAllEvents(onlyUpcoming = false): Event[] {
    const allEvents = [
      ...this.data.events.featured,
      ...this.data.events.inPerson,
      ...this.data.events.online
    ];

    if (onlyUpcoming) {
      return this.filterUpcomingEvents(allEvents);
    }

    return this.sortEventsByDate(allEvents);
  }

  /**
   * Get featured events
   */
  getFeaturedEvents(onlyUpcoming = true): Event[] {
    const events = this.data.events.featured;
    if (onlyUpcoming) {
      return this.filterUpcomingEvents(events);
    }
    return events;
  }

  /**
   * Get in-person events
   */
  getInPersonEvents(onlyUpcoming = true): Event[] {
    const events = this.data.events.inPerson;
    if (onlyUpcoming) {
      return this.filterUpcomingEvents(events);
    }
    return this.sortEventsByDate(events);
  }

  /**
   * Get online events
   */
  getOnlineEvents(onlyUpcoming = true): Event[] {
    const events = this.data.events.online || [];
    if (onlyUpcoming) {
      return this.filterUpcomingEvents(events);
    }
    return this.sortEventsByDate(events);
  }

  /**
   * Get all resources
   */
  getResources() {
    return this.data.resources;
  }

  /**
   * Filter events to only show upcoming ones
   */
  private filterUpcomingEvents(events: Event[]): Event[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter(event => {
      const eventDate = new Date(event.endDate || event.date);
      return eventDate >= today;
    });
  }

  /**
   * Sort events by date (ascending)
   */
  private sortEventsByDate(events: Event[]): Event[] {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }

  /**
   * Get events happening in the next N days
   */
  getUpcomingEvents(days: number): Event[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);

    const allEvents = this.getAllEvents(true);
    
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= futureDate;
    });
  }

  /**
   * Search events by query
   */
  searchEvents(query: string): Event[] {
    const lowercaseQuery = query.toLowerCase();
    const allEvents = this.getAllEvents();

    return allEvents.filter(event => {
      return (
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description?.toLowerCase().includes(lowercaseQuery) ||
        event.location?.toLowerCase().includes(lowercaseQuery) ||
        event.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    });
  }
}

// Export a singleton instance
export const eventService = new EventService();