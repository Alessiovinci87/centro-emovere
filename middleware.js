// middleware.js — "lucchetto" di anteprima: finché SITE_LOCKED=true il sito mostra una pagina
// "In arrivo" a tutti, tranne a chi ha la password (link https://www.centroemovere.it/?preview=PASSWORD
// oppure il campo nella pagina). Chi entra riceve un cookie valido 30 giorni.
// Per riaprire il sito: su Vercel rimuovere SITE_LOCKED (o metterla a "false") e fare Redeploy.
import { NextResponse } from "next/server";
import site from "@/content/site.config.json";

const COOKIE = "emovere_preview";

export const config = {
  // Tutto tranne file statici (immagini, font, manifest, favicon, chunk di Next)
  matcher: ["/((?!_next/|img/|video/|favicon|\.well-known/).*)"],
};

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function comingSoonHtml(message) {
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(site.brand)} — sito in arrivo</title>
<link rel="icon" href="/favicon.ico">
<style>
  :root{--bg:#f7f4ee;--fg:#1f2a22;--muted:#5f6b62;--sage:#9fb17d;--strong:#687a48;--soft:#ecf1e4;--border:#e6e1d8}
  *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--fg);font:16px/1.55 Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;padding:24px}
  .card{width:100%;max-width:460px;background:#fff;border:1px solid var(--border);border-radius:24px;padding:36px 32px;text-align:center;box-shadow:0 10px 30px rgba(31,42,34,.06)}
  .logo{width:120px;height:120px;border-radius:999px;object-fit:cover;margin:0 auto 18px;display:block;border:4px solid var(--soft)}
  h1{font:400 28px/1.2 "Playfair Display",Georgia,serif;margin:0 0 6px}
  .tag{color:var(--strong);font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:12px;margin:0 0 18px}
  p{margin:0 0 12px;color:var(--muted)}
  a{color:var(--strong)}
  form{margin-top:26px;padding-top:22px;border-top:1px solid var(--border)}
  label{display:block;font-size:12px;color:var(--muted);margin-bottom:8px}
  .row{display:flex;gap:8px}
  input{flex:1;min-width:0;padding:11px 14px;border:1px solid var(--border);border-radius:999px;font:inherit;background:var(--bg)}
  input:focus{outline:2px solid var(--strong);outline-offset:1px}
  button{padding:11px 18px;border:0;border-radius:999px;background:var(--strong);color:#fff;font:600 14px/1 inherit;cursor:pointer}
  button:hover{background:#4f5d38}
  .err{color:#b4443c;font-size:13px;margin:10px 0 0}
</style></head>
<body><main class="card">
  <img class="logo" src="/img/logo-centro-emovere-alghero.jpg" alt="${esc(site.brand)}">
  <h1>${esc(site.brand)}</h1>
  <p class="tag">${esc(site.tagline)}</p>
  <p>Il nuovo sito è quasi pronto: ci stiamo lavorando.</p>
  <p>Nel frattempo puoi scriverci a <a href="mailto:${esc(site.email)}">${esc(site.email)}</a><br>${esc(site.address)}</p>
  <form method="get" action="/">
    <label for="preview">Anteprima riservata all'équipe</label>
    <div class="row"><input id="preview" name="preview" type="password" autocomplete="off" placeholder="Password"><button type="submit">Entra</button></div>
    ${message ? `<p class="err">${esc(message)}</p>` : ""}
  </form>
</main></body></html>`;
}

export async function middleware(request) {
  const locked = process.env.SITE_LOCKED === "true";
  if (!locked) return NextResponse.next();

  const password = process.env.SITE_PREVIEW_PASSWORD || "";
  const token = password ? await sha256(`${password}:${COOKIE}`) : "";
  const url = request.nextUrl;
  const noindex = { "X-Robots-Tag": "noindex, nofollow" };

  // robots.txt: durante il lucchetto nessuna scansione
  if (url.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", { headers: { "content-type": "text/plain", ...noindex } });
  }

  // Ingresso con ?preview=PASSWORD → cookie e redirect allo stesso URL pulito
  const attempt = url.searchParams.get("preview");
  if (attempt !== null) {
    if (password && attempt === password) {
      const clean = url.clone();
      clean.searchParams.delete("preview");
      const res = NextResponse.redirect(clean);
      res.cookies.set(COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
      return res;
    }
    return new NextResponse(comingSoonHtml("Password non corretta."), { status: 401, headers: { "content-type": "text/html; charset=utf-8", ...noindex } });
  }

  // Già autorizzato
  if (token && request.cookies.get(COOKIE)?.value === token) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Tutti gli altri: pagina "in arrivo" (503 = temporaneo, Google non la indicizza)
  return new NextResponse(comingSoonHtml(""), {
    status: 503,
    headers: { "content-type": "text/html; charset=utf-8", "Retry-After": "86400", "Cache-Control": "no-store", ...noindex },
  });
}
