"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/content/site.config.json";
import { Chat, Close, Grid, Home, Instagram, Mail, Phone, Pin, Users } from "@/components/Icons";
import { WhatsAppIcon, whatsappHref } from "@/components/WhatsAppButton";

const TABS = [
  { href: "/", label: "Home", icon: Home, match: (p) => p === "/" },
  { href: "/servizi", label: "Servizi", icon: Grid, match: (p) => p.startsWith("/servizi") },
  null, // slot centrale: "Scrivici"
  { href: "/team", label: "Équipe", icon: Users, match: (p) => p.startsWith("/team") },
  { href: "/contatti", label: "Contatti", icon: Pin, match: (p) => p.startsWith("/contatti") },
];

/** Barra di navigazione in basso, stile app (solo sotto lg). */
export default function TabBar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = whatsappHref();
  const tel = site.phone ? `tel:${String(site.phone).replace(/[^+\d]/g, "")}` : null;

  return (
    <>
      <nav className="tabbar lg:hidden" aria-label="Navigazione principale">
        <ul className="grid grid-cols-5 items-end">
          {TABS.map((t, i) =>
            t ? (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={`tab ${t.match(pathname) ? "is-active" : ""}`}
                  aria-current={t.match(pathname) ? "page" : undefined}
                >
                  <t.icon className="h-6 w-6" />
                  <span>{t.label}</span>
                </Link>
              </li>
            ) : (
              <li key="cta" className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  className="tab-cta"
                >
                  <span className="tab-cta-circle">
                    <Chat className="h-6 w-6" />
                  </span>
                  <span>Scrivici</span>
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Foglio contatti */}
      <div className={`sheet-root lg:hidden ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="sheet-overlay" onClick={() => setOpen(false)} />
        <div role="dialog" aria-modal="true" aria-label="Scrivici" className="sheet">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[var(--border)]" />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif text-xl">Come preferisci contattarci?</div>
              <div className="text-[13px] text-[var(--muted)]">Rispondiamo di solito entro 1–2 giorni lavorativi.</div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi" className="-mr-2 p-2 rounded-full active:bg-[var(--sage-soft)]">
              <Close />
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="sheet-item">
                  <span className="sheet-icon bg-[#25D366] text-white"><WhatsAppIcon className="h-5 w-5" /></span>
                  <span><span className="block font-medium">WhatsApp</span><span className="block text-[13px] text-[var(--muted)]">Il modo più rapido</span></span>
                </a>
              </li>
            )}
            {tel && (
              <li>
                <a href={tel} className="sheet-item">
                  <span className="sheet-icon"><Phone className="h-5 w-5" /></span>
                  <span><span className="block font-medium">Chiama</span><span className="block text-[13px] text-[var(--muted)]">{site.phone}</span></span>
                </a>
              </li>
            )}
            <li>
              <Link href="/contatti#form" className="sheet-item">
                <span className="sheet-icon"><Chat className="h-5 w-5" /></span>
                <span><span className="block font-medium">Compila il form</span><span className="block text-[13px] text-[var(--muted)]">Ti ricontattiamo noi</span></span>
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="sheet-item">
                <span className="sheet-icon"><Mail className="h-5 w-5" /></span>
                <span><span className="block font-medium">Email</span><span className="block text-[13px] text-[var(--muted)] break-all">{site.email}</span></span>
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="sheet-item">
                <span className="sheet-icon"><Instagram className="h-5 w-5" /></span>
                <span><span className="block font-medium">Instagram</span><span className="block text-[13px] text-[var(--muted)]">@centroemovere.alghero</span></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
