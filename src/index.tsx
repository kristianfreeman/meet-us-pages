import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)


app.get('/', (c) => {
  return c.render(
  <>
  <header>
    <div class="container">
        <h1>Meet the Cloudflare Team</h1>
    </div>
  </header>
<main>
    <div class="container">
        <ul class="links-list">
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd6Z-4QdA-8GGjZcaRuz7Nr5HrFpewKNdjOYpiKNbgCTdgYwg/viewform?usp=header" target="_blank">Enter our Giveaway to win a  Cotopaxi Allpa 35L Travel Pack!</a></li>

        </ul>

        <h2>In Person</h2>
        <ul class="links-list">
            <li><a href="https://sigma.world/americas/">SiGMA Americas</a> | San Paulo, Brazil | April 7-10</li>
            <li><a href="https://www.zero-day.ch/">Zero Day</a> | Geneva, Switzerland | April 9-10</li>
            <li><a href="https://cloud.withgoogle.com/next/25">Google Next</a> | Las Vegas, NV, USA | April 9-11</li>
            <li><a href="https://www.cloudflare.com/connect2025/london/">Cloudflare Connect</a> | London, England | April 10</li>
            <li><a href="https://www.pytexas.org/2025/">PyTexas</a> | Austin, TX, USA | April 11-13</li>
            <li><a href="https://aws.amazon.com/events/summits/amsterdam/">AWS Summit</a> | Amsterdam, Netherlands | April 16</li>
            <li><a href="https://www.reactmiami.com/">React Miami</a> | Miami, FL, USA | April 17-18</li>
            <li><a href="https://www.rsaconference.com/usa">RSA</a> | San Francisco, CA, USA | April 28-May 1</li>
            <li><a href="https://www.startupgrind.tech/">Startup Grind</a> | Redwood City, CA, USA | April 29-30</li>
            <li><a href="https://aws.amazon.com/events/summits/london/">AWS Summit</a> | London, England | April 30</li>
            <li><a href="https://aws.amazon.com/events/summits/poland/">AWS Summit</a> | Katowice, Poland | May 6</li>
        </ul>
        <h2>Online</h2>
        <ul class="links-list">
            <li>Find us at a <a href="https://mlh.io/seasons/2025/events">Major League Hacking hackathon near you!</a></li>
            <li>Check out our <a href="https://www.cloudflare.com/resource-hub/?resourcetype=Webinar ">upcoming webinars</a></li>
            <li>Join us on <a href="https://discord.cloudflare.com">Discord</a></li>
            <li>Follow us on <a href="https://x.com/cloudflaredev">X</a></li>
            <li>Nothing but <a href="https://bsky.app/profile/cloudflare-dev.bsky.social">BlueSky</a> from now on</li>
        </ul>
        <h2>Resources</h2>
        <ul class="links-list">
            <li>Get started with Cloudflare: <a href=" https://dash.cloudflare.com/sign-up/workers-and-pages
">Sign up</a></li>
            <li>Explore building <a href="https://developers.cloudflare.com/agents">AI Agents</a> on Cloudflare</li>
            <li><a href="https://ai.cloudflare.com">Build and deploy AI applications on Cloudflare</a></li>
            <li>Visually build with AI models on the <a href="https://multi-modal.ai.cloudflare.com/">Multi-modal AI Playground</a></li>
            <li>Explore Text Generation models on the <a href="https://playground.ai.cloudflare.com">AI Playground</a></li>
            <li>Read the <a href="https://developers.cloudflare.com/ ">Docs</a></li>
        </ul>
    </div>
</main>
<footer>
    <div class="container">
        <p>Built with 🧡 on Cloudflare <a href="https://pages.cloudflare.com">Pages</a> w/ <a href="https://honojs.dev">Hono</a> 🔥</p>
    </div>
</footer>
</>);
});
export default app
