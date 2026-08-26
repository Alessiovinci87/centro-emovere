// app/api/contact/route.js — riceve il form contatti e lo inoltra via email.
//
// Provider (in ordine di priorità, tutti configurati solo con variabili d'ambiente su Vercel):
//   1. Resend     → RESEND_API_KEY  (+ opzionali CONTACT_TO, CONTACT_FROM). Destinatario libero.
//   2. Web3Forms  → WEB3FORMS_KEY   (il destinatario è l'email che ha creato la chiave; copia a CONTACT_TO).
// Se nessuna chiave è presente il form mostra il fallback "scrivici via email".
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

function buildMessage(d) {
  const subject = `Nuovo messaggio dal sito — ${d.servizio || "Orientamento"} — ${d.nome}`;
  const text = [
    `Nome: ${d.nome}`,
    `Email: ${d.email}`,
    `Telefono: ${d.telefono || "—"}`,
    `Servizio: ${d.servizio || "Non indicato / orientamento"}`,
    `Consenso privacy: sì`,
    ``,
    `Messaggio:`,
    d.messaggio,
    ``,
    `— Inviato dal form di ${site.brand} (${site.siteUrl})`,
  ].join("\n");
  return { subject, text };
}

async function sendWithResend(d) {
  const to = (process.env.CONTACT_TO || site.email).split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM || `${site.brand} <noreply@centroemovere.it>`;
  const { subject, text } = buildMessage(d);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({ from, to, reply_to: d.email, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text().catch(() => "")}`);
}

async function sendWithWeb3Forms(d) {
  const { subject } = buildMessage(d);
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_KEY,
      subject,
      from_name: `${site.brand} — sito web`,
      replyto: d.email,
      ccemail: process.env.CONTACT_TO || site.email,
      Nome: d.nome,
      Email: d.email,
      Telefono: d.telefono || "—",
      Servizio: d.servizio || "Non indicato / orientamento",
      Messaggio: d.messaggio,
      "Consenso privacy": "Sì",
    }),
  });
  if (!res.ok) throw new Error(`Web3Forms ${res.status}: ${await res.text().catch(() => "")}`);
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
    else if (process.env.WEB3FORMS_KEY) await sendWithWeb3Forms(data);
    else {
      console.error("[contact] nessun provider configurato (RESEND_API_KEY o WEB3FORMS_KEY)");
      return Response.json({ ok: false, error: "Invio non disponibile al momento." }, { status: 503 });
    }
  } catch (err) {
    console.error("[contact]", err?.message || err);
    return Response.json({ ok: false, error: "Invio non riuscito." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
