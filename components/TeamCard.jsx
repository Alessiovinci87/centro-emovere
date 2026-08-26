import Link from "next/link";
import { img } from "@/lib/site";

export default function TeamCard({ member, compact = false }) {
  const m = member;
  const image = img(m.image, { alt: `${m.name}, ${m.role} al Centro Emovere di Alghero` });

  return (
    <Link
      href={`/team/${m.slug}`}
      className="group block text-center"
      aria-label={`Apri la pagina di ${m.name}, ${m.role}`}
    >
      <div className="relative mx-auto arch overflow-hidden border border-[var(--border)] bg-white shadow-soft-1 aspect-[4/5] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-2">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {m.founder && (
          <span className="badge-founder absolute left-1/2 top-3 -translate-x-1/2 shadow-soft-1">Fondatrice</span>
        )}
      </div>
      <div className={compact ? "mt-3" : "mt-4"}>
        <h3 className="font-serif text-[18px] leading-tight">{m.name}</h3>
        <div className="mt-1 text-[13.5px] text-[var(--muted)]">{m.role}</div>
      </div>
    </Link>
  );
}
