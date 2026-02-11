export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml`;
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}
