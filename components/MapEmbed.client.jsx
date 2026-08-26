"use client";

import { useState } from "react";
import site from "@/content/site.config.json";
import { Pin } from "@/components/Icons";

/**
 * Mappa Google caricata solo dopo il click dell'utente:
 * finché non clicca, nessuna richiesta parte verso Google e nessun cookie di terze parti viene impostato.
 * Questo permette di stare senza banner cookie.
 */
export default function MapEmbed({ className = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-soft-1 ${className}`}>
      <div className="relative aspect-[16/10] md:aspect-[4/3]">
        {loaded ? (
          <iframe
            title="Mappa Centro Emovere"
            src={site.mapsEmbed}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <>
            <img src="/img/maps.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" decoding="async" />
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-[var(--bg)]/90 via-[var(--bg)]/40 to-transparent p-5 text-center">
              <div>
                <button type="button" onClick={() => setLoaded(true)} className="btn btn-primary">
                  <Pin className="h-[18px] w-[18px]" /> Carica la mappa
                </button>
                <p className="mt-3 text-[12.5px] leading-snug text-[var(--muted)] max-w-xs mx-auto">
                  Caricando la mappa accetti i cookie di Google Maps. In alternativa apri il percorso direttamente in Google Maps.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-3 text-[14px] font-medium link-quiet border-t border-[var(--border)]"
      >
        Apri in Google Maps →
      </a>
    </div>
  );
}
