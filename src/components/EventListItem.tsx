import { FC } from "hono/jsx";
import { Event } from "../types";
import { Calendar, MapPin, ExternalLink } from "lucide-static";

interface EventListItemProps {
  event: Event;
}

export const EventListItem: FC<EventListItemProps> = ({ event }) => {
  const formatDate = (dateStr: string, endDateStr?: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const year = date.getFullYear();
    const currentYear = today.getFullYear();

    // Short date format for list view
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
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
        return `${date.toLocaleDateString(undefined, { month: 'short' })} ${date.getDate()}-${endDate.getDate()}${year !== currentYear ? `, ${year}` : ''}`;
      } else {
        return `${date.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
      }
    }

    // Check if date is relative to today
    const daysDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff === 0) return "Today";
    if (daysDiff === 1) return "Tomorrow";
    if (daysDiff === -1) return "Yesterday";
    if (daysDiff > 0 && daysDiff <= 7) return `This ${date.toLocaleDateString(undefined, { weekday: 'short' })}`;

    return date.toLocaleDateString(undefined, options);
  };

  const isUpcoming = () => {
    const eventDate = new Date(event.endDate || event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  const upcoming = isUpcoming();

  const itemContent = (
    <div class="event-list-item-inner">
      <div class="event-list-title">
        <h3>{event.title}</h3>
        {event.featured && <span class="event-badge featured">Featured</span>}
      </div>

      <div class="event-list-date">
        <span>{formatDate(event.date, event.endDate)}</span>
      </div>

      <div class="event-list-location">
        {(event.location || event.region === 'VIRTUAL') && (
          <>
            <span dangerouslySetInnerHTML={{ __html: MapPin }} />
            <span>{event.location || 'Virtual'}</span>
          </>
        )}
      </div>

      {event.url && (
        <div class="event-list-action">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="event-list-action-icon">
            <path d="M0.978334 9.04059L7.95324 2.06569L3.53665 2.07842L3.53665 0.52561L10.5879 0.52561L10.5879 7.57688L9.04784 7.58961L9.04784 3.16029L2.07294 10.1352L0.978334 9.04059Z" fill="var(--color-text-secondary)"></path>
          </svg>
        </div>
      )}
    </div>
  );

  if (event.url) {
    return (
      <a
        href={event.url}
        class={`event-list-item ${!upcoming ? 'past' : ''}`}
        data-region={event.region || 'unset'}
        data-date={event.date}
        target="_blank"
        rel="noopener noreferrer"
      >
        {itemContent}
      </a>
    );
  }

  return (
    <div
      class={`event-list-item ${!upcoming ? 'past' : ''}`}
      data-region={event.region || 'unset'}
      data-date={event.date}
    >
      {itemContent}
    </div>
  );
};
