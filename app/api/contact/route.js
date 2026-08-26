// app/api/contact/route.js — riceve il form contatti e lo inoltra via email con Web3Forms.
// La chiave WEB3FORMS_KEY resta sul server (variabile d'ambiente su Vercel), mai nel browser.
import site from "@/content/site.config.json";

export const runtime = "nodejs";

const MAX = { nome: 120, email: 200, telefono: 40, servizio: 80, messaggio: 4000 };
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

// Rate limit minimale per istanza (10 invii / 10 minuti per IP): frena gli abusi più grossolani.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 10;
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

  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    console.error("[contact] WEB3FORMS_KEY non configurata");
    return Response.json({ ok: false, error: "Invio non disponibile al momento." }, { status: 503 });
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: `Nuovo messaggio dal sito — ${data.servizio || "Orientamento"} — ${data.nome}`,
      from_name: `${site.brand} — sito web`,
      replyto: data.email,
      Nome: data.nome,
      Email: data.email,
      Telefono: data.telefono || "—",
      Servizio: data.servizio || "Non indicato / orientamento",
      Messaggio: data.messaggio,
      "Consenso privacy": "Sì",
    }),
  });

  if (!res.ok) {
    console.error("[contact] Web3Forms", res.status, await res.text().catch(() => ""));
    return Response.json({ ok: false, error: "Invio non riuscito." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
