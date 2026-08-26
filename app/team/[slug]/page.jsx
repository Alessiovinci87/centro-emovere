// app/team/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import site, { team, getMember, servicesForMember, img, cleanTel, absoluteUrl } from "@/lib/site";
import TeamCard from "@/components/TeamCard";
import { ArrowRight, Instagram, Mail, Phone, ServiceIcon } from "@/components/Icons";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return { title: "Operatore" };
  const svcs = servicesForMember(m).map((s) => s.title).join(", ");
  return {
    title: `${m.name}, ${m.role}`,
    description: `${m.name} — ${m.role} presso ${site.brand} ad Alghero${svcs ? `: ${svcs}` : ""}.`,
    alternates: { canonical: `/team/${m.slug}` },
    openGraph: { images: [img(m.image).src] },
  };
}

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();

  const pic = img(member.image, { alt: `${member.name}, ${member.role}` });
  const svcs = servicesForMember(member);
  const colleagues = team.filter((m) => m.slug !== member.slug);
  const hasContacts = member.email || member.phone || member.socials?.instagram || member.socials?.facebook || member.socials?.linkedin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    image: absoluteUrl(pic.src),
    url: absoluteUrl(`/team/${member.slug}`),
    worksFor: { "@type": "MedicalClinic", name: site.brand, url: absoluteUrl("/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="blob -top-24 -left-24 h-[320px] w-[320px] bg-[var(--blush)] opacity-50" />
        <div className="container relative py-10 md:py-16">
          <nav aria-label="Percorso" className="text-[13px] text-[var(--muted)]">
            <Link href="/" className="link-quiet">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#chi-siamo" className="link-quiet">Équipe</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">{member.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:gap-16 md:grid-cols-[minmax(260px,340px)_1fr] items-start">
            {/* Foto */}
            <div className="relative mx-auto w-full max-w-[340px]">
              <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-[var(--sage)] opacity-50" aria-hidden="true" />
              <div className="arch relative overflow-hidden border border-[var(--border)] bg-white shadow-soft-2 aspect-[4/5]">
                <img src={pic.src} alt={pic.alt} className="h-full w-full object-cover object-top" loading="eager" fetchPriority="high" />
              </div>
            </div>

            {/* Testo */}
            <div>
              {member.founder && <span className="badge-founder">Fondatrice</span>}
              <h1 className="h1 mt-3">{member.name}</h1>
              <p className="lead mt-2">{member.role}</p>

              {svcs.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {svcs.map((s) => (
                    <Link key={s.slug} href={`/servizi/${s.slug}`} className="chip hover:bg-[var(--sage)] hover:text-white transition-colors">
                      <ServiceIcon name={s.icon} className="h-4 w-4" /> {s.title}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-8">
                {Array.isArray(member.bio) && member.bio.length > 0 ? (
                  <div className="space-y-4">
                    {member.bio.map((p, i) => (
                      <p key={i} className="p text-[var(--muted)]">{p}</p>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-[var(--border)] p-5">
                    <p className="p text-[var(--muted)]">
                      {member.firstName || member.name} fa parte dell&apos;équipe di {site.brand} e si occupa di{" "}
                      {svcs.map((s) => s.title.toLowerCase()).join(" e ") || member.role.toLowerCase()} ad Alghero.
                      Il profilo completo è in aggiornamento: per informazioni o per fissare un primo colloquio scrivici.
                    </p>
                  </div>
                )}
              </div>

              {/* Contatti */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contatti" className="btn btn-primary">
                  Prenota un colloquio <ArrowRight />
                </Link>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="btn btn-ghost">
                    <Mail className="h-[18px] w-[18px]" /> Email
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${cleanTel(member.phone)}`} className="btn btn-ghost">
                    <Phone className="h-[18px] w-[18px]" /> {member.phone}
                  </a>
                )}
                {member.socials?.instagram && (
                  <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Instagram className="h-[18px] w-[18px]" /> Instagram
                  </a>
                )}
              </div>
              {(member.registration || member.vatNumber) && (
                <p className="mt-4 text-[13px] leading-6 text-[var(--muted)]">
                  {member.registration}
                  {member.registration && member.vatNumber ? " · " : ""}
                  {member.vatNumber ? `P. IVA ${member.vatNumber}` : ""}
                </p>
              )}
              {!hasContacts && (
                <p className="mt-3 text-[13px] text-[var(--muted)]">
                  Per contattare {member.firstName || member.name} scrivi a{" "}
                  <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* La stanza dell'operatore */}
      {member.room?.src && (
        <section className="section-tight border-t border-[var(--border)] bg-white">
          <div className="container grid gap-8 lg:gap-14 lg:grid-cols-[0.75fr_1.25fr] items-center">
            <div>
              <span className="eyebrow">Dove lavora</span>
              <h2 className="h2 mt-3">{member.room.caption || `La stanza di ${member.firstName || member.name}`}</h2>
              <p className="lead mt-3">
                È qui che {member.firstName || member.name} accoglie le persone che segue: uno spazio del {site.brand} in {site.addressStreet}, ad Alghero, pensato per lavorare con calma e concentrazione.
              </p>
              <Link href="/#studio" className="link-arrow mt-5">
                Guarda tutto lo studio <ArrowRight />
              </Link>
            </div>
            <figure className="relative">
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-[var(--blush)] opacity-80" aria-hidden="true" />
              <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-[var(--sage-soft)]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg)] shadow-soft-2 aspect-[3/2]">
                <img src={member.room.src} alt={member.room.alt || ""} className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/92 backdrop-blur px-3.5 py-1.5 text-[13px] font-medium shadow-soft-1">
                {member.room.caption}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Colleghi */}
      {colleagues.length > 0 && (
        <section className="section-tight border-t border-[var(--border)]">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">L&apos;équipe</span>
              <h2 className="h2 mt-3">Le altre persone del centro</h2>
            </div>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {colleagues.map((m) => (
                <TeamCard key={m.slug} member={m} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
