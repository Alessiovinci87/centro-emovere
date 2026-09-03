import Link from "next/link";
import site from "@/content/site.config.json";
import { ArrowRight, Check } from "@/components/Icons";
import WhatsAppButton, { whatsappHref } from "@/components/WhatsAppButton";

export default function Hero() {
  const hero = site.hero || {};
  // Tre rassicurazioni concrete al posto dei numeri (modificabili in site.config.json → hero.trust)
  const trust = Array.isArray(hero.trust) && hero.trust.length ? hero.trust : ["Primo colloquio conoscitivo", "Dai 0 anni all'età adulta", "Un'unica sede ad Alghero"];

  // Titolo: ultima parola in corsivo (Playfair italic) per un tocco editoriale
  const words = (hero.title || "").split(" ");
  const last = words.pop();

  return (
    <section className="relative overflow-hidden">
      {/* Decorazioni brand */}
      <div className="blob -top-24 -left-24 h-[360px] w-[360px] bg-[var(--blush)] opacity-60" />
      <div className="blob top-1/2 -right-40 h-[520px] w-[520px] bg-[var(--sage-soft)] opacity-80 hidden md:block" />

      <div className="container relative grid items-center gap-7 lg:gap-16 pt-7 pb-10 md:py-16 lg:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Testo */}
        <div className="max-w-xl">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="display mt-4">
            {words.join(" ")} <em className="italic text-[var(--sage-strong)]">{last}</em>
          </h1>
          <p className="lead mt-4 md:mt-5 line-clamp-4 md:line-clamp-none">{hero.text}</p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
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
          <ul className="mt-7 md:mt-10 flex flex-wrap gap-x-6 gap-y-2.5 max-w-lg">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[14px] md:text-[15px]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Immagine ad arco (motivo del logo) */}
        <div className="relative mx-auto w-full max-w-[300px] md:max-w-[420px] lg:max-w-[460px]">
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
