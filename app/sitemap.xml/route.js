export async function GET() {
  const urls = ['/', '/contatti', '/privacy', '/cookies'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>https://example.com${u}</loc></url>`).join("")}
</urlset>`;
  return new Response(body, { status: 200, headers: { 'Content-Type': 'application/xml' } });
}
