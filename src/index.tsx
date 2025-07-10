import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(
    <>
      <header>
        <div class="container">
          <h1>Meet the Cloudflare Team</h1>
          <h2>
            <a href="https://events.www.cloudflare.com/connect2025/home">
              📅 Register for Cloudflare Connect: Oct. 13-16 in Las Vegas, NV
            </a>
          </h2>
          <h3>
            <a href="https://hack-the-safe.pages.dev">
              🔐 Hack the Safe 🔐
            </a>
          </h3>
        </div>
      </header>
      <main>
        <div class="container">
          <h2>In Person</h2>
          <ul class="links-list">
            <li>
              <a href="https://aws.amazon.com/events/summits/new-york/">
                AWS Summit: New York, NY
              </a>{" "}
              | July 16th
            </li>
            <li>
              <a href="https://laracon.us/">Laracon US</a>: Denver, CO | July
              29-30
            </li>
            <li>
              <a href="https://aws.amazon.com/es/events/summits/mexico-city/">
                AWS Summit: Mexico City, Mexico
              </a>{" "}
              | August 6th
            </li>
            <li>
              <a href="https://events.linuxfoundation.org/kubecon-cloudnativecon-india/">
                KubeCon India
              </a>
              : Hyderabad, India | August 6-7
            </li>
            <li>
              <a href="https://aws.amazon.com/pt/events/summits/sao-paulo/">
                AWS Summit: Sao Paulo
              </a>
              : August 13th
            </li>
            <li>
              <a href="https://aws.amazon.com/events/summits/toronto/">
                AWS Summit: Toronto, Canada
              </a>{" "}
              | September 4th
            </li>
            <li>
              <a href="https://aws.amazon.com/events/summits/zurich/">
                AWS Summit: Zurich, Switzerland
              </a>{" "}
              | September 11th
            </li>
            <li>
              <a href="https://aws.amazon.com/events/summits/los-angeles/">
                AWS Summit: Los Angeles, CA
              </a>{" "}
              | September 17th
            </li>
            <li>
              <a href="https://cascadiajs.com/">CascadiaJS</a>: Seattle, WA |
              September 17-20
            </li>
            <li>
              <a href="https://cfe.dev/events/codeword-conf-2025/">Code Word</a>
              : Virtual | September 25th
            </li>
          </ul>
          <h2>Online</h2>
          <ul class="links-list">
            <li>
              Watch us at{" "}
              <a href="https://youtube.com/@cloudflaredevelopers">
                CloudflareDevelopers YoutTube
              </a>
            </li>
            <li>
              Find us at a{" "}
              <a href="https://mlh.io/seasons/2025/events">
                Major League Hacking hackathon near you!
              </a>
            </li>
            <li>
              Check out our{" "}
              <a href="https://www.cloudflare.com/resource-hub/?resourcetype=Webinar ">
                upcoming webinars
              </a>
            </li>
            <li>
              Join us on <a href="https://discord.cloudflare.com">Discord</a>
            </li>
            <li>
              Follow us on <a href="https://x.com/cloudflaredev">X</a>
            </li>
            <li>
              Nothing but{" "}
              <a href="https://bsky.app/profile/cloudflare-dev.bsky.social">
                BlueSky
              </a>{" "}
              from now on
            </li>
          </ul>
          <h2>Resources</h2>
          <ul class="links-list">
            <li>
              Get started with Cloudflare:{" "}
              <a
                href=" https://dash.cloudflare.com/sign-up/workers-and-pages
"
              >
                Sign up
              </a>
            </li>
            <li>
              Explore building{" "}
              <a href="https://developers.cloudflare.com/agents">AI Agents</a>{" "}
              on Cloudflare
            </li>
            <li>
              <a href="https://ai.cloudflare.com">
                Build and deploy AI applications on Cloudflare
              </a>
            </li>
            <li>
              Visually build with AI models on the{" "}
              <a href="https://multi-modal.ai.cloudflare.com/">
                Multi-modal AI Playground
              </a>
            </li>
            <li>
              Explore Text Generation models on the{" "}
              <a href="https://playground.ai.cloudflare.com">AI Playground</a>
            </li>
            <li>
              Read the <a href="https://developers.cloudflare.com/ ">Docs</a>
            </li>
            <li>
              Use Cloudflare with{" "}
              <a href="https://github.com/cloudflare/langchain-cloudflare">
                Langchain and LangGraph
              </a>
            </li>
          </ul>
        </div>
      </main>
      <footer>
        <div class="container">
          <p>
            Built with 🧡 on Cloudflare{" "}
            <a href="https://pages.cloudflare.com">Pages</a> w/{" "}
            <a href="https://honojs.dev">Hono</a> 🔥
          </p>
        </div>
      </footer>
    </>
  );
});
export default app;
