// components/Header.client.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import site from "@/content/site.config.json";

export default function Header() {
  const [open, setOpen] = useState(false);
  const services = Array.isArray(site?.services) ? site.services : [];

  // ESC per chiudere + blocco scroll quando aperto
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/80 backdrop-blur">
        {/* ===== MOBILE/TABLET (lg:hidden) ===== */}
        <div className="container h-[var(--nav-h)] lg:hidden flex items-center justify-between">
          {/* SX: hamburger */}
          <button
            aria-label="Apri menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="p-2 rounded-full hover:bg-[var(--bg)]"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {/* CENTRO: brand (una riga) */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/img/logo2.jpg"
              alt={site.brand}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-[var(--border)] object-cover"
            />
            <div className="leading-tight">
              <div className="font-serif text-lg md:text-xl whitespace-nowrap">{site.brand}</div>
              <div className="text-[12px] text-[var(--muted)] hidden md:block">{site.tagline}</div>
            </div>
          </Link>

          {/* DX: Instagram */}
          <Link
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center"
          >
            <img src="/img/ig.png" alt="Instagram" className="h-8 w-8 md:h-7 md:w-7" loading="lazy" />
          </Link>
        </div>

        {/* ===== DESKTOP (≥ lg): brand SX | nav CENTRO | IG DX ===== */}
        <div className="w-full px-4 md:px-6 lg:px-8 h-[var(--nav-h)] hidden lg:block relative">
          {/* brand sinistra */}
          <Link
            href="/"
            className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 flex items-center gap-3"
          >
            <img
              src="/img/logo2.jpg"
              alt={site.brand}
              className="h-10 w-10 rounded-full border border-[var(--border)] object-cover"
            />
            <div className="leading-tight">
              <div className="font-serif text-lg tracking-tight whitespace-nowrap">{site.brand}</div>
              <div className="text-xs text-[var(--muted)]">{site.tagline}</div>
            </div>
          </Link>

          {/* menu centrato */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 text-sm whitespace-nowrap">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/servizi/${s.slug}`} className="link-quiet">
                {s.title}
              </Link>
            ))}
            <Link href="/blog" className="link-quiet">Blog</Link>
          </nav>

          {/* IG destra */}
          <Link
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 inline-flex items-center"
          >
            <img src="/img/ig.png" alt="Instagram" className="h-12 w-12" loading="lazy" />
          </Link>
        </div>
      </header>

      {/* ===== Drawer mobile/tablet — FUORI dall'header (niente clipping) ===== */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Overlay fade */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* Pannello slide-in */}
        <aside
          role="dialog"
          aria-modal="true"
          className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-5 overflow-y-auto transition-transform duration-300"
          style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-serif text-lg">{site.brand}</div>
            <button
              aria-label="Chiudi menu"
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-[var(--bg)]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ELENCO VERTICALE (una sotto l’altra) */}
          <nav className="mt-1 flex flex-col">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}`}
                className="block px-3 py-3 rounded-md text-[15px] hover:bg-[var(--bg)]"
                onClick={() => setOpen(false)}
              >
                {s.title}
              </Link>
            ))}
            <Link
              href="/blog"
              className="block px-3 py-3 rounded-md text-[15px] hover:bg-[var(--bg)]"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
}
