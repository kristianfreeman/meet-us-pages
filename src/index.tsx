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
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSddglYe38x2rnOZHbDZdj7tWWdkhZ7r7F0UZEXYZUuhaCb7PA/viewform" target="_blank">Enter our Giveaway to win a mini game console!</a></li>

        </ul>

        <h2>In Person</h2>
        <ul class="links-list">
            <li><a href="https://www.rsaconference.com/usa">RSA</a> | San Francisco, CA, USA | April 28-May 1</li>
            <li><a href="https://www.startupgrind.tech/">Startup Grind</a> | Redwood City, CA, USA | April 29-30</li>
            <li><a href="https://aws.amazon.com/events/summits/london/">AWS Summit</a> | London, England | April 30</li>
            <li><a href="https://aws.amazon.com/events/summits/poland/">AWS Summit</a> | Katowice, Poland | May 6</li>            
            <li><a href="https://interrupt.langchain.com/">Interrupt: The AI Agent Conf.</a> | San Francisco, CA | May 14</li>
            <li><a href="https://cfe.dev/events/moar-serverless-2025/">MOAR Serverless</a> | Virtual | May 22</li>
            <li><a href="https://acd.awsugblr.in/">AWS Community Day</a> | Bangalore, India | May 23-24</li>
            <li><a href="https://www.snowflake.com/en/summit/">Snowflake Summit</a> | San Francisco, CA | June 2-5</li>
            <li><a href="https://aws.amazon.com/events/summits/stockholm/">AWS Summit</a> | Stockholm, Sweden | June 4</li>
            <li><a href="https://aws.amazon.com/events/summits/washington-dc/">AWS Summit</a> | Washington, D.C. | June 10-11</li>
            <li><a href="https://sbcevents.com/sbc-summit-malta/">Cabino Beats</a> | Malta | June 10-12</li>
            <li><a href="https://aiconusa.techwell.com/?gad_source=1&gbraid=0AAAAAD1VndDMnd3tkxa7TvvwwcdL7GbMA&gclid=Cj0KCQjw2ZfABhDBARIsAHFTxGw9_OiMr19DLtvU5SVr2H310zYGbiIpP2g7zb8qd6Z1aai2DKBzWHQaAuIkEALw_wcB">AI Con USA</a> | Seattle, WA | June 11-12</li> 
            <li><a href="https://leaddev.com/leaddev-london/"></a>Lead Dev London | London, England | June 16-17</li>
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
