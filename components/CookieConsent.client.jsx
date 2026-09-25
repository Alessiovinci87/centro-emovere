"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OPEN_EVENT, loadClarity, openConsent, readConsent, revokeClarity, saveConsent } from "@/lib/consent";

/**
 * Banner consenso per i cookie analitici (Microsoft Clarity).
 * Finché non c'è un "Accetta" valido, lo script Clarity non viene inserito nella pagina
 * e nessuna richiesta parte verso clarity.ms.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null); // "granted" | "denied" | null

  useEffect(() => {
    const c = readConsent();
    setCurrent(c);
    if (c === "granted") loadClarity();
    else if (c === null) setOpen(true);

    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  function choose(value) {
    const wasGranted = current === "granted";
    saveConsent(value);
    setCurrent(value);
    setOpen(false);
    if (value === "granted") {
      loadClarity();
    } else if (wasGranted) {
      revokeClarity();
      // Ricarica la pagina così lo script Clarity già caricato non resta in memoria.
      window.location.reload();
    }
  }

  if (!open) return null;

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title" aria-describedby="consent-text">
      <div className="consent-box card">
        <p id="consent-title" className="font-serif text-[19px] leading-tight">Cookie di analisi</p>
        <p id="consent-text" className="mt-2 text-[14px] leading-6 text-[var(--muted)]">
          Con il tuo consenso usiamo Microsoft Clarity per capire, in forma aggregata, come viene usato il sito e
          migliorarlo. I campi dei moduli non vengono registrati. Se rifiuti, il sito funziona allo stesso modo.
          Puoi cambiare idea in qualsiasi momento da &quot;Preferenze cookie&quot; in fondo alla pagina.{" "}
          <Link href="/cookies" className="underline underline-offset-2 text-[var(--fg)]">Cookie policy</Link>
        </p>
        {current && (
          <p className="mt-2 text-[13px] text-[var(--muted)]">
            Scelta attuale: <strong className="text-[var(--fg)]">{current === "granted" ? "accettati" : "rifiutati"}</strong>
          </p>
        )}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => choose("denied")} className="btn btn-ghost">Rifiuta</button>
          <button type="button" onClick={() => choose("granted")} className="btn btn-ghost">Accetta</button>
        </div>
      </div>
    </div>
  );
}

/** Link "Preferenze cookie" (il footer è un server component). */
export function CookiePreferencesButton({ className = "" }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      Preferenze cookie
    </button>
  );
}
