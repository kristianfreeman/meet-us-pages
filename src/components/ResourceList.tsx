import { FC } from "hono/jsx";
import { Resource } from "../types";
import { ResourceCard } from "./ResourceCard";

interface ResourceListProps {
  title: string;
  resources: Resource[];
  className?: string;
}

export const ResourceList: FC<ResourceListProps> = ({ title, resources, className = "" }) => {
  if (resources.length === 0) return null;

  return (
    <div class={`resources-category ${className}`}>
      <h3 class="resources-category-title">{title}</h3>
      <div class="resources-grid">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};