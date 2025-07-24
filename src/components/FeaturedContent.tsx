import { FC } from "hono/jsx";
import { Lock, Trophy, Zap } from "lucide-static";

interface FeaturedContentProps {
  hackTheSafe?: {
    id: string;
    title: string;
    description?: string;
    url: string;
    icon?: string;
    type?: string;
  };
}

export const FeaturedContent: FC<FeaturedContentProps> = ({ hackTheSafe }) => {
  if (!hackTheSafe) return null;

  const getIcon = () => {
    switch (hackTheSafe.icon) {
      case 'trophy': return Trophy;
      case 'zap': return Zap;
      case 'lock':
      default: return Lock;
    }
  };

  const icon = getIcon();

  return (
    <section class="featured-content">
      <div class="container">
        <a href={hackTheSafe.url} class="featured-card" target="_blank" rel="noopener noreferrer">
          <div class="featured-card-content">
            <div class="featured-icon-wrapper">
              <span class="featured-icon" dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
            <div class="featured-text">
              <h3 class="featured-title">{hackTheSafe.title}</h3>
              {hackTheSafe.description && (
                <p class="featured-description">{hackTheSafe.description}</p>
              )}
            </div>
            <div class="featured-cta">
              Start Challenge
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};