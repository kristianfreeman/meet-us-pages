import { FC } from "hono/jsx";
import { Event } from "../types";
import { EventListItem } from "./EventListItem";

interface EventListProps {
  title: string;
  events: Event[];
  className?: string;
}

export const EventList: FC<EventListProps> = ({ title, events, className = "" }) => {
  // Ensure events is an array
  const safeEvents = Array.isArray(events) ? events : [];

  if (safeEvents.length === 0) return null;

  // Sort events: featured first, then by date (soonest/earliest first)
  const sortedEvents = [...safeEvents].sort((a, b) => {
    // Featured events come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then sort by date (soonest/earliest first - ascending order)
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Group events by month
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  // Get sorted month keys
  const sortedMonths = Object.keys(groupedEvents).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  // Get current month/year for comparison
  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      {title && <h2 class="section-title">{title}</h2>}

      {sortedMonths.map((monthYear) => {
        const isCurrentMonth = monthYear === currentMonthYear;
        return (
          <div 
            key={monthYear} 
            class={`events-month-card ${isCurrentMonth ? 'expanded' : 'collapsed'}`}
            data-month-card
            data-month={monthYear}
          >
            {/* SVG Dashed Border - like Workers pricing */}
            <svg class="events-card-border" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <rect 
                x="0.5" 
                y="0.5" 
                width="99%" 
                height="99%" 
                rx="8" 
                ry="8" 
                stroke="var(--color-border-100)" 
                stroke-width="1" 
                stroke-dasharray="8 8" 
                stroke-linecap="round" 
                fill="none"
              />
            </svg>
            
            {/* Card content */}
            <div class="events-month-content">
              <button 
                class="events-month-header" 
                data-month-toggle
                aria-expanded={isCurrentMonth ? "true" : "false"}
              >
                <h4 class="events-month-title">{monthYear}</h4>
                <svg class="events-month-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="events-month-body" data-month-body>
                <div class="events-list-grid">
                  {/* Event rows - no header */}
                  {groupedEvents[monthYear].map((event) => (
                    <EventListItem key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};