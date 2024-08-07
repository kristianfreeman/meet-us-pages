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
        <h2>In Person</h2>
        <ul class="links-list">
            <li>We'd love to chat at <a href="https://itrevolution.com/product/enterprise-technology-leadership-summit-las-vegas-2024/?utm_medium=cpc&utm_source=google&utm_campaign=itrev2024&gad_source=1&gclid=CjwKCAjwm_SzBhAsEiwAXE2Cv56GG5J-ALHMYBOLmJKNy2V8IiYTXbESXyeWQd7jYY0flL1jmCxR5BoCzx8QAvD_BwE">Enterprise Technology Leadership Summit | Las Vegas, NV | August 20-22</a></li>
            <li>Swing by the <a href="https://aihwedgesummit.com/events/aihwedgesummit?gad_source=1&gclid=CjwKCAjwm_SzBhAsEiwAXE2Cv9lqbPs0CbV2ihYXB-zGaZ7XVbtnHa2NxISzBM2klcilzyyRmJ1O-RoC410QAvD_BwE">AI Hardware & Edge AI Summit | San Jose, CA | September 9-12</a></li>
            <li>Pop over to <a href="https://www.smalldatasf.com/">Small Data | San Francisco, CA | September 24th</a></li>
        </ul>
        <h2>Online</h2>
        <ul class="links-list">
            <li>Check out our <a href="https://www.cloudflare.com/resource-hub/?resourcetype=Webinar ">upcoming webinars</a></li>
            <li>Get hands on experience at our virtual <a href="https://gateway.on24.com/wcc/eh/2153307/lp/4639818/workersai-virtual-hack-camp">AI Hackcamp</a></li>
            <li>Join us on <a href="https://discord.cloudflare.com">Discord</a></li>
            <li>Follow us on <a href="https://x.com/cloudflaredev">X</a></li>
        </ul>
        <h2>Resources</h2>
        <ul class="links-list">
            <li>Get started with Cloudflare: <a href=" https://dash.cloudflare.com/sign-up/workers-and-pages
">Sign up</a></li>
            <li><a href="https://ai.cloudflare.com">Build and deploy AI applications on Cloudflare</a></li>
            <li>Explore models on the <a href="https://playground.ai.cloudflare.com">AI Playground</a></li>
            <li>Read the <a href="https://developers.cloudflare.com/ ">Docs</a></li>
        </ul>
    </div>
</main>
<footer>
    <div class="container">
        <p>Built with 🧡 on Cloudflare <a href="https://pages.cloudflare.com">Pages</a> w/ <a href="honojs.dev">Hono</a> 🔥</p>
    </div>
</footer>
</>);
});
export default app
