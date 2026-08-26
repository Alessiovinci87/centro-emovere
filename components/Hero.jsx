import Link from "next/link";
import site from "@/content/site.config.json";
import { ArrowRight } from "@/components/Icons";
import WhatsAppButton, { whatsappHref } from "@/components/WhatsAppButton";

export default function Hero() {
  const hero = site.hero || {};
  const team = Array.isArray(site.team) ? site.team : [];
  const services = Array.isArray(site.services) ? site.services : [];

  // Titolo: ultima parola in corsivo (Playfair italic) per un tocco editoriale
  const words = (hero.title || "").split(" ");
  const last = words.pop();

  return (
    <section className="relative overflow-hidden">
      {/* Decorazioni brand */}
      <div className="blob -top-24 -left-24 h-[360px] w-[360px] bg-[var(--blush)] opacity-60" />
      <div className="blob top-1/2 -right-40 h-[520px] w-[520px] bg-[var(--sage-soft)] opacity-80 hidden md:block" />

      <div className="container relative grid items-center gap-10 lg:gap-16 py-12 md:py-16 lg:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Testo */}
        <div className="max-w-xl">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="display mt-4">
            {words.join(" ")} <em className="italic text-[var(--sage-strong)]">{last}</em>
          </h1>
          <p className="lead mt-5">{hero.text}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contatti" className="btn btn-primary btn-lg">
              Prenota un colloquio <ArrowRight />
            </Link>
            {whatsappHref() ? (
              <WhatsAppButton className="btn btn-ghost btn-lg" />
            ) : (
              <Link href="/#servizi" className="btn btn-ghost btn-lg">
                Scopri i servizi
              </Link>
            )}
          </div>

          {/* Fiducia */}
          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[var(--muted)]">Aree</dt>
              <dd className="font-serif text-2xl md:text-3xl mt-1">{services.length}</dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[var(--muted)]">Professionisti</dt>
              <dd className="font-serif text-2xl md:text-3xl mt-1">{team.length}</dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[var(--muted)]">Per</dt>
              <dd className="font-serif text-lg md:text-xl mt-1 leading-tight">Bambini, ragazzi e adulti</dd>
            </div>
          </dl>
        </div>

        {/* Immagine ad arco (motivo del logo) */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
          <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-[var(--sage)] opacity-50" aria-hidden="true" />
          <div className="absolute -top-5 -right-5 h-28 w-28 rounded-full bg-[var(--blush)] opacity-80" aria-hidden="true" />
          <figure className="relative">
            <div className="arch overflow-hidden border border-[var(--border)] bg-white shadow-soft-2 aspect-[4/5]">
              <img
                src={hero.image?.src || "/img/fondatrici.jpg"}
                alt={hero.image?.alt || "Le fondatrici del Centro Emovere"}
                className="h-full w-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            {hero.imageCaption && (
              <figcaption className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-[13px] font-medium shadow-soft-1">
                {hero.imageCaption}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
