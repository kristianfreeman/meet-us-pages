import { FC } from "hono/jsx";
import { Resource } from "../types";
import { 
  Youtube, 
  MessageSquare, 
  Twitter, 
  Hash,
  FileText,
  BookOpen,
  Rocket,
  Code2,
  Brain,
  Layers,
  GitBranch,
  Video,
  ExternalLink
} from "lucide-static";

interface ResourceCardProps {
  resource: Resource;
}

const getIconForResource = (resource: Resource): string => {
  const iconMap: Record<string, string> = {
    // Community icons
    'youtube': Youtube,
    'discord': MessageSquare,
    'twitter': Twitter,
    'bluesky': Hash,
    'webinars': Video,
    
    // Getting started icons
    'sign-up': Rocket,
    'docs': BookOpen,
    
    // Developer tools icons
    'ai-agents': Brain,
    'ai-platform': Layers,
    'multi-modal-playground': Code2,
    'ai-playground': Code2,
    'langchain-cloudflare': GitBranch,
  };
  
  return iconMap[resource.id] || FileText;
};

export const ResourceCard: FC<ResourceCardProps> = ({ resource }) => {
  const icon = getIconForResource(resource);
  
  return (
    <a 
      href={resource.url} 
      class="resource-item"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div class="resource-item-icon">
        <span dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <div class="resource-item-text">
        <p class="resource-item-title">
          {resource.title}
        </p>
        {resource.description && (
          <p class="resource-item-description">
            {resource.description}
          </p>
        )}
      </div>
    </a>
  );
};