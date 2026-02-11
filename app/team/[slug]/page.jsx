// app/team/[slug]/page.jsx
import site from "@/content/site.config.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return (site.team ?? []).map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const m = (site.team ?? []).find((x) => x.slug === params.slug);
  if (!m) return { title: "Operatore — Centro Emovere" };
  return {
    title: `${m.name} — ${site.brand}`,
    description: `${m.role}${m.serviceSlug ? " · " : ""}${
      (site.services ?? []).find((s) => s.slug === m.serviceSlug)?.title ?? ""
    }`,
  };
}

function cleanTel(t) {
  if (!t) return "";
  return t.replace(/[^+\d]/g, "");
}

export default function TeamMemberPage({ params }) {
  const member = (site.team ?? []).find((x) => x.slug === params.slug);
  if (!member) notFound();

  const service = (site.services ?? []).find((s) => s.slug === member.serviceSlug);

  return (
    <main className="container py-10 md:py-14">
      <article className="grid gap-8 md:grid-cols-[320px,1fr] items-start">
        {/* Foto (stessa della card) */}
        <div className="card overflow-hidden">
          <div className="relative w-full aspect-[4/5]">
            <img src={member.image} alt={member.name} className="img-cover" />
          </div>
        </div>

        {/* Testo */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl mb-1">{member.name}</h1>
          <div className="text-[var(--muted)] mb-4">
            {member.role}
            {service && (
              <>
                {" · "}
                <Link href={`/servizi/${service.slug}`} className="link-quiet">
                  {service.title}
                </Link>
              </>
            )}
          </div>

          {/* Bio (paragrafi) */}
          {Array.isArray(member.bio) && member.bio.length > 0 ? (
            <div className="prose max-w-none">
              {member.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <p className="p">
              Profilo in aggiornamento. Per informazioni puoi contattarci via email.
            </p>
          )}

          {/* Contatti */}
          {(member.email || member.phone || (member.socials && Object.keys(member.socials).length > 0)) && (
            <section className="mt-8 card p-4">
              <h2 className="h2 mb-3">Contatti</h2>

              <ul className="space-y-2">
                {member.email && (
                  <li>
                    <a href={`mailto:${member.email}`} className="link-quiet">
                      📧 {member.email}
                    </a>
                  </li>
                )}
                {member.phone && (
                  <li>
                    <a href={`tel:${cleanTel(member.phone)}`} className="link-quiet">
                      ☎️ {member.phone}
                    </a>
                  </li>
                )}
              </ul>

              {(member.socials?.instagram ||
                member.socials?.facebook ||
                member.socials?.linkedin) && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet"
                      aria-label="Instagram"
                    >
                      Instagram
                    </a>
                  )}
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet"
                      aria-label="Facebook"
                    >
                      Facebook
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet"
                      aria-label="LinkedIn"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
