-- Clear existing data
DELETE FROM resources;
DELETE FROM events;

-- Insert all events from original JSON
INSERT INTO events (id, title, description, date, end_date, location, url, type, tags, featured, virtual) VALUES 
-- Featured event
('cloudflare-connect-2025', 'Cloudflare Connect 2025', 'Join us for the premier Cloudflare developer conference', '2025-10-13', '2025-10-16', 'Las Vegas, NV', 'https://events.www.cloudflare.com/connect2025/home', 'conference', 'flagship,developer,networking', true, false),

-- In-person events
('aws-summit-nyc-2025', 'AWS Summit: New York', 'Join Cloudflare at AWS Summit New York', '2025-07-16', NULL, 'New York, NY', 'https://aws.amazon.com/events/summits/new-york/', 'summit', 'aws,cloud,enterprise', false, false),
('laracon-us-2025', 'Laracon US', 'The official Laravel conference', '2025-07-29', '2025-07-30', 'Denver, CO', 'https://laracon.us/', 'conference', 'laravel,php,web', false, false),
('aws-summit-mexico-2025', 'AWS Summit: Mexico City', 'AWS Summit in Mexico City', '2025-08-06', NULL, 'Mexico City, Mexico', 'https://aws.amazon.com/es/events/summits/mexico-city/', 'summit', 'aws,cloud,latam', false, false),
('kubecon-india-2025', 'KubeCon India', 'The Cloud Native Computing Foundation''s flagship conference', '2025-08-06', '2025-08-07', 'Hyderabad, India', 'https://events.linuxfoundation.org/kubecon-cloudnativecon-india/', 'conference', 'kubernetes,cloud-native,containers', false, false),
('aws-summit-sao-paulo-2025', 'AWS Summit: São Paulo', 'AWS Summit in São Paulo', '2025-08-13', NULL, 'São Paulo, Brazil', 'https://aws.amazon.com/pt/events/summits/sao-paulo/', 'summit', 'aws,cloud,latam', false, false),
('aws-summit-toronto-2025', 'AWS Summit: Toronto', 'AWS Summit in Toronto', '2025-09-04', NULL, 'Toronto, Canada', 'https://aws.amazon.com/events/summits/toronto/', 'summit', 'aws,cloud,canada', false, false),
('aws-summit-zurich-2025', 'AWS Summit: Zurich', 'AWS Summit in Zurich', '2025-09-11', NULL, 'Zurich, Switzerland', 'https://aws.amazon.com/events/summits/zurich/', 'summit', 'aws,cloud,europe', false, false),
('aws-summit-los-angeles-2025', 'AWS Summit: Los Angeles', 'AWS Summit in Los Angeles', '2025-09-17', NULL, 'Los Angeles, CA', 'https://aws.amazon.com/events/summits/los-angeles/', 'summit', 'aws,cloud,west-coast', false, false),
('cascadiajs-2025', 'CascadiaJS', 'The Pacific Northwest JavaScript Conference', '2025-09-17', '2025-09-20', 'Seattle, WA', 'https://cascadiajs.com/', 'conference', 'javascript,web,frontend', false, false),

-- Virtual event
('code-word-conf-2025', 'Code Word', 'Virtual developer conference', '2025-09-25', NULL, 'Virtual', 'https://cfe.dev/events/codeword-conf-2025/', 'conference', 'virtual,developer,web', false, true);

-- Insert all resources from original JSON
INSERT INTO resources (id, title, description, url, category, "order") VALUES 
-- Getting Started
('sign-up', 'Get Started with Cloudflare', 'Sign up for Workers and Pages', 'https://dash.cloudflare.com/sign-up/workers-and-pages', 'gettingStarted', 1),
('docs', 'Documentation', 'Read the comprehensive Cloudflare docs', 'https://developers.cloudflare.com/', 'gettingStarted', 2),

-- Developer Tools
('ai-agents', 'AI Agents', 'Explore building AI Agents on Cloudflare', 'https://developers.cloudflare.com/agents', 'developerTools', 1),
('ai-platform', 'AI Platform', 'Build and deploy AI applications on Cloudflare', 'https://ai.cloudflare.com', 'developerTools', 2),
('multi-modal-playground', 'Multi-modal AI Playground', 'Visually build with AI models', 'https://multi-modal.ai.cloudflare.com/', 'developerTools', 3),
('ai-playground', 'AI Playground', 'Explore Text Generation models', 'https://playground.ai.cloudflare.com', 'developerTools', 4),
('langchain-cloudflare', 'Langchain & LangGraph', 'Use Cloudflare with Langchain and LangGraph', 'https://github.com/cloudflare/langchain-cloudflare', 'developerTools', 5),

-- Community
('youtube', 'CloudflareDevelopers YouTube', 'Watch tutorials and talks', 'https://youtube.com/@cloudflaredevelopers', 'community', 1),
('mlh-hackathons', 'Major League Hacking', 'Find a hackathon near you', 'https://mlh.io/seasons/2025/events', 'community', 2),
('webinars', 'Webinars', 'Check out our upcoming webinars', 'https://www.cloudflare.com/resource-hub/?resourcetype=Webinar', 'community', 3),
('discord', 'Discord', 'Join our community on Discord', 'https://discord.cloudflare.com', 'community', 4),
('twitter', 'X (Twitter)', 'Follow us on X', 'https://x.com/cloudflaredev', 'community', 5),
('bluesky', 'BlueSky', 'Nothing but BlueSky from now on', 'https://bsky.app/profile/cloudflare-dev.bsky.social', 'community', 6);