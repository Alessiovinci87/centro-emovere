"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/content/site.config.json";
import { ChevronDown, Close, Instagram, Menu, ServiceIcon } from "@/components/Icons";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/#servizi", label: "Servizi", menu: true },
  { href: "/#chi-siamo", label: "Chi siamo" },
  { href: "/#studio", label: "Lo studio" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const services = Array.isArray(site?.services) ? site.services : [];

  // Chiudi il drawer al cambio pagina
  useEffect(() => setOpen(false), [pathname]);

  // ESC per chiudere + blocco scroll quando aperto
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Ombra header dopo lo scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-shadow ${
          scrolled ? "shadow-[0_6px_24px_rgba(31,42,34,0.06)]" : ""
        }`}
        style={{ background: "rgba(247,244,238,0.88)", backdropFilter: "blur(10px)", borderColor: "var(--border)" }}
      >
        <div className="container h-[var(--nav-h)] flex items-center justify-between gap-4">
          {/* Mobile: hamburger */}
          <button
            type="button"
            aria-label="Apri menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="lg:hidden -ml-2 p-2 rounded-full hover:bg-[var(--sage-soft)]"
          >
            <Menu />
          </button>

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 min-w-0" aria-label={`${site.brand} — Home`}>
            <Logo className="lg:hidden" />
            <Logo size="lg" className="hidden lg:block" />
            <span className="font-serif text-[19px] lg:text-[21px] tracking-tight truncate">{site.brand}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Principale">
            {NAV.map((item) =>
              item.menu ? (
                <div key={item.href} className="relative group">
                  <Link href={item.href} className="nav-link" aria-haspopup="true">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown servizi */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="card p-2 w-[520px] grid grid-cols-2 gap-1">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/servizi/${s.slug}`}
                          className="flex items-start gap-3 rounded-xl p-3 hover:bg-[var(--sage-soft)] transition-colors"
                        >
                          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
                            <ServiceIcon name={s.icon} className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14.5px] font-medium">{s.title}</span>
                            <span className="block text-[12.5px] leading-snug text-[var(--muted)] line-clamp-2">{s.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Destra: IG + CTA */}
          <div className="flex items-center gap-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full hover:bg-[var(--sage-soft)] text-[var(--fg)]"
            >
              <Instagram className="h-[22px] w-[22px]" />
            </a>
            <Link href="/contatti" className="btn btn-primary btn-sm hidden md:inline-flex">
              Prenota un colloquio
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Drawer mobile/tablet ===== */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-[60] lg:hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-[#1f2a22]/40 backdrop-blur-[2px] transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="absolute left-0 top-0 h-full w-[340px] max-w-[88%] bg-[var(--bg)] shadow-2xl flex flex-col transition-transform duration-300 ease-out"
          style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="flex items-center justify-between px-5 h-[var(--nav-h)] border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-serif text-lg">{site.brand}</span>
            </div>
            <button
              type="button"
              aria-label="Chiudi menu"
              onClick={() => setOpen(false)}
              className="-mr-2 p-2 rounded-full hover:bg-[var(--sage-soft)]"
            >
              <Close />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Menu mobile">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Servizi</div>
            <ul className="space-y-0.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servizi/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] hover:bg-[var(--sage-soft)]"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white border border-[var(--border)] text-[var(--sage-strong)]">
                      <ServiceIcon name={s.icon} className="h-[18px] w-[18px]" />
                    </span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Il centro</div>
            <ul className="space-y-0.5">
              {NAV.filter((n) => !n.menu).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded-xl px-3 py-2.5 text-[15px] hover:bg-[var(--sage-soft)]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-[var(--border)] space-y-3">
            <Link href="/contatti" className="btn btn-primary w-full">
              Prenota un colloquio
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full"
            >
              <Instagram className="h-4 w-4" /> Seguici su Instagram
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
