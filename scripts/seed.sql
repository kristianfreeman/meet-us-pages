-- Local development seed data for meet-us-db
-- Safe to rerun: clears and repopulates events/resources only.

DELETE FROM events;
DELETE FROM resources;

INSERT INTO events (
  id, title, description, date, end_date, location, region, url, type, tags, status, featured, virtual
) VALUES
  (
    'connect-london-2026',
    'Connect - London',
    'Connect, protect, and build everywhere at Cloudflare Connect London.',
    '2026-04-15',
    '2026-04-15',
    'London, England',
    'EMEA',
    'https://www.cloudflare.com/en-gb/events/connect/london/',
    'Tradeshow',
    'Q2, Confirmed, Corp Marketing, Pipeline',
    'published',
    1,
    0
  ),
  (
    'immerse-houston-2026',
    'Immerse: Houston',
    'Regional executive engagement for Cloudflare customers and partners.',
    '2026-04-02',
    '2026-04-02',
    'Houston, TX',
    'NAMER',
    'https://fieldmarketing.www.cloudflare.com/Immerse-Houston',
    'Exec Engagements',
    'Q2, Confirmed',
    'published',
    0,
    0
  ),
  (
    'google-next-2026',
    'Google Next',
    'Join Cloudflare at Google Next in Las Vegas.',
    '2026-04-22',
    '2026-04-24',
    'Las Vegas, NV',
    'NAMER',
    'https://www.googlecloudevents.com/next-vegas',
    'Tradeshow',
    'Q2, Confirmed',
    'published',
    0,
    0
  ),
  (
    'ai-engineer-singapore-2026',
    'AI Engineer - Singapore',
    'Technical event focused on production AI systems and tooling.',
    '2026-05-15',
    '2026-05-17',
    'Singapore',
    'APAC',
    'https://www.ai.engineer/',
    'Tradeshow',
    'Q2, Confirmed',
    'published',
    0,
    0
  ),
  (
    'immerse-seoul-2026',
    'Immerse: Seoul',
    'Regional field event for local developer and security communities.',
    '2026-08-25',
    '2026-08-25',
    'Seoul, South Korea',
    'APAC',
    NULL,
    'Exec Engagements',
    'Q3, Confirmed',
    'draft',
    0,
    0
  ),
  (
    'immerse-atlanta-2026',
    'Immerse: Atlanta',
    'Regional field event for prospects and customers in Atlanta.',
    '2026-11-12',
    '2026-11-12',
    'Atlanta, GA',
    'NAMER',
    NULL,
    'Exec Engagements',
    'Q4, Confirmed',
    'draft',
    0,
    0
  );

INSERT INTO resources (
  id, title, description, url, category, "order"
) VALUES
  ('sign-up', 'Get Started with Cloudflare', 'Sign up for Workers and Pages.', 'https://dash.cloudflare.com/sign-up/workers-and-pages', 'getting-started', 1),
  ('docs', 'Documentation', 'Read Cloudflare developer documentation.', 'https://developers.cloudflare.com/', 'getting-started', 2),
  ('workers', 'Cloudflare Workers', 'Build serverless apps at the edge.', 'https://developers.cloudflare.com/workers/', 'developer-tools', 1),
  ('pages', 'Cloudflare Pages', 'Deploy full-stack apps globally.', 'https://developers.cloudflare.com/pages/', 'developer-tools', 2),
  ('discord', 'Cloudflare Developers Discord', 'Join the developer community.', 'https://discord.cloudflare.com', 'community', 1),
  ('youtube', 'CloudflareDevelopers YouTube', 'Watch tutorials and talks.', 'https://youtube.com/@cloudflaredevelopers', 'community', 2);
