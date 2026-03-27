import { loadEnvFiles } from './scripts/load-env.js';

loadEnvFiles();

// Q1 and Q2 2026 Events
const events = [
  {
    title: "Station F: Project F/AI Program for Startups",
    description: "AI program for startups at Station F",
    date: "2026-01-01",
    endDate: "2026-03-31",
    location: "Paris, France",
    region: "EMEA",
    type: "workshop",
    tags: JSON.stringify(["AI", "Startups"])
  },
  {
    title: "Builderthon IIT Delhi",
    description: "Hackathon at IIT Delhi",
    date: "2026-01-15",
    endDate: "2026-01-16",
    location: "New Delhi, India",
    region: "APAC",
    type: "hackathon",
    tags: JSON.stringify(["DEV"])
  },
  {
    title: "Builderthon IGWTU",
    description: "Hackathon at IGWTU",
    date: "2026-01-16",
    location: "New Delhi, India",
    region: "APAC",
    type: "hackathon",
    tags: JSON.stringify(["DEV"])
  },
  {
    title: "ICE Gaming",
    description: "Gaming conference in Barcelona",
    date: "2026-01-19",
    endDate: "2026-01-21",
    location: "Barcelona, Spain",
    region: "EMEA",
    type: "conference",
    tags: JSON.stringify(["Gaming"])
  },
  {
    title: "Tech Talk: Secure Vibe Coding and Sandboxing for Developers",
    description: "Virtual tech talk on secure coding practices",
    date: "2026-01-22",
    location: null,
    region: "VIRTUAL",
    type: "workshop",
    tags: JSON.stringify(["DEV"]),
    virtual: true,
    url: null
  },
  {
    title: "Hackathon: Singapore University",
    description: "University hackathon in Singapore",
    date: "2026-01-22",
    endDate: "2026-01-25",
    location: "Singapore",
    region: "APAC",
    type: "hackathon",
    tags: JSON.stringify(["DEV"])
  },
  {
    title: "Data Day Texas",
    description: "Data conference in Austin",
    date: "2026-01-24",
    endDate: "2026-01-25",
    location: "Austin, TX",
    region: "NAMER",
    type: "conference",
    url: "https://datadaytexas.com/",
    tags: JSON.stringify(["Data", "All"])
  },
  {
    title: "Workshop: Builders Tokyo",
    description: "Builder workshop in Tokyo",
    date: "2026-01-29",
    location: "Tokyo, Japan",
    region: "APAC",
    type: "workshop",
    tags: JSON.stringify(["DEV"])
  },
  {
    title: "Web Summit Qatar",
    description: "Major tech conference in Qatar",
    date: "2026-02-01",
    endDate: "2026-02-04",
    location: "Qatar",
    region: "EMEA",
    type: "conference",
    tags: JSON.stringify(["All"])
  },
  {
    title: "Tech Talk: Enhancing Your React App with AI without Rewriting It",
    description: "Virtual tech talk on AI integration in React",
    date: "2026-02-04",
    location: null,
    region: "VIRTUAL",
    type: "workshop",
    tags: JSON.stringify(["DEV", "AI"]),
    virtual: true
  },
  {
    title: "Hackathon: AI Impact Summit",
    description: "AI-focused hackathon in New Delhi",
    date: "2026-02-10",
    location: "New Delhi, India",
    region: "APAC",
    type: "hackathon",
    tags: JSON.stringify(["AI"])
  },
  {
    title: "Workshop: MCP Builder | Toronto",
    description: "Model Context Protocol builder workshop",
    date: "2026-02-11",
    location: "Toronto, Canada",
    region: "NAMER",
    type: "workshop",
    url: "https://fieldmarketing.www.cloudflare.com/MCPToronto",
    tags: JSON.stringify(["Agents", "MCP"])
  },
  {
    title: "Stanford Treehacks",
    description: "Stanford University hackathon",
    date: "2026-02-13",
    endDate: "2026-02-15",
    location: "Stanford, CA",
    region: "NAMER",
    type: "hackathon",
    url: "https://treehacks.com/",
    tags: JSON.stringify(["All"])
  },
  {
    title: "AI Impact Summit",
    description: "Major AI conference in India",
    date: "2026-02-16",
    endDate: "2026-02-20",
    location: "New Delhi, India",
    region: "APAC",
    type: "conference",
    url: "https://www.impactexpo.indiaai.gov.in/",
    tags: JSON.stringify(["AI", "Agents", "MCP"])
  },
  {
    title: "INMA Agentic AI Masterclass",
    description: "Virtual masterclass on agentic AI",
    date: "2026-02-19",
    location: null,
    region: "VIRTUAL",
    type: "workshop",
    tags: JSON.stringify(["AI"]),
    virtual: true
  },
  {
    title: "Tech Talk: Build and Deploy AI-powered agents",
    description: "Virtual tech talk on AI agents",
    date: "2026-02-24",
    location: null,
    region: "VIRTUAL",
    type: "workshop",
    tags: JSON.stringify(["Agents", "MCP"]),
    virtual: true
  },
  {
    title: "AI Coding Summit",
    description: "Virtual summit on AI-powered coding",
    date: "2026-02-26",
    endDate: "2026-02-27",
    location: null,
    region: "VIRTUAL",
    type: "conference",
    tags: JSON.stringify(["AI", "DEV", "Agents"]),
    virtual: true
  },
  {
    title: "Vue.js Amsterdam",
    description: "Vue.js conference in Amsterdam",
    date: "2026-03-12",
    endDate: "2026-03-13",
    location: "Amsterdam, Netherlands",
    region: "EMEA",
    type: "conference",
    url: "https://www.tickettailor.com/events/vuejsamsterdam/1927320",
    tags: JSON.stringify(["Frontend JS", "Backend JS"])
  },
  {
    title: "SXSW 2026",
    description: "South by Southwest festival and conference",
    date: "2026-03-12",
    endDate: "2026-03-18",
    location: "Austin, TX",
    region: "NAMER",
    type: "conference",
    url: "https://www.sxsw.com/",
    tags: JSON.stringify(["All"])
  },
  {
    title: "NVIDIA GTC 2026",
    description: "NVIDIA GPU Technology Conference",
    date: "2026-03-16",
    endDate: "2026-03-19",
    location: "Santa Clara, CA",
    region: "NAMER",
    type: "conference",
    url: "https://www.nvidia.com/gtc/",
    tags: JSON.stringify(["AI"])
  },
  {
    title: "Tech Talk: S3 to R2 Migration",
    description: "Virtual tech talk on migrating from S3 to R2",
    date: "2026-03-17",
    location: null,
    region: "VIRTUAL",
    type: "workshop",
    tags: JSON.stringify(["Storage"]),
    virtual: true
  },
  {
    title: "React Paris",
    description: "React conference in Paris",
    date: "2026-03-26",
    endDate: "2026-03-27",
    location: "Paris, France",
    region: "EMEA",
    type: "conference",
    url: "https://react.paris/",
    tags: JSON.stringify(["Backend JS", "Frontend JS"])
  },
  {
    title: "Node Congress",
    description: "Virtual Node.js conference",
    date: "2026-03-26",
    endDate: "2026-03-27",
    location: null,
    region: "VIRTUAL",
    type: "conference",
    url: "https://gitnation.com/events/node-congress-2026",
    tags: JSON.stringify(["Backend JS", "Frontend JS"]),
    virtual: true
  },
  {
    title: "Connect - London",
    description: "Cloudflare Connect in London",
    date: "2026-04-15",
    location: "London, England",
    region: "EMEA",
    type: "conference",
    tags: JSON.stringify(["All"])
  },
  {
    title: "NAB Vegas",
    description: "National Association of Broadcasters show",
    date: "2026-04-18",
    endDate: "2026-04-22",
    location: "Las Vegas, NV",
    region: "NAMER",
    type: "conference",
    url: "https://www.nabshow.com/las-vegas/",
    tags: JSON.stringify(["WebRTC", "Media"])
  },
  {
    title: "Google Next",
    description: "Google Cloud conference",
    date: "2026-04-22",
    endDate: "2026-04-24",
    location: "Las Vegas, NV",
    region: "NAMER",
    type: "conference",
    url: "https://www.googlecloudevents.com/next-vegas",
    tags: JSON.stringify(["All"])
  },
  {
    title: "React Miami",
    description: "React conference in Miami",
    date: "2026-04-23",
    endDate: "2026-04-24",
    location: "Miami, FL",
    region: "NAMER",
    type: "conference",
    tags: JSON.stringify(["Backend JS", "Frontend JS"])
  },
  {
    title: "JS World Conference",
    description: "JavaScript conference in Amsterdam",
    date: "2026-05-07",
    endDate: "2026-05-08",
    location: "Amsterdam, Netherlands",
    region: "EMEA",
    type: "conference",
    url: "https://jsworldconference.com/",
    tags: JSON.stringify(["Backend JS", "Frontend JS"])
  },
  {
    title: "Dev World",
    description: "Developer conference in Amsterdam",
    date: "2026-05-07",
    endDate: "2026-05-08",
    location: "Amsterdam, Netherlands",
    region: "EMEA",
    type: "conference",
    url: "https://devworldconference.com/",
    tags: JSON.stringify(["All"])
  }
];

console.log(`Adding ${events.length} events to production...`);

const API_KEY = process.env.MEET_US_API_KEY || process.env.API_KEY;
const API_URL = process.env.MEET_US_EVENTS_API_URL || 'https://meet-us.developers.workers.dev/api/v1/events';

if (!API_KEY) {
  console.error('Missing API key. Set MEET_US_API_KEY (or API_KEY) before running this script.');
  process.exit(1);
}

async function addEvent(event) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log(`✅ Added: ${event.title}`);
  } else {
    console.log(`❌ Failed: ${event.title}`, data);
  }
  
  return data;
}

async function addAllEvents() {
  for (const event of events) {
    await addEvent(event);
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  console.log('\n🎉 Done!');
}

addAllEvents();
