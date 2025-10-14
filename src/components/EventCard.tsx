import { FC } from "hono/jsx";
import { Event } from "../types";
import { Calendar, MapPin, ExternalLink } from "lucide-static";

interface EventCardProps {
  event: Event;
}

export const EventCard: FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateStr: string, endDateStr?: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const year = date.getFullYear();
    const currentYear = today.getFullYear();

    // Add year if not current year
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      ...(year !== currentYear && { year: 'numeric' })
    };

    if (endDateStr) {
      const endDate = new Date(endDateStr);
      const daysDiff = Math.floor((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      // If same day, just show single date
      if (daysDiff === 0) {
        return date.toLocaleDateString(undefined, options);
      }

      // If event spans more than 90 days, consider it "ongoing"
      if (daysDiff > 90) {
        return "Ongoing";
      }

      // Same month
      if (date.getMonth() === endDate.getMonth() && date.getFullYear() === endDate.getFullYear()) {
        return `${date.toLocaleDateString(undefined, { month: 'long' })} ${date.getDate()}-${endDate.getDate()}${year !== currentYear ? `, ${year}` : ''}`;
      } else {
        return `${date.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
      }
    }

    // Check if date is relative to today
    const daysDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff === 0) return "Today";
    if (daysDiff === 1) return "Tomorrow";
    if (daysDiff === -1) return "Yesterday";
    if (daysDiff > 0 && daysDiff <= 7) return `This ${date.toLocaleDateString(undefined, { weekday: 'long' })}`;

    return date.toLocaleDateString(undefined, options);
  };

  const isUpcoming = () => {
    const eventDate = new Date(event.endDate || event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  const daysUntil = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcoming = isUpcoming();
  const days = daysUntil();

  const cardContent = (
    <>
      <div class="event-card-header">
        <h3 class="event-card-title">{event.title}</h3>
        <div class="event-card-badges">
          {event.virtual && <span class="event-badge virtual">Virtual</span>}
          {event.featured && <span class="event-badge featured">Featured</span>}
        </div>
      </div>

      <div class="event-card-meta">
        <div class="event-meta-item">
          <span class="event-meta-icon" dangerouslySetInnerHTML={{ __html: Calendar }} />
          <span>{formatDate(event.date, event.endDate)}</span>
        </div>

        {(event.location || event.region === 'VIRTUAL') && (
          <div class="event-meta-item">
            <span class="event-meta-icon" dangerouslySetInnerHTML={{ __html: MapPin }} />
            <span>{event.location || 'Virtual'}</span>
          </div>
        )}
      </div>

      {event.description && (
        <p class="event-card-description">{event.description}</p>
      )}

      {event.url && (
        <div class="event-card-footer">
          <span class="event-card-action">
            {upcoming ? 'View Details' : 'Past Event'}
            <span dangerouslySetInnerHTML={{ __html: ExternalLink }} />
          </span>
        </div>
      )}
    </>
  );

  if (event.url) {
    return (
      <a
        href={event.url}
        class={`event-card fade-in ${!upcoming ? 'past' : ''}`}
        data-region={event.region || 'unset'}
        data-date={event.date}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      class={`event-card fade-in ${!upcoming ? 'past' : ''}`}
      data-region={event.region || 'unset'}
      data-date={event.date}
    >
      {cardContent}
    </div>
  );
};