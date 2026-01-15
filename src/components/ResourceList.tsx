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
    <div class={`resource-category-card ${className}`}>
      <svg class="resource-card-border" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="99%" height="99%" rx="8" ry="8" stroke="var(--color-border-100)" stroke-width="1" fill="none"></rect>
      </svg>
      <div class="resource-category-content">
        <p class="resource-category-title">{title}</p>
        <div class="resource-items-list">
          {safeResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};