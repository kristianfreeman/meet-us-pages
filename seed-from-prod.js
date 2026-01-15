import fs from 'fs';

// Read production data
const eventsData = JSON.parse(fs.readFileSync('/tmp/prod-events.json', 'utf8'));
const resourcesData = JSON.parse(fs.readFileSync('/tmp/prod-resources.json', 'utf8'));

const events = eventsData.events || [];
const resources = resourcesData.resources || [];

console.log(`📦 Found ${events.length} events and ${resources.length} resources from production`);

// Generate SQL INSERT statements
const eventInserts = events.map(event => {
  const values = [
    event.id,
    event.title,
    event.description || null,
    event.date,
    event.endDate || null,
    event.location || null,
    event.region || null,
    event.url || null,
    event.type || null,
    event.tags || null,
    event.featured ? 1 : 0,
    event.virtual ? 1 : 0,
    event.createdAt,
    event.updatedAt
  ].map(v => v === null ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`).join(', ');
  
  return `INSERT OR REPLACE INTO events (id, title, description, date, end_date, location, region, url, type, tags, featured, virtual, created_at, updated_at) VALUES (${values});`;
}).join('\n');

const resourceInserts = resources.map(resource => {
  const values = [
    resource.id,
    resource.title,
    resource.description || null,
    resource.url,
    resource.category,
    resource.order || 0,
    resource.createdAt,
    resource.updatedAt
  ].map(v => v === null ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`).join(', ');
  
  return `INSERT OR REPLACE INTO resources (id, title, description, url, category, "order", created_at, updated_at) VALUES (${values});`;
}).join('\n');

const sql = `-- Seed data from production
-- Generated: ${new Date().toISOString()}

-- Clear existing data
DELETE FROM events;
DELETE FROM resources;

-- Insert events
${eventInserts}

-- Insert resources
${resourceInserts}

-- Verify counts
SELECT 'Events: ' || COUNT(*) as count FROM events;
SELECT 'Resources: ' || COUNT(*) as count FROM resources;
`;

fs.writeFileSync('./seed-prod.sql', sql);
console.log('✅ Generated seed-prod.sql');
console.log('📝 Run: npx wrangler d1 execute meet-us-db --local --file=./seed-prod.sql');
