import { FC } from "hono/jsx";
import { Event } from "../types";
import { EventCard } from "./EventCard";

interface EventListProps {
  title: string;
  events: Event[];
  className?: string;
}

export const EventList: FC<EventListProps> = ({ title, events, className = "" }) => {
  if (events.length === 0) return null;

  // Group events by month
  const groupedEvents = events.reduce((groups, event) => {
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