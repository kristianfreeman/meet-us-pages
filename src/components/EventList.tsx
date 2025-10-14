import { FC } from "hono/jsx";
import { Event } from "../types";
import { EventCard } from "./EventCard";

interface EventListProps {
  title: string;
  events: Event[];
  className?: string;
}

export const EventList: FC<EventListProps> = ({ title, events, className = "" }) => {
  // Ensure events is an array
  const safeEvents = Array.isArray(events) ? events : [];

  if (safeEvents.length === 0) return null;

  // Group all events by month
  const groupedEvents = safeEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  // Sort months chronologically
  const sortedMonths = Object.keys(groupedEvents).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  // Sort events within each month: featured first, then by date
  Object.keys(groupedEvents).forEach(month => {
    groupedEvents[month].sort((a, b) => {
      // Featured events come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  });

  return (
    <section class={`events-section ${className}`}>
      <div class="container">
        <h2 class="section-title">{title}</h2>

        {sortedMonths.map((monthYear) => (
          <div key={monthYear} class="events-month-group">
            <h3 class="events-month-title">{monthYear}</h3>
            <div class="events-grid">
              {groupedEvents[monthYear].map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};