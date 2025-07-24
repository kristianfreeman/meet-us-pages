export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  endDate?: string;
  location?: string;
  url: string;
  type: 'conference' | 'summit' | 'meetup' | 'webinar' | 'hackathon';
  tags?: string[];
  featured?: boolean;
  virtual?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  category: 'getting-started' | 'developer-tools' | 'community' | 'documentation';
}

export interface EventsData {
  events: {
    featured: Event[];
    inPerson: Event[];
    online: Event[];
  };
  resources: {
    gettingStarted: Resource[];
    developerTools: Resource[];
    community: Resource[];
  };
}

export type EventCategory = 'featured' | 'inPerson' | 'online';
export type ResourceCategory = 'gettingStarted' | 'developerTools' | 'community';