import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *\nAllow: /\nDisallow: /__forms.html\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
  return new Response(body, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
