// components/OperatorsGrid.jsx
import Link from "next/link";
import site from "@/content/site.config.json";
import Reveal from "@/components/Reveal";

function OperatorCard({ href, title, desc, personName, personRole, img, badge }) {
  const safeImg = img && img.trim() ? img : "/img/hero.jpg";

  return (
    <Link href={href} className="block card overflow-hidden group hover-lift">
      {/* Foto verticale 4/5 */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          src={safeImg}
          alt={`${personName ?? title}`}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.05]"
        />
        {badge && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium shadow bg-emovere-sand text-[var(--fg)]">
            {badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-[18px] leading-tight">{personName ?? title}</h3>
        {personRole && (
          <div className="mt-1 text-sm text-[var(--muted)]">{personRole}</div>
        )}
        {desc && <p className="mt-2 text-[15px] leading-6 text-[var(--muted)] line-clamp-3">{desc}</p>}
      </div>
    </Link>
  );
}

export default function OperatorsGrid({ team }) {
  const members = Array.isArray(team) ? team : (Array.isArray(site?.team) ? site.team : []);

  return (
    <section id="chi-siamo" className="mt-12">
      <div className="container">
        <h2 className="section-title">Chi Siamo</h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {members.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.05}>
              <OperatorCard
                href={`/team/${m.slug}`}              // <<— pagina dedicata
                title={m.name}
                personName={m.name}
                personRole={m.role}
                img={m.image}
                badge={m.founder ? "Fondatrice" : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
