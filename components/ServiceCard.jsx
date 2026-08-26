import Link from "next/link";
import { ArrowRight, ServiceIcon } from "@/components/Icons";
import { img } from "@/lib/site";

export default function ServiceCard({ service }) {
  const s = service;
  const image = img(s.images?.[0], { alt: `${s.title} presso Centro Emovere ad Alghero` });

  return (
    <Link
      href={`/servizi/${s.slug}`}
      className="group card overflow-hidden hover-lift flex flex-col h-full"
      aria-label={`Scopri il servizio ${s.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[var(--sage-strong)] shadow-soft-1">
          <ServiceIcon name={s.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="h3">{s.title}</h3>
        <p className="mt-2 text-[15px] leading-6 text-[var(--muted)] line-clamp-3">{s.description}</p>
        <span className="link-arrow mt-4 text-[14.5px]">
          Scopri di più <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
