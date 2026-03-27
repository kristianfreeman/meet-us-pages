import { loadEnvFiles } from './scripts/load-env.js';

loadEnvFiles();

const API_KEY = process.env.MEET_US_API_KEY || process.env.API_KEY;
const API_URL = process.env.MEET_US_EVENTS_API_URL || 'https://meet-us.developers.workers.dev/api/v1/events';

if (!API_KEY) {
  console.error('Missing API key. Set MEET_US_API_KEY (or API_KEY) before running this script.');
  process.exit(1);
}

// Better descriptions mapped by event title patterns
const descriptions = {
  // Q1/Q2 2026 Events
  "Station F: Project F/AI Program for Startups": "Accelerate your AI startup journey at Station F's prestigious Project F program. Get hands-on guidance, networking, and resources from industry leaders.",
  "Builderthon IIT Delhi": "Join India's top engineering talent at IIT Delhi for an intensive builderthon. Create innovative solutions and network with fellow developers.",
  "Builderthon IGWTU": "Build the future at IGWTU's builderthon. Collaborate with talented developers and create impactful projects in a competitive environment.",
  "ICE Gaming": "Europe's premier gaming industry event. Connect with game developers, publishers, and innovators shaping the future of interactive entertainment.",
  "Tech Talk: Secure Vibe Coding and Sandboxing for Developers": "Learn how to build secure applications with modern sandboxing techniques. Explore Vibe Code and best practices for safe code execution.",
  "Hackathon: Singapore University": "Southeast Asia's leading university hackathon. Build innovative solutions and compete for prizes with Singapore's brightest developers.",
  "Data Day Texas": "Austin's premier data conference. Dive deep into data engineering, analytics, and AI with industry experts and practitioners.",
  "Workshop: Builders Tokyo": "Hands-on builder workshop in Tokyo. Learn cutting-edge development techniques and connect with Japan's vibrant developer community.",
  "Web Summit Qatar": "The Middle East's largest tech conference. Join 15,000+ attendees for keynotes, networking, and insights from global tech leaders.",
  "Tech Talk: Enhancing Your React App with AI without Rewriting It": "Discover how to seamlessly integrate AI capabilities into your existing React applications. No major refactoring required.",
  "Hackathon: AI Impact Summit": "Build AI solutions that matter at this impact-focused hackathon. Create applications that address real-world challenges.",
  "Workshop: MCP Builder | Toronto": "Master the Model Context Protocol (MCP) with Cloudflare. Build AI agents that interact seamlessly with your applications.",
  "Stanford Treehacks": "Stanford's flagship hackathon. Join 800+ hackers from top universities to build innovative projects and compete for $100k+ in prizes.",
  "AI Impact Summit": "India's largest AI conference. Explore the latest in artificial intelligence, from foundation models to agentic systems, with 10,000+ attendees.",
  "INMA Agentic AI Masterclass": "Virtual masterclass on building autonomous AI agents. Learn from industry experts about the future of intelligent systems.",
  "Tech Talk: Build and Deploy AI-powered agents": "Go from concept to production with AI agents. Learn deployment strategies, best practices, and real-world patterns.",
  "AI Coding Summit": "Join developers worldwide to explore AI-powered development tools. Discover how AI is transforming the coding experience.",
  "Vue.js Amsterdam": "The world's largest Vue.js conference. Learn from core team members and community leaders about the latest in Vue 3, Nuxt, and the ecosystem.",
  "SXSW 2026": "Where creativity, innovation and emerging technology converge. Experience music, film, and interactive media at Austin's iconic festival.",
  "NVIDIA GTC 2026": "NVIDIA's flagship AI and accelerated computing conference. Explore breakthrough research, demos, and networking with 40,000+ AI innovators.",
  "Tech Talk: S3 to R2 Migration": "Reduce storage costs by 10x. Learn how to migrate from AWS S3 to Cloudflare R2 with zero egress fees.",
  "React Paris": "Paris's premier React conference. Deep-dive into React 19, Server Components, and the future of the React ecosystem with leading experts.",
  "Node Congress": "The largest Node.js conference worldwide. Explore backend development, performance optimization, and the future of server-side JavaScript.",
  "Connect - London": "Cloudflare's exclusive developer event in London. Meet the team, see product demos, and network with European developers.",
  "NAB Vegas": "The world's largest media and entertainment technology event. Explore streaming, WebRTC, and broadcast innovations with 65,000+ professionals.",
  "Google Next": "Google Cloud's flagship conference. Discover new products, hear customer stories, and learn from Google engineers in Las Vegas.",
  "React Miami": "React conference in Miami's vibrant tech scene. Enjoy technical talks, workshops, and networking in a tropical setting.",
  "JS World Conference": "Amsterdam's premier JavaScript conference. Explore the latest in JS frameworks, tools, and best practices.",
  "Dev World": "Cross-platform developer conference in Amsterdam. From web to mobile, explore technologies shaping modern software development.",
  
  // Existing events - improve these too
  "World Summit AI Qatar 2025": "Qatar's flagship AI conference bringing together 15,000+ AI leaders, researchers, and practitioners from across the globe.",
  "AWS re:Invent 2025": "AWS's premier cloud computing conference with 60,000+ attendees. Explore new services, best practices, and network with cloud experts.",
  "React Advanced 2025": "London's advanced React conference. Deep-dive into performance, architecture, and cutting-edge patterns with React core team members.",
  "React Advanced: Online Workshop": "Remote deep-dive workshop on advanced React patterns, performance optimization, and architecture from React Advanced instructors.",
  "Pixel Palooza 2025": "Virtual conference celebrating modern web design and development. Learn from designers and developers building the visual web.",
  "Slush 2025": "Europe's leading startup event in Helsinki. 13,000+ founders, investors, and tech leaders gather for networking and innovation.",
  "React Summit US 2025": "North America's largest React conference at New York's Liberty Science Center. 50+ speakers covering the latest in React development.",
  "Agentically Speaking: An Evening with the Cloudflare Agents Team": "Join Cloudflare's AI Agents team in SF for live demos, best practices, and an inside look at building production AI agents.",
  "Shhh. Secret Cloudflare Event": "An exclusive, invitation-only Cloudflare gathering in San Francisco. Limited spots available for this special morning event.",
  "Sync Conf 2025": "San Francisco's boutique conference on real-time collaboration, sync engines, and building multiplayer experiences.",
  "KubeCon + CloudNativeCon North America 2025": "The Cloud Native Computing Foundation's 10th anniversary celebration. 12,000+ attendees exploring Kubernetes and cloud-native technologies.",
  "Grace Hopper Celebration 2025": "The world's largest gathering of women and non-binary technologists. 25 years of celebrating diversity in tech.",
  "LeadDev Berlin 2025": "Two-day conference for engineering leaders. Learn about team performance, technical strategy, and leadership in Berlin.",
  "Developer Round Table Berlin": "Community meetup for developers in Berlin. Network, share experiences, and discuss the latest in web development.",
  "performance.now() 2025": "Amsterdam's premier web performance conference. Single-track talks on optimizing speed, Core Web Vitals, and user experience.",
  "World Wild Web: AI Agents & MCP Server Hack Night": "Hands-on hack night exploring AI agents and Model Context Protocol servers on Cloudflare. Build, experiment, and win prizes.",
  "AfroTech Conference 2025": "The world's largest Black tech conference with 37,000+ attendees and 200+ companies. Celebrating innovation and opportunity.",
  "RowdyHacks XI (MLH)": "UTSA's Major League Hacking hackathon. Join San Antonio's developer community for 24 hours of building and innovation.",
  "Web Unleashed 2025": "Toronto's ultimate front-end development conference. Workshops, talks, and networking with industry leaders.",
  "DubHacks (MLH)": "University of Washington's premier MLH hackathon. 24 hours of hacking with Seattle's brightest student developers.",
  "Hack Knight (MLH)": "Major League Hacking hackathon at Queens College. Build innovative projects and compete for prizes in NYC.",
  "Cloudflare Connect 2025": "Cloudflare's flagship developer conference in Las Vegas. Product announcements, technical deep-dives, and networking with the team.",
};

async function updateDescription(eventId, title, newDescription) {
  try {
    const response = await fetch(`${API_URL}/${eventId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: newDescription })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Updated: ${title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${title}`, data);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error updating ${title}:`, error.message);
    return false;
  }
}

async function main() {
  // Fetch all events
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });
  
  const data = await response.json();
  const events = data.events || [];
  
  console.log(`Found ${events.length} events to update\n`);
  
  let updated = 0;
  let skipped = 0;
  
  for (const event of events) {
    const newDescription = descriptions[event.title];
    
    if (newDescription && newDescription !== event.description) {
      await updateDescription(event.id, event.title, newDescription);
      updated++;
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 150));
    } else if (!newDescription) {
      console.log(`⚠️  No description defined for: ${event.title}`);
      skipped++;
    } else {
      console.log(`⏭️  Already good: ${event.title}`);
      skipped++;
    }
  }
  
  console.log(`\n🎉 Done! Updated ${updated} events, skipped ${skipped}`);
}

main();
