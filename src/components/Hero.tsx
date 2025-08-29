import { FC } from "hono/jsx";
import { Event } from "../types";
import { ArrowRight } from "lucide-static";

interface HeroProps {
  featuredEvents: Event[];
}

export const Hero: FC<HeroProps> = ({ featuredEvents }) => {
  // Ensure featuredEvents is an array
  const safeEvents = Array.isArray(featuredEvents) ? featuredEvents : [];
  
  if (safeEvents.length === 0) return null;

  // Show only the first featured event in the hero
  const mainEvent = safeEvents[0];

  return (
    <div class="container">
      <section class="hero fade-in">
        <div class="hero-content">
          <h2>{mainEvent.title}</h2>
          {mainEvent.description && (
            <p class="hero-description">{mainEvent.description}</p>
          )}
          <a href={mainEvent.url} class="hero-cta" target="_blank" rel="noopener noreferrer">
            Register Now
            <span dangerouslySetInnerHTML={{ __html: ArrowRight }} />
          </a>
        </div>
      </section>
    </div>
  );
};