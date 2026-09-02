import Link from "next/link";
import { ArrowRight, ServiceIcon } from "@/components/Icons";
import { img } from "@/lib/site";

/**
 * Card servizio "a cupola": foto ad arco, icona circolare colorata a cavallo
 * del bordo inferiore, titolo nel colore del servizio, filetto e descrizione.
 * Il colore arriva da `service.color` (vedi token `--svc-*` in globals.css).
 */
export default function ServiceCard({ service }) {
  const s = service;
  const image = img(s.images?.[0], { alt: `${s.title} presso Centro Emovere ad Alghero` });
  const color = s.color || "sage";

  return (
    <Link
      href={`/servizi/${s.slug}`}
      className="group card svc-card hover-lift flex h-full flex-col items-center px-4 pb-6 pt-4 text-center"
      style={{ "--svc": `var(--svc-${color})`, "--svc-soft": `var(--svc-${color}-soft)` }}
      aria-label={`Scopri il servizio ${s.title}`}
    >
      <div className="relative w-full">
        {/* cornice ad arco leggermente più grande, nel colore del servizio */}
        <div className="svc-halo absolute -inset-x-2 -top-2 bottom-4 arch" aria-hidden="true" />
        <div className="arch relative aspect-[3/4] w-full overflow-hidden bg-[var(--svc-soft)]">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <span className="svc-icon absolute left-1/2 -bottom-7 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full text-white shadow-soft-1">
          <ServiceIcon name={s.icon} className="h-7 w-7" />
        </span>
      </div>

      <h3 className="svc-title mt-11 font-serif text-[19px] font-semibold uppercase tracking-[0.06em] leading-tight">
        {s.title}
      </h3>
      <span className="svc-rule mt-3 h-[2px] w-16 rounded-full" aria-hidden="true" />
      <p className="mt-4 text-[15px] leading-6 text-[var(--muted)] line-clamp-4">{s.description}</p>
      <span className="link-arrow mt-auto pt-4 text-[14.5px]">
        Scopri di più <ArrowRight />
      </span>
    </Link>
  );
}
