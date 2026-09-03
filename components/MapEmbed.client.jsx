"use client";

import { useState } from "react";
import site from "@/content/site.config.json";
import { Pin } from "@/components/Icons";

/**
 * Mappa Google caricata solo dopo il click dell'utente:
 * finché non clicca, nessuna richiesta parte verso Google e nessun cookie di terze parti viene impostato.
 * Questo permette di stare senza banner cookie.
 */
/** Anteprima stilizzata della mappa nei colori del sito (nessuna richiesta a terzi finché l'utente non clicca). */
function MapSketch() {
  const street = { fill: "none", stroke: "#ffffff", strokeLinecap: "round" };
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
      <rect width="400" height="300" fill="#eef0e6" />
      {/* isolati */}
      <g fill="#e2e6d6">
        <rect x="20" y="30" width="110" height="70" rx="6" />
        <rect x="150" y="20" width="90" height="80" rx="6" />
        <rect x="260" y="40" width="120" height="60" rx="6" />
        <rect x="30" y="130" width="90" height="80" rx="6" />
        <rect x="150" y="130" width="100" height="90" rx="6" />
        <rect x="280" y="130" width="100" height="90" rx="6" />
        <rect x="20" y="240" width="140" height="50" rx="6" />
        <rect x="190" y="250" width="200" height="40" rx="6" />
      </g>
      {/* verde */}
      <circle cx="330" cy="255" r="26" fill="#d8e0c4" />
      <circle cx="70" cy="110" r="14" fill="#d8e0c4" />
      {/* strade */}
      <g {...street} strokeWidth="9">
        <path d="M0 115 H400" />
        <path d="M0 232 H400" />
        <path d="M138 0 V300" />
        <path d="M262 0 V300" />
      </g>
      <g {...street} strokeWidth="4">
        <path d="M0 45 C 80 40, 160 60, 400 30" />
        <path d="M70 0 V300" />
        <path d="M330 0 V300" />
        <path d="M0 175 H400" />
      </g>
      {/* pin */}
      <g transform="translate(296 46)">
        <ellipse cx="0" cy="26" rx="14" ry="5" fill="#1f2a22" opacity=".12" />
        <path d="M0 22 C -14 6 -18 -2 -18 -10 A18 18 0 1 1 18 -10 C 18 -2 14 6 0 22 Z" fill="#687a48" stroke="#ffffff" strokeWidth="3" />
        <circle cx="0" cy="-10" r="6.5" fill="#ffffff" />
      </g>
    </svg>
  );
}

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
            <MapSketch />
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-[var(--bg)]/85 via-transparent to-transparent p-5 text-center">
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
