import Link from "next/link";
import site from "@/content/site.config.json";
import { Clock, Instagram, Mail, Pin } from "@/components/Icons";
import Logo from "@/components/Logo";

export default function Footer() {
  const services = Array.isArray(site?.services) ? site.services : [];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 md:mt-28 border-t border-[var(--border)] bg-[var(--sage-soft)]/70">
      <div className="container py-12 md:py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.brand} — Home`}>
            <Logo size="lg" />
            <span>
              <span className="block font-serif text-xl">{site.brand}</span>
              <span className="block text-xs tracking-wide text-[var(--muted)]">{site.tagline}</span>
            </span>
          </Link>
          <p className="p mt-4 max-w-sm text-[var(--muted)]">
            Centro multidisciplinare ad Alghero: psicologia, logopedia, neuropsicomotricità, fisioterapia ed educazione professionale sotto lo stesso tetto.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium link-quiet"
          >
            <Instagram className="h-[18px] w-[18px]" /> @centroemovere.alghero
          </a>
        </div>

        {/* Servizi */}
        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">Servizi</h3>
          <ul className="space-y-2.5 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servizi/${s.slug}`} className="link-quiet">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Il centro */}
        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">Il centro</h3>
          <ul className="space-y-2.5 text-[15px]">
            <li><Link href="/#chi-siamo" className="link-quiet">Chi siamo</Link></li>
            <li><Link href="/#studio" className="link-quiet">Lo studio</Link></li>
            <li><Link href="/blog" className="link-quiet">Blog</Link></li>
            <li><Link href="/contatti" className="link-quiet">Contatti</Link></li>
            <li><Link href="/privacy" className="link-quiet">Privacy</Link></li>
            <li><Link href="/cookies" className="link-quiet">Cookie</Link></li>
          </ul>
        </div>

        {/* Contatti + mappa */}
        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">Dove siamo</h3>
          <ul className="space-y-3 text-[15px]">
            <li className="flex items-start gap-2.5">
              <Pin className="h-5 w-5 mt-0.5 shrink-0 text-[var(--sage-strong)]" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
                {site.address}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-5 w-5 mt-0.5 shrink-0 text-[var(--sage-strong)]" />
              <a href={`mailto:${site.email}`} className="link-quiet break-all">{site.email}</a>
            </li>
            {Array.isArray(site.hours) && site.hours.length > 0 && (
              <li className="flex items-start gap-2.5">
                <Clock className="h-5 w-5 mt-0.5 shrink-0 text-[var(--sage-strong)]" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">{h.days}: {h.time}</span>
                  ))}
                </span>
              </li>
            )}
          </ul>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block overflow-hidden rounded-2xl border border-[var(--border)] shadow-soft-1 hover-lift"
            aria-label="Apri la mappa su Google Maps"
          >
            <img src="/img/maps.jpg" alt="Mappa: Via XX Settembre 246, Alghero" className="w-full aspect-[16/9] object-cover" loading="lazy" />
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-[var(--muted)]">
          <span>
            © {year} {site.brand}. Tutti i diritti riservati.
            {site.vatNumber ? ` · P. IVA ${site.vatNumber}` : ""}
          </span>
          <span>Alghero (SS) · Sardegna</span>
        </div>
      </div>
    </footer>
  );
}
