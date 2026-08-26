"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/content/site.config.json";
import { ArrowRight, Instagram } from "@/components/Icons";
import { WhatsAppIcon, whatsappHref } from "@/components/WhatsAppButton";

/** Barra CTA fissa in basso, solo su mobile e non nella pagina contatti. */
export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = pathname === "/contatti";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-mobile-cta", !hidden);
    return () => document.body.classList.remove("has-mobile-cta");
  }, [hidden]);

  if (hidden) return null;

  const wa = whatsappHref();

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/95 backdrop-blur p-1.5 shadow-soft-2">
        <Link href="/contatti" className="btn btn-primary flex-1">
          Prenota un colloquio <ArrowRight />
        </Link>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrivici su WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
        ) : (
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]"
          >
            <Instagram />
          </a>
        )}
      </div>
    </div>
  );
}
