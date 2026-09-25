// lib/consent.js — preferenza cookie analitici (Microsoft Clarity), salvata solo nel browser del visitatore.
// Contiene la scelta, la data e la versione: nessun identificativo, nessun dato inviato al server.

export const CLARITY_PROJECT_ID = "ynr9otz0aa";

const KEY = "emovere_consent";
// Se cambia il testo del banner o l'elenco degli strumenti, alzare la versione: il banner ricompare a tutti.
const VERSION = 1;
// La scelta viene richiesta di nuovo dopo 6 mesi.
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

export const OPEN_EVENT = "emovere:consent-open";

/** "granted" | "denied" | null (nessuna scelta valida). */
export function readConsent() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (c?.v !== VERSION || Date.now() - c.ts > MAX_AGE_MS) return null;
    return c.analytics === "granted" ? "granted" : c.analytics === "denied" ? "denied" : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics, ts: Date.now() }));
  } catch {
    // storage bloccato: la scelta vale solo per questa pagina
  }
}

/** Riapre il banner (link "Preferenze cookie" nel footer). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Carica Clarity (snippet ufficiale) e comunica il consenso con la Consent API V2. */
export function loadClarity() {
  if (window.clarity) return;
  window.clarity = function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(s);
  // Solo analisi: Clarity non viene usato per finalità pubblicitarie.
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
}

/** Revoca: Clarity cancella i propri cookie e interrompe il tracciamento; poi puliamo anche lato nostro. */
export function revokeClarity() {
  if (window.clarity) {
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
    window.clarity("consent", false);
  }
  // Rete di sicurezza per i cookie di prima parte (_clck, _clsk) sul dominio e sul dominio padre.
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of ["_clck", "_clsk"]) {
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}
