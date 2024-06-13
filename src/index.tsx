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
            <li>We're at <a href="https://www.renderatl.com/">Render ATL</a>. Come see us at booth #207</li>
            <li>Hang out with us at <a href="https://merge.berlin/">Merge Berlin</a></li>
        </ul>
        <h2>Online</h2>
        <ul class="links-list">
            <li>Check out our <a href="https://www.cloudflare.com/resource-hub/?resourcetype=Webinar ">upcoming webinars</a></li>
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
        <p>Built with 🧡 on Cloudflare Pages</p>
    </div>
</footer>
</>);
});
export default app
