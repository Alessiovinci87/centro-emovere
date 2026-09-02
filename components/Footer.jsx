import Link from "next/link";
import site from "@/content/site.config.json";
import { ArrowRight, Clock, Instagram, Mail, Pin } from "@/components/Icons";
import Logo from "@/components/Logo";

const centerLinks = [
  { href: "/#chi-siamo", label: "Chi siamo" },
  { href: "/team", label: "L'équipe" },
  { href: "/#studio", label: "Lo studio" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export default function Footer() {
  const services = Array.isArray(site?.services) ? site.services : [];
  const hours = Array.isArray(site.hours) ? site.hours : [];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 md:mt-28 border-t border-[var(--border)] bg-white">
      <div className="container py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr] md:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.brand} — Home`}>
              <Logo size="lg" />
              <span className="min-w-0">
                <span className="block font-serif text-[22px] leading-tight">{site.brand}</span>
                <span className="block text-[12.5px] tracking-wide text-[var(--muted)] mt-0.5">{site.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 text-[15px] leading-7 text-[var(--muted)]">
              Centro multidisciplinare ad Alghero: psicologia, logopedia, neuropsicomotricità, fisioterapia, educazione professionale e parent training sotto lo stesso tetto.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-[14px] font-medium hover:bg-[var(--sage-soft)] hover:border-[var(--ring)] transition-colors"
            >
              <Instagram className="h-[18px] w-[18px] text-[var(--sage-strong)]" /> @centroemovere.alghero
            </a>
          </div>

          {/* Link: su mobile due colonne affiancate */}
          <div className="grid grid-cols-2 gap-6 lg:contents">
            <div>
              <h3 className="footer-title">Servizi</h3>
              <ul className="space-y-2.5 text-[15px]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servizi/${s.slug}`} className="link-quiet">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-title">Il centro</h3>
              <ul className="space-y-2.5 text-[15px]">
                {centerLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-quiet">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contatti */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
            <h3 className="footer-title">Dove siamo</h3>
            <ul className="space-y-3.5 text-[15px]">
              <li className="flex items-start gap-3">
                <span className="footer-ico"><Pin className="h-4 w-4" /></span>
                <span className="leading-6">
                  <span className="block">{site.addressStreet}</span>
                  <span className="block text-[var(--muted)]">{site.addressZip} {site.addressCity} ({site.addressProvince})</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="footer-ico"><Mail className="h-4 w-4" /></span>
                <a href={`mailto:${site.email}`} className="link-quiet leading-6 break-all">{site.email}</a>
              </li>
              {hours.length > 0 && (
                <li className="flex items-start gap-3">
                  <span className="footer-ico"><Clock className="h-4 w-4" /></span>
                  <span className="leading-6">
                    {hours.map((h) => (
                      <span key={h.days} className="block">{h.days}: {h.time}</span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-4 text-[14.5px]">
              Apri in Google Maps <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="container py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-[13px] leading-5 text-[var(--muted)]">
          <div>
            <span className="block">© {year} {site.brand} · Alghero (SS), Sardegna</span>
            {site.legalNote && <span className="block mt-1">{site.legalNote}</span>}
          </div>
          <nav aria-label="Note legali" className="flex gap-5 shrink-0">
            <Link href="/privacy" className="link-quiet">Privacy</Link>
            <Link href="/cookies" className="link-quiet">Cookie</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
