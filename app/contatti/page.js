// app/contatti/page.js
import site from "@/content/site.config.json";
import ContattiForm from "@/components/ContattiForm";
import MapEmbed from "@/components/MapEmbed.client";
import WhatsAppButton, { WhatsAppIcon, whatsappHref } from "@/components/WhatsAppButton";
import { Clock, Instagram, Mail, Phone, Pin } from "@/components/Icons";

export const metadata = {
  title: "Contatti",
  description: `Contatta ${site.brand} ad Alghero per informazioni o per prenotare un primo colloquio conoscitivo.`,
  alternates: { canonical: "/contatti" },
};

function Row({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] text-[var(--muted)]">{label}</span>
        {children}
      </span>
    </li>
  );
}

export default function ContattiPage() {
  const wa = whatsappHref();
  const hours = Array.isArray(site.hours) ? site.hours : [];

  return (
    <section className="relative overflow-hidden">
      <div className="blob -top-32 -right-32 h-[380px] w-[380px] bg-[var(--sage-soft)] opacity-90" />
      <div className="container relative py-10 md:py-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Contatti</span>
          <h1 className="h1 mt-3">Scrivici, ti rispondiamo presto</h1>
          <p className="lead mt-4">
            Raccontaci di cosa hai bisogno: ti ricontatteremo per un primo colloquio conoscitivo e per capire insieme quale percorso sia più adatto.
          </p>
          {wa && (
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton className="btn btn-primary btn-lg" label="Scrivici su WhatsApp" />
              <a href="#form" className="btn btn-ghost btn-lg">Compila il form</a>
            </div>
          )}
        </div>

        <div id="form" className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start scroll-mt-24">
          <ContattiForm />

          <aside className="space-y-4">
            <div className="card p-5 md:p-6">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Recapiti</h2>
              <ul className="mt-4 space-y-4 text-[15px]">
                <Row icon={Pin} label="Indirizzo">
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">{site.address}</a>
                </Row>
                <Row icon={Mail} label="Email">
                  <a href={`mailto:${site.email}`} className="link-quiet break-all">{site.email}</a>
                </Row>
                {site.phone && (
                  <Row icon={Phone} label="Telefono">
                    <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="link-quiet">{site.phone}</a>
                  </Row>
                )}
                {wa && (
                  <Row icon={WhatsAppIcon} label="WhatsApp">
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="link-quiet">Scrivici un messaggio</a>
                  </Row>
                )}
                <Row icon={Instagram} label="Instagram">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-quiet">@centroemovere.alghero</a>
                </Row>
                {hours.length > 0 && (
                  <Row icon={Clock} label="Orari">
                    {hours.map((h) => (
                      <span key={h.days} className="block">{h.days}: {h.time}</span>
                    ))}
                  </Row>
                )}
              </ul>
              {site.howToReach && (
                <p className="mt-5 rounded-xl bg-[var(--bg)] p-3.5 text-[13.5px] leading-6 text-[var(--muted)]">{site.howToReach}</p>
              )}
            </div>

            <MapEmbed />
          </aside>
        </div>
      </div>
    </section>
  );
}
