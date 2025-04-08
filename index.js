export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const email = request.headers.get("Cf-Access-Authenticated-User-Email");
    const timestamp = new Date().toISOString();
    const country = request.headers.get("Cf-Ipcountry");
    if (path === '/secure') {
      const responseHtml = `
        <html>
          <body>
            <p>${email} authenticated at ${timestamp} from 
              <a href="/secure/${country}">${country}</a>
            </p>
          </body>
        </html>`;
      return new Response(responseHtml, { headers: { "Content-Type": "text/html" }});
    } 
    
    if (path.startsWith('/secure/')) {
      const countryCode = path.split('/').pop().toUpperCase().trim();
      const r2Key = `${countryCode}.svg`.toLowerCase();
      const flag = await env.FLAG_BUCKET.get(r2Key);
      if (!flag) return new Response(`Flag image "${r2Key}" not found.`, { status: 404 });
      return new Response(flag.body, {
        headers: { "Content-Type": "image/svg+xml" }
      });
    }
    return new Response("Not found.", { status: 404 });
  }
};
