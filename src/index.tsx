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
            <li>Swing by the <a href="https://aihwedgesummit.com/events/aihwedgesummit?gad_source=1&gclid=CjwKCAjwm_SzBhAsEiwAXE2Cv9lqbPs0CbV2ihYXB-zGaZ7XVbtnHa2NxISzBM2klcilzyyRmJ1O-RoC410QAvD_BwE">AI Hardware & Edge AI Summit | San Jose, CA | September 9-12</a></li>
            <li>Come say hi at <a href="https://www.smalldatasf.com/">Small Data | San Francisco, CA | September 24th</a></li>
            <li>Celebrate Cloudflare's Birthday Week with us at <a href="https://sanfranciscobirthdayweek.splashthat.com/">Builder Day | San Francisco | September 26th</a></li>
            <li>Hang out with us at <a href="">Web Unleashed | Toronto, Canada | October 10th-11th</a></li>
            <li>See you at <a href="https://reactsummit.us/?gad_source=1&gclid=Cj0KCQjwiuC2BhDSARIsALOVfBKGEE91GUq5L53ijdgiV2EWyoAATOFjtVdf7FbO7Cin8ud6v9VeAfkaAi3IEALw_wcB">React Summit</a> | New York | November 19th-22nd</li>
            <li>Meet us at <a href="">AWS Re:invent | Las Vegas, NV | December 2nd-6th</a></li>
            <li>We're atat <a href="">NeurIPS | Vancouver, Canada | December 9th-15th</a></li>
        </ul>
        <h2>Online</h2>
        <ul class="links-list">
            <li>Connect at <a href="https://cfe.dev/speakers/kody-jackson/">Code Word | Virtual event | September 26th</a></li>
            <li>Tune into the <a href="https://gateway.on24.com/wcc/eh/2153307/lp/4698933/">AI Economic Forum | September 19th</a></li>
            <li>Check out our <a href="https://www.cloudflare.com/resource-hub/?resourcetype=Webinar ">upcoming webinars</a></li>
            <li>Join us on <a href="https://discord.cloudflare.com">Discord</a></li>
            <li>Follow us on <a href="https://x.com/cloudflaredev">X</a></li>
        </ul>
        <h2>Resources</h2>
        <ul class="links-list">
            <li>Get started with Cloudflare: <a href=" https://dash.cloudflare.com/sign-up/workers-and-pages
">Sign up</a></li>
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
