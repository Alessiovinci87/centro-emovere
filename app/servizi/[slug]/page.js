// app/servizi/[slug]/page.js
import site from "@/content/site.config.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackgroundPattern from "@/components/BackgroundPattern";

export function generateStaticParams() {
  const services = Array.isArray(site?.services) ? site.services : [];
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const services = Array.isArray(site?.services) ? site.services : [];
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return { title: "Servizio" };
  return {
    title: `${svc.title} — ${site.brand}`,
    description: svc.description || site.tagline,
  };
}

export default function ServicePage({ params }) {
  const { slug } = params;

  const services = Array.isArray(site?.services) ? site.services : [];
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const img = (svc.images && svc.images[0]) || "/img/hero.jpg";

  // Operatori collegati (supporta serviceSlug + serviceSlugs) + famiglia psicologia
  const rawTeam = Array.isArray(site?.team) ? site.team : [];
  const familyMap = {
    psicologia: ["psicologia", "psicologia-andrea"],
    "psicologia-andrea": ["psicologia", "psicologia-andrea"],
  };
  const family = familyMap[slug] ?? [slug];

  const team = rawTeam
    .filter((m) => {
      const one = m.serviceSlug && family.includes(m.serviceSlug);
      const many =
        Array.isArray(m.serviceSlugs) &&
        m.serviceSlugs.some((s) => family.includes(s));
      return one || many;
    })
    .filter((m, i, arr) => arr.findIndex((x) => x.slug === m.slug) === i);

  return (
    <div className="container overflow-x-hidden py-8 sm:py-10 md:py-14">
      {/* Intestazione */}
      <header className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">
          {svc.title}
        </h1>
        {svc.description && (
          <p className="p mt-2 max-w-2xl">{svc.description}</p>
        )}
      </header>

      {/* Layout: testo + immagine */}
      <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.6fr_1fr] items-start">
        {/* Testo */}
        <div className="relative z-10">
          <div className="prose max-w-none">
            {Array.isArray(svc.bullets) && svc.bullets.length > 0 ? (
              <ul>
                {svc.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <p>
                In questo spazio potrai inserire obiettivi del percorso,
                metodologia e cosa aspettarsi dal primo incontro.
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
            <a
              href={`mailto:${site.email}`}
              className="btn btn-primary px-4 py-2"
            >
              Prenota un colloquio
            </a>
            <Link href="/blog" className="btn btn-ghost px-4 py-2">
              Approfondimenti sul blog
            </Link>
          </div>

          {/* Operatori collegati */}
          {team.length > 0 && (
            <div className="mt-8 sm:mt-10">
              <h2 className="h2 mb-3">Operatori</h2>

              {/* Mobile: scroll orizzontale con snap; da sm: layout libero */}
              <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:flex-wrap gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory">
                {team.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/team/${m.slug}`}
                    className="shrink-0 snap-start flex items-center gap-3 card px-3 py-2 min-w-[220px] sm:min-w-0"
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-10 w-10 rounded-full object-cover border border-[var(--border)]"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-[var(--muted)]">
                        {m.role}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Immagine (stessa della card servizio) */}
        <aside className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto md:mx-0 md:justify-self-end md:sticky md:top-24">
          {/* Pattern: solo da md+, assoluto SOTTO e CLIPPATO all’area dell’immagine */}
          <div className="hidden md:block absolute inset-0 -z-10 overflow-hidden rounded-[var(--radius)] pointer-events-none">
            <BackgroundPattern variant="band" />
          </div>

          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-[var(--border)] shadow bg-white">
            <img
              src={img}
              alt={svc.title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
