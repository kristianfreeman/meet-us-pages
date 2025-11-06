import { FC } from "hono/jsx";
import { Event } from "../types";
import { ArrowRight, Calendar, MapPin } from "lucide-static";

interface HeroProps {
  featuredEvents: Event[];
}

export const Hero: FC<HeroProps> = ({ featuredEvents }) => {
  // Ensure featuredEvents is an array
  const safeEvents = Array.isArray(featuredEvents) ? featuredEvents : [];

  if (safeEvents.length === 0) return null;

  // Sort featured events by date (oldest to newest)
  const sortedEvents = [...safeEvents].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // Show only the first featured event in the hero
  const mainEvent = sortedEvents[0];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div class="container">
      <section class="hero fade-in">
        <div class="hero-content">
          <h2>{mainEvent.title}</h2>
          {mainEvent.description && (
            <p class="hero-description">{mainEvent.description}</p>
          )}
          <div class="hero-details">
            {mainEvent.date && (
              <div class="hero-detail-item">
                <span class="hero-detail-icon" dangerouslySetInnerHTML={{ __html: Calendar }} />
                <span>{formatDate(mainEvent.date)} at {formatTime(mainEvent.date)}</span>
              </div>
            )}
            {mainEvent.location && (
              <div class="hero-detail-item">
                <span class="hero-detail-icon" dangerouslySetInnerHTML={{ __html: MapPin }} />
                <span>{mainEvent.location}</span>
              </div>
            )}
          </div>
          <a href={mainEvent.url} class="hero-cta" target="_blank" rel="noopener noreferrer">
            Register Now
            <span dangerouslySetInnerHTML={{ __html: ArrowRight }} />
          </a>
        </div>
      </section>
    </div>
  );
};