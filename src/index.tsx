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
        <h2>Sweepstakes</h2>
        <ul>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSe_Pb6K3LxRcn7ICiSY5KGi1L-Xsr7Dsa_dGENTK9dmuKlNcA/viewform">Enter for your chance to win</a> at the Cloudflare Booth</li>
        </ul> 
        <h2>In Person</h2>
        <ul class="links-list">
            <li>Hang out with us at <a href="">Web Unleashed | Toronto, Canada | October 10th-11th</a></li>
            <li>See you at <a href="https://reactsummit.us/?gad_source=1&gclid=Cj0KCQjwiuC2BhDSARIsALOVfBKGEE91GUq5L53ijdgiV2EWyoAATOFjtVdf7FbO7Cin8ud6v9VeAfkaAi3IEALw_wcB">React Summit</a> | New York | November 19th-22nd</li>
            <li>Reúnete con nosotras en <a href="https://jsconf.cl/">JS Conf. Chile | Santiago, Chile | December 5th-7th</a></li>
            <li>Meet us at <a href="https://reinvent.awsevents.com/">AWS Re:invent | Las Vegas, NV | December 2nd-6th</a></li>
            <li>We're at <a href="https://neurips.cc/">NeurIPS | Vancouver, Canada | December 9th-15th</a></li>
        </ul>
        <h2>Online</h2>
        <ul class="links-list">
            <li> Find us at a <a href="https://mlh.io/seasons/2025/events">Major League Hacking hackathon near you!</a></li>
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
