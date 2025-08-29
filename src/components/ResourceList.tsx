import { FC } from "hono/jsx";
import { Resource } from "../types";
import { ResourceCard } from "./ResourceCard";

interface ResourceListProps {
  title: string;
  resources: Resource[];
  className?: string;
}

export const ResourceList: FC<ResourceListProps> = ({ title, resources, className = "" }) => {
  // Ensure resources is an array
  const safeResources = Array.isArray(resources) ? resources : [];
  
  if (safeResources.length === 0) return null;

  return (
    <div class={`resources-category ${className}`}>
      <h3 class="resources-category-title">{title}</h3>
      <div class="resources-grid">
        {safeResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};