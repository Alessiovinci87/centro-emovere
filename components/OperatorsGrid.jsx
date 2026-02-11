// components/OperatorsGrid.jsx
import Link from "next/link";
import site from "@/content/site.config.json";
import Reveal from "@/components/Reveal";

function resolveOperatorSrc(img) {
  if (!img) return "/img/hero.jpg";

  // Se è oggetto { src, alt }
  if (typeof img === "object" && img.src) {
    return img.src;
  }

  // Se è stringa
  if (typeof img === "string") {
    return img.trim().startsWith("/") ? img : `/img/operators/${img.trim()}`;
  }

  return "/img/hero.jpg";
}

function resolveOperatorAlt({ img, name, role }) {
  if (typeof img === "object" && img.alt) return img.alt;
  if (name && role) return `${name}, ${role} al Centro Emovere ad Alghero`;
  if (name) return `${name} – Centro Emovere Alghero`;
  return "Operatore del Centro Emovere ad Alghero";
}

function OperatorCard({ href, title, desc, personName, personRole, img, badge }) {
  const src = resolveOperatorSrc(img);
  const alt = resolveOperatorAlt({ img, name: personName ?? title, role: personRole });
  const name = personName ?? title ?? "Operatore";
  const role = personRole ?? "";

  return (
    <Link
      href={href}
      className="block card overflow-hidden group hover-lift"
      title={`Scopri ${name}, ${role || "operatore"} – Centro Emovere Alghero`}
      aria-label={`Apri la pagina di ${name}, ${role || "operatore"} del Centro Emovere`}
    >
      <article itemScope itemType="https://schema.org/Person">
        {/* Foto verticale 4/5 */}
        <figure className="relative w-full aspect-[4/5] overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.05]"
            sizes="(min-width: 768px) 33vw, 100vw"
            itemProp="image"
          />
          {badge && (
            <span className="absolute top-3 left-3 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium shadow bg-emovere-sand text-[var(--fg)]">
              {badge}
            </span>
          )}
        </figure>

        <div className="p-4">
          <h3 className="font-serif text-[18px] leading-tight" itemProp="name">
            {name}
          </h3>
          {role && (
            <div className="mt-1 text-sm text-[var(--muted)]" itemProp="jobTitle">
              {role}
            </div>
          )}
          {desc && (
            <p
              className="mt-2 text-[15px] leading-6 text-[var(--muted)] line-clamp-3"
              itemProp="description"
            >
              {desc}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

export default function OperatorsGrid({ team }) {
  const members = Array.isArray(team)
    ? team
    : Array.isArray(site?.team)
    ? site.team
    : [];

  return (
    <section id="chi-siamo" className="mt-12">
      <div className="container">
        <h2 className="section-title">Chi Siamo</h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {members.map((m, i) => (
            <Reveal key={m.slug ?? m.name ?? i} delay={i * 0.05}>
              <OperatorCard
                href={`/team/${m.slug ?? ""}`} // pagina dedicata
                title={m.name}
                personName={m.name}
                personRole={m.role}
                img={m.image}
                badge={m.founder ? "Fondatrice" : undefined}
                desc={m.short ?? m.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
