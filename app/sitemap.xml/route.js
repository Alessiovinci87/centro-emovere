import { services, team, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const now = new Date().toISOString().slice(0, 10);
  const urls = [
    { path: "/", priority: "1.0" },
    { path: "/servizi", priority: "0.9" },
    { path: "/team", priority: "0.8" },
    { path: "/contatti", priority: "0.8" },
    ...services.map((s) => ({ path: `/servizi/${s.slug}`, priority: "0.8" })),
    ...team.map((m) => ({ path: `/team/${m.slug}`, priority: "0.6" })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${absoluteUrl(u.path)}</loc><lastmod>${now}</lastmod><priority>${u.priority}</priority></url>`)
  .join("\n")}
</urlset>`;

  return new Response(body, { status: 200, headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
