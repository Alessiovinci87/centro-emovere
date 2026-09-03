// app/api/contact/route.js — riceve il form contatti e lo inoltra via email.
//
// Provider: Resend → RESEND_API_KEY (+ opzionali CONTACT_TO, CONTACT_FROM), configurato solo su Vercel.
// Se la chiave manca il form mostra il fallback "scrivici via email".
import site from "@/content/site.config.json";

export const runtime = "nodejs";

const MAX = { nome: 120, email: 200, telefono: 40, servizio: 80, messaggio: 4000 };
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

// Rate limit minimale per istanza (10 invii / 10 minuti per IP)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 10;
}

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function buildMessage(d) {
  const servizio = d.servizio || "Non indicato / orientamento";
  const subject = `Nuova richiesta dal sito — ${servizio} — ${d.nome}`;
  const when = new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "long", timeStyle: "short" });

  const text = [
    `Nuova richiesta di contatto dal sito ${site.brand}`,
    `Ricevuta il ${when}`,
    ``,
    `Nome: ${d.nome}`,
    `Email: ${d.email}`,
    `Telefono: ${d.telefono || "—"}`,
    `Servizio richiesto: ${servizio}`,
    `Consenso privacy: sì`,
    ``,
    `Messaggio:`,
    d.messaggio,
    ``,
    `Per rispondere basta usare "Rispondi": la risposta va direttamente a ${d.email}.`,
    `— ${site.brand} · ${site.siteUrl}`,
  ].join("\n");

  // Colori del sito (app/globals.css): sfondo crema, verde salvia, testo scuro.
  const C = { bg: "#f7f4ee", surface: "#ffffff", fg: "#1f2a22", muted: "#5f6b62", sage: "#9fb17d", strong: "#687a48", soft: "#ecf1e4", border: "#e6e1d8" };
  const tel = (d.telefono || "").replace(/[^\d+]/g, "");
  const row = (label, value, opts = {}) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${C.border};font:600 12px/1.4 Inter,Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:${C.muted};vertical-align:top;width:150px">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${C.border};font:15px/1.5 Inter,Arial,sans-serif;color:${C.fg};vertical-align:top">${opts.raw ? value : esc(value)}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.bg}">
  <div style="display:none;max-height:0;overflow:hidden;color:transparent">${esc(d.nome)} ha chiesto informazioni su: ${esc(servizio)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.surface};border:1px solid ${C.border};border-radius:20px;overflow:hidden">
        <tr><td style="background:${C.strong};padding:24px 28px">
          <p style="margin:0;font:600 12px/1.4 Inter,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${C.soft}">${esc(site.brand)} · sito web</p>
          <h1 style="margin:8px 0 0;font:400 26px/1.25 'Playfair Display',Georgia,serif;color:#ffffff">Nuova richiesta di contatto</h1>
          <p style="margin:8px 0 0;font:14px/1.5 Inter,Arial,sans-serif;color:${C.soft}">Ricevuta il ${esc(when)}</p>
        </td></tr>
        <tr><td style="padding:24px 28px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Nome", d.nome)}
            ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${C.strong};text-decoration:underline">${esc(d.email)}</a>`, { raw: true })}
            ${row("Telefono", d.telefono ? `<a href="tel:${esc(tel)}" style="color:${C.strong};text-decoration:underline">${esc(d.telefono)}</a>` : "—", { raw: true })}
            ${row("Servizio", `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${C.soft};color:${C.strong};font:600 13px/1.4 Inter,Arial,sans-serif">${esc(servizio)}</span>`, { raw: true })}
            ${row("Privacy", "Consenso al trattamento dei dati: sì")}
          </table>
        </td></tr>
        <tr><td style="padding:12px 28px 4px">
          <p style="margin:0 0 8px;font:600 12px/1.4 Inter,Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:${C.muted}">Messaggio</p>
          <div style="padding:16px 18px;border-radius:14px;background:${C.bg};border-left:4px solid ${C.sage};font:15px/1.6 Inter,Arial,sans-serif;color:${C.fg};white-space:pre-wrap">${esc(d.messaggio)}</div>
        </td></tr>
        <tr><td style="padding:24px 28px 28px">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="border-radius:999px;background:${C.strong}">
              <a href="mailto:${esc(d.email)}?subject=${encodeURIComponent(`Re: la tua richiesta a ${site.brand}`)}" style="display:inline-block;padding:12px 22px;font:600 14px/1 Inter,Arial,sans-serif;color:#ffffff;text-decoration:none">Rispondi a ${esc(d.nome.split(" ")[0])}</a>
            </td>
            ${tel ? `<td style="padding-left:10px"><a href="tel:${esc(tel)}" style="display:inline-block;padding:11px 20px;border:1px solid ${C.border};border-radius:999px;font:600 14px/1 Inter,Arial,sans-serif;color:${C.fg};text-decoration:none">Chiama</a></td>` : ""}
          </tr></table>
          <p style="margin:16px 0 0;font:13px/1.5 Inter,Arial,sans-serif;color:${C.muted}">Anche il pulsante “Rispondi” del tuo programma di posta scrive direttamente a ${esc(d.nome)}.</p>
        </td></tr>
      </table>
      <p style="margin:18px 0 0;font:12px/1.5 Inter,Arial,sans-serif;color:${C.muted}">Messaggio automatico inviato dal modulo contatti di <a href="${esc(site.siteUrl)}" style="color:${C.strong}">${esc(site.siteUrl.replace(/^https?:\/\//, ""))}</a></p>
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}

async function sendWithResend(d) {
  const to = (process.env.CONTACT_TO || site.email).split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM || `${site.brand} <noreply@centroemovere.it>`;
  const { subject, text, html } = buildMessage(d);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({ from, to, reply_to: d.email, subject, text, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text().catch(() => "")}`);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  // Honeypot: i bot compilano anche il campo nascosto
  if (body["bot-field"]) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ ok: false, error: "Troppi invii, riprova tra qualche minuto." }, { status: 429 });

  const data = {
    nome: clean(body.nome, MAX.nome),
    email: clean(body.email, MAX.email),
    telefono: clean(body.telefono, MAX.telefono),
    servizio: clean(body.servizio, MAX.servizio),
    messaggio: clean(body.messaggio, MAX.messaggio),
    privacy: body.privacy === "on" || body.privacy === true || body.privacy === "true",
  };

  if (!data.nome || !isEmail(data.email) || !data.messaggio || !data.privacy) {
    return Response.json({ ok: false, error: "Compila nome, email, messaggio e consenso privacy." }, { status: 422 });
  }

  try {
    if (process.env.RESEND_API_KEY) await sendWithResend(data);
    else return Response.json({ ok: false, error: "Invio non disponibile al momento." }, { status: 503 });
  } catch (err) {
    console.error("[contact]", err?.message || err);
    return Response.json({ ok: false, error: "Invio non riuscito." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
