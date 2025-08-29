-- Insert sample events
INSERT INTO events (id, title, description, date, location, url, type, featured, virtual) VALUES 
('evt_1', 'Cloudflare Connect 2025', 'Join us for our annual developer conference featuring talks on edge computing, security, and the future of the web.', '2025-09-15', 'San Francisco, CA', 'https://cloudflare.com/connect', 'conference', true, false),
('evt_2', 'Security Week Workshop', 'Deep dive into Cloudflare security features including WAF, DDoS protection, and Zero Trust.', '2025-08-20', 'Virtual Event', 'https://cloudflare.com/security-week', 'workshop', false, true),
('evt_3', 'Developer Meetup NYC', 'Monthly meetup for developers building on Cloudflare Workers and Pages.', '2025-08-10', 'New York, NY', 'https://meetup.com/cloudflare-nyc', 'meetup', false, false),
('evt_4', 'Workers Launchpad Demo Day', 'See the latest startups building on Cloudflare Workers present their innovations.', '2025-09-01', 'Austin, TX', 'https://cloudflare.com/launchpad', 'demo', true, false);

-- Insert sample resources
INSERT INTO resources (id, title, description, url, category, "order") VALUES 
-- Community resources
('res_1', 'Cloudflare Community Forum', 'Get help and connect with other Cloudflare users', 'https://community.cloudflare.com', 'community', 1),
('res_2', 'Discord Server', 'Join our Discord for real-time chat and support', 'https://discord.gg/cloudflaredev', 'community', 2),
('res_3', 'Reddit Community', 'Discussion and news on r/CloudFlare', 'https://reddit.com/r/CloudFlare', 'community', 3),

-- Getting Started resources
('res_4', 'Workers Documentation', 'Complete guide to building with Cloudflare Workers', 'https://developers.cloudflare.com/workers/', 'gettingStarted', 1),
('res_5', 'Quick Start Tutorial', 'Get up and running in 5 minutes', 'https://developers.cloudflare.com/workers/get-started/quickstarts/', 'gettingStarted', 2),
('res_6', 'Video Tutorials', 'Learn through our video course series', 'https://cloudflare.tv/developers', 'gettingStarted', 3),

-- Developer Tools
('res_7', 'Wrangler CLI', 'Command line tool for managing Workers', 'https://developers.cloudflare.com/workers/wrangler/', 'developerTools', 1),
('res_8', 'Workers Playground', 'Test and experiment with Workers in your browser', 'https://workers.cloudflare.com/playground', 'developerTools', 2),
('res_9', 'Template Gallery', 'Start with pre-built Workers templates', 'https://developers.cloudflare.com/workers/templates/', 'developerTools', 3);