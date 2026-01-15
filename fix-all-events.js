const API_KEY = 'REDACTED_LEAKED_API_KEY';
const API_URL = 'https://meet-us.developers.workers.dev/api/v1/events';

// Shorter, punchier descriptions + URLs
const updates = {
  "JS World Conference": {
    description: "Amsterdam's premier JavaScript conference with JS ecosystem leaders.",
    url: "https://jsworldconference.com/"
  },
  "Dev World": {
    description: "Cross-platform developer conference in Amsterdam covering web to mobile.",
    url: "https://devworldconference.com/"
  },
  "React Miami": {
    description: "React talks and workshops in Miami's vibrant tech scene.",
    url: "https://www.reactmiami.com/"
  },
  "Google Next": {
    description: "Google Cloud's flagship conference with product launches and demos.",
    url: "https://www.googlecloudevents.com/next-vegas"
  },
  "NAB Vegas": {
    description: "World's largest media & entertainment tech event with 65k+ attendees.",
    url: "https://www.nabshow.com/las-vegas/"
  },
  "Connect - London": {
    description: "Exclusive Cloudflare developer event in London.",
    url: "https://www.cloudflare.com/connect"
  },
  "React Paris": {
    description: "Deep-dive into React 19, Server Components, and the future of React.",
    url: "https://react.paris/"
  },
  "Node Congress": {
    description: "Virtual Node.js conference exploring backend and performance.",
    url: "https://gitnation.com/events/node-congress-2026"
  },
  "Tech Talk: S3 to R2 Migration": {
    description: "Reduce storage costs by 10x. Learn how to migrate to R2.",
    url: "https://www.cloudflare.com/developer-platform/r2/"
  },
  "NVIDIA GTC 2026": {
    description: "NVIDIA's flagship AI conference with 40k+ innovators.",
    url: "https://www.nvidia.com/gtc/"
  },
  "Vue.js Amsterdam": {
    description: "World's largest Vue.js conference with core team and community leaders.",
    url: "https://vuejs.amsterdam/"
  },
  "SXSW 2026": {
    description: "Where creativity, innovation and tech converge in Austin.",
    url: "https://www.sxsw.com/"
  },
  "AI Coding Summit": {
    description: "Virtual summit exploring AI-powered development tools.",
    url: "https://aicodingsummit.com/"
  },
  "Tech Talk: Build and Deploy AI-powered agents": {
    description: "Go from concept to production with AI agents on Cloudflare.",
    url: "https://www.cloudflare.com/developer-platform/ai/"
  },
  "INMA Agentic AI Masterclass": {
    description: "Virtual masterclass on building autonomous AI agents.",
    url: "https://www.inma.org/"
  },
  "AI Impact Summit": {
    description: "India's largest AI conference with 10k+ attendees.",
    url: "https://www.impactexpo.indiaai.gov.in/"
  },
  "Stanford Treehacks": {
    description: "Stanford's flagship hackathon with 800+ hackers and $100k+ in prizes.",
    url: "https://treehacks.com/"
  },
  "Workshop: MCP Builder | Toronto": {
    description: "Master the Model Context Protocol with Cloudflare in Toronto.",
    url: "https://www.cloudflare.com/developer-platform/mcp/"
  },
  "Hackathon: AI Impact Summit": {
    description: "Build AI solutions addressing real-world challenges.",
    url: "https://www.impactexpo.indiaai.gov.in/"
  },
  "Tech Talk: Enhancing Your React App with AI without Rewriting It": {
    description: "Integrate AI into existing React apps with no major refactoring.",
    url: "https://www.cloudflare.com/developer-platform/ai/"
  },
  "Web Summit Qatar": {
    description: "Middle East's largest tech conference with 15k+ attendees.",
    url: "https://websummit.com/qatar"
  },
  "Workshop: Builders Tokyo": {
    description: "Hands-on developer workshop with Tokyo's tech community.",
    url: "https://www.cloudflare.com/events"
  },
  "Data Day Texas": {
    description: "Austin's premier data conference on engineering and analytics.",
    url: "https://datadaytexas.com/"
  },
  "Tech Talk: Secure Vibe Coding and Sandboxing for Developers": {
    description: "Learn secure application development with modern sandboxing.",
    url: "https://build.cloudflare.dev/"
  },
  "Hackathon: Singapore University": {
    description: "24-hour hackathon with Singapore's brightest developers.",
    url: "https://hacknroll.nushackers.org/"
  },
  "ICE Gaming": {
    description: "Europe's premier gaming industry event in Barcelona.",
    url: "https://www.icetotallygaming.com/"
  },
  "Builderthon IGWTU": {
    description: "Build impactful projects at IGWTU's intensive builderthon.",
    url: "https://www.igdtuw.ac.in/"
  },
  "Builderthon IIT Delhi": {
    description: "Compete with India's top engineering talent at IIT Delhi.",
    url: "https://home.iitd.ac.in/"
  },
  "Station F: Project F/AI Program for Startups": {
    description: "Accelerate your AI startup at Station F's Project F program.",
    url: "https://stationf.co/"
  },
  "World Summit AI Qatar 2025": {
    description: "Global AI ecosystem gathering with enterprise, startups, and academia.",
    url: "https://qatar.worldsummit.ai/"
  },
  "AWS re:Invent 2025": {
    description: "AWS flagship conference with 60k+ attendees in Las Vegas.",
    url: "https://reinvent.awsevents.com/"
  },
  "React Advanced 2025": {
    description: "London's advanced React conference with core team members.",
    url: "https://reactadvanced.com/"
  },
  "React Advanced: Online Workshop": {
    description: "Remote workshop on advanced React patterns and performance.",
    url: "https://reactadvanced.com/"
  },
  "Pixel Palooza 2025": {
    description: "Virtual conference on modern web development and design.",
    url: "https://cfe.dev/events/pixelpalooza-2025/"
  },
  "Slush 2025": {
    description: "Europe's leading startup event with 13k+ founders and investors.",
    url: "https://slush.org/"
  },
  "React Summit US 2025": {
    description: "North America's largest React conference in New York.",
    url: "https://reactsummit.us/"
  },
  "Agentically Speaking: An Evening with the Cloudflare Agents Team": {
    description: "Live demos and best practices from Cloudflare's AI Agents team in SF.",
    url: "https://lu.ma/rogm0i7u"
  },
  "Shhh. Secret Cloudflare Event": {
    description: "Exclusive invitation-only Cloudflare gathering in San Francisco.",
    url: "https://luma.com/cf-secret"
  },
  "Sync Conf 2025": {
    description: "Boutique SF conference on real-time collaboration and sync engines.",
    url: "https://syncconf.dev/"
  },
  "KubeCon + CloudNativeCon North America 2025": {
    description: "CNCF's 10th anniversary with 12k+ Kubernetes and cloud-native developers.",
    url: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/"
  },
  "Grace Hopper Celebration 2025": {
    description: "World's largest gathering of women technologists - 25th anniversary.",
    url: "https://ghc.anitab.org/"
  },
  "LeadDev Berlin 2025": {
    description: "Two-day engineering leadership conference in Berlin.",
    url: "https://leaddev.com/leaddev-berlin/"
  },
  "Developer Round Table Berlin": {
    description: "Community meetup for Berlin developers to network and share.",
    url: "https://www.meetup.com/cloudflare-dach/"
  },
  "performance.now() 2025": {
    description: "Amsterdam's premier web performance conference.",
    url: "https://perfnow.nl/"
  },
  "World Wild Web: AI Agents & MCP Server Hack Night": {
    description: "Hands-on hack night building AI agents and MCP servers.",
    url: "https://lu.ma/"
  },
  "AfroTech Conference 2025": {
    description: "World's largest Black tech conference with 37k+ attendees.",
    url: "https://afrotechconference.com/"
  },
  "RowdyHacks XI (MLH)": {
    description: "UTSA's MLH hackathon in San Antonio.",
    url: "https://mlh.io/seasons/2025/events"
  },
  "Web Unleashed 2025": {
    description: "Toronto's ultimate front-end development conference.",
    url: "https://fitc.ca/event/webu25/"
  },
  "DubHacks (MLH)": {
    description: "University of Washington's premier student hackathon.",
    url: "https://mlh.io/seasons/2025/events"
  },
  "Hack Knight (MLH)": {
    description: "MLH hackathon at Queens College in NYC.",
    url: "https://mlh.io/seasons/2025/events"
  },
  "Cloudflare Connect 2025": {
    description: "Cloudflare's flagship developer conference in Las Vegas.",
    url: "https://events.www.cloudflare.com/connect2025/home"
  },
  "Code Word": {
    description: "Virtual developer conference on code and community.",
    url: "https://cfe.dev/events/codeword-conf-2025/"
  },
  "AWS Summit: Los Angeles": {
    description: "AWS cloud innovation and learning in Los Angeles.",
    url: "https://aws.amazon.com/events/summits/los-angeles/"
  },
  "CascadiaJS": {
    description: "Pacific Northwest's premier JavaScript conference in Seattle.",
    url: "https://cascadiajs.com/"
  },
  "Webflow + Cloudflare Happy Hour": {
    description: "NYC networking with Webflow and Cloudflare teams.",
    url: "https://lu.ma/e9uoa581"
  },
  "AWS Summit: Zurich": {
    description: "Switzerland's premier AWS cloud conference.",
    url: "https://aws.amazon.com/events/summits/zurich/"
  },
  "Build Weird: Making AI Work for You (Not Replace You)": {
    description: "NYC meetup on practical AI integration for developers.",
    url: "https://lu.ma/rqnfvvgm"
  },
  "AWS Summit: Toronto": {
    description: "Canada's largest AWS conference in Toronto.",
    url: "https://aws.amazon.com/events/summits/toronto/"
  },
  "AWS Summit: São Paulo": {
    description: "Brazil's flagship AWS conference.",
    url: "https://aws.amazon.com/pt/events/summits/sao-paulo/"
  },
  "AWS Summit: Mexico City": {
    description: "Mexico's premier AWS cloud conference.",
    url: "https://aws.amazon.com/es/events/summits/mexico-city/"
  },
  "KubeCon India": {
    description: "India's largest cloud-native and Kubernetes conference.",
    url: "https://events.linuxfoundation.org/kubecon-cloudnativecon-india/"
  },
  "Laracon US": {
    description: "Official Laravel conference in Denver with creator Taylor Otwell.",
    url: "https://laracon.us/"
  },
  "AWS Summit: New York": {
    description: "New York's premier AWS cloud conference.",
    url: "https://aws.amazon.com/events/summits/new-york/"
  }
};

async function main() {
  const response = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });
  
  const data = await response.json();
  const events = data.events || [];
  
  console.log(`Updating ${Object.keys(updates).length} events with shorter descriptions and URLs...\n`);
  
  let count = 0;
  
  for (const event of events) {
    const update = updates[event.title];
    
    if (update) {
      const updateResponse = await fetch(`${API_URL}/${event.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      });
      
      const result = await updateResponse.json();
      
      if (result.success) {
        console.log(`✅ ${event.title}`);
        count++;
      } else {
        console.log(`❌ Failed: ${event.title}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }
  
  console.log(`\n🎉 Updated ${count} events with better descriptions and URLs!`);
}

main();
