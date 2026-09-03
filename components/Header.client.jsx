"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/content/site.config.json";
import { ChevronDown, Instagram, ServiceIcon } from "@/components/Icons";
import Logo from "@/components/Logo";
import { WhatsAppIcon, whatsappHref } from "@/components/WhatsAppButton";

const NAV = [
  { href: "/servizi", label: "Servizi", menu: true },
  { href: "/team", label: "Équipe" },
  { href: "/#studio", label: "Lo studio" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const services = Array.isArray(site?.services) ? site.services : [];
  const wa = whatsappHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => !href.startsWith("/#") && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-shadow ${scrolled ? "shadow-[0_6px_24px_rgba(31,42,34,0.06)]" : ""}`}
      style={{ background: "rgba(247,244,238,0.9)", backdropFilter: "blur(10px)", borderColor: "var(--border)", paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container h-[var(--nav-h)] flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0 active:opacity-70" aria-label={`${site.brand} — Home`}>
          <Logo className="lg:hidden" />
          <Logo size="lg" className="hidden lg:block" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Principale">
          {NAV.map((item) =>
            item.menu ? (
              <div key={item.href} className="relative group">
                <Link href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                  <div className="card p-2 w-[520px] grid grid-cols-2 gap-1">
                    {services.map((s) => (
                      <Link key={s.slug} href={`/servizi/${s.slug}`} className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sage-soft)] transition-colors">
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
                          <ServiceIcon name={s.icon} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[14.5px] font-medium">{s.title}</span>
                          <span className="block text-[12.5px] leading-snug text-[var(--muted)] line-clamp-2">{s.description}</span>
                        </span>
                      </Link>
                    ))}
                    <Link href="/servizi" className="col-span-2 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-[var(--sage-strong)] hover:bg-[var(--sage-soft)]">
                      Tutti i servizi →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Destra: azione rapida */}
        <div className="flex items-center gap-1.5">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp" className="grid h-11 w-11 place-items-center rounded-full text-[var(--sage-strong)] active:bg-[var(--sage-soft)] lg:hover:bg-[var(--sage-soft)]">
              <WhatsAppIcon className="h-[22px] w-[22px]" />
            </a>
          ) : (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full text-[var(--fg)] active:bg-[var(--sage-soft)] lg:hover:bg-[var(--sage-soft)]">
              <Instagram className="h-[22px] w-[22px]" />
            </a>
          )}
          <Link href="/contatti" className="btn btn-primary btn-sm hidden lg:inline-flex">
            Prenota un colloquio
          </Link>
        </div>
      </div>
    </header>
  );
}
