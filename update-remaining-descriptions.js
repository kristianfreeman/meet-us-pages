const API_KEY = 'REDACTED_LEAKED_API_KEY';
const API_URL = 'https://meet-us.developers.workers.dev/api/v1/events';

const descriptions = {
  "Code Word": "Virtual developer conference exploring code, community, and the future of software development with talks from industry leaders.",
  "AWS Summit: Los Angeles": "Join AWS in Los Angeles for cloud innovation, customer stories, and hands-on learning from AWS experts and partners.",
  "CascadiaJS": "The Pacific Northwest's premier JavaScript conference. Explore modern JS, web development, and connect with Seattle's tech community.",
  "Webflow + Cloudflare Happy Hour": "Networking event with Webflow and Cloudflare teams in NYC. Connect with no-code and edge computing innovators.",
  "AWS Summit: Zurich": "Switzerland's premier AWS event. Learn about cloud services, migration strategies, and innovation from AWS experts in Zurich.",
  "Build Weird: Making AI Work for You (Not Replace You)": "NYC meetup exploring practical AI integration for developers. Build augmented, not automated, workflows with AI assistance.",
  "AWS Summit: Toronto": "Canada's largest AWS conference. Discover cloud solutions, network with Canadian tech leaders, and learn from AWS in Toronto.",
  "AWS Summit: São Paulo": "Brazil's flagship AWS event. Join Latin America's largest cloud conference for innovation, networking, and AWS expertise.",
  "AWS Summit: Mexico City": "Mexico's premier AWS conference. Explore cloud computing, AI, and digital transformation with Latin American tech leaders.",
  "KubeCon India": "India's largest cloud-native conference. Join 5,000+ developers exploring Kubernetes, CNCF projects, and container orchestration.",
  "Laracon US": "The official Laravel conference in the United States. Learn from Laravel creator Taylor Otwell and the PHP community in Denver.",
  "AWS Summit: New York": "New York's premier AWS conference. Join thousands of cloud professionals for innovation, networking, and AWS expertise in NYC."
};

async function main() {
  const response = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });
  
  const data = await response.json();
  const events = data.events || [];
  
  console.log(`Updating remaining ${Object.keys(descriptions).length} events...\n`);
  
  for (const event of events) {
    const newDescription = descriptions[event.title];
    
    if (newDescription) {
      const updateResponse = await fetch(`${API_URL}/${event.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: newDescription })
      });
      
      const result = await updateResponse.json();
      
      if (result.success) {
        console.log(`✅ Updated: ${event.title}`);
      } else {
        console.log(`❌ Failed: ${event.title}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }
  
  console.log('\n🎉 All descriptions updated!');
}

main();
