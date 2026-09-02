// app/servizi/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import site, { services, getService, membersForService, img, absoluteUrl } from "@/lib/site";
import ContattiForm from "@/components/ContattiForm";
import { ArrowRight, Check, ChevronLeftSmall, ServiceIcon } from "@/components/Icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return { title: "Servizio" };

  const title = svc.seoTitle || `${svc.title} ad Alghero`;
  const description = `${svc.description} ${site.brand}, centro multidisciplinare in ${site.addressStreet}, Alghero.`;
  const image = img(svc.images?.[0]).src;
  const url = `/servizi/${svc.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} — ${site.brand}`, description, url, type: "article", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const image = img(svc.images?.[0], { alt: `${svc.title} presso ${site.brand} ad Alghero` });
  const operators = membersForService(slug);
  const others = services.filter((s) => s.slug !== slug);
  // Stanze in cui si svolge il servizio: una per ogni stanza diversa tra gli operatori
  const rooms = [];
  for (const m of operators) {
    if (!m.room?.src) continue;
    const found = rooms.find((r) => r.room.src === m.room.src);
    if (found) found.owners.push(m);
    else rooms.push({ owners: [m], room: m.room });
  }
  const names = (list) => list.map((m) => m.name).join(" e ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: svc.title,
    description: svc.description,
    url: absoluteUrl(`/servizi/${svc.slug}`),
    image: absoluteUrl(image.src),
    areaServed: "Alghero (SS), Sardegna",
    provider: { "@type": "MedicalClinic", name: site.brand, url: absoluteUrl("/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== Intestazione ===== */}
      <section className="relative overflow-hidden">
        <div className="blob -top-32 -right-32 h-[420px] w-[420px] bg-[var(--sage-soft)] opacity-90" />
        <div className="container relative grid gap-6 lg:gap-14 pt-5 pb-8 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <nav aria-label="Percorso" className="crumbs text-[13px] text-[var(--muted)]">
              <Link href="/servizi" className="crumb-back hidden text-[14px]"><ChevronLeftSmall /> Servizi</Link>
              <Link href="/" className="link-quiet">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/servizi" className="link-quiet">Servizi</Link>
              <span className="mx-2">/</span>
              <span aria-current="page">{svc.title}</span>
            </nav>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white border border-[var(--border)] text-[var(--sage-strong)] shadow-soft-1">
                <ServiceIcon name={svc.icon} className="h-6 w-6" />
              </span>
              <span className="eyebrow">Servizio</span>
            </div>
            <h1 className="h1 mt-4">{svc.title}</h1>
            <p className="lead mt-4 max-w-xl">{svc.description}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#richiedi" className="btn btn-primary btn-lg">
                Richiedi informazioni <ArrowRight />
              </a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Informazioni: ${svc.title}`)}`} className="btn btn-ghost btn-lg">
                Scrivi una email
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[300px] md:max-w-[380px] lg:max-w-[440px]">
            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-[var(--blush)] opacity-80" aria-hidden="true" />
            <div className="arch relative overflow-hidden border border-[var(--border)] bg-white shadow-soft-2 aspect-[4/5]">
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contenuto ===== */}
      <section className="section-tight">
        <div className="container grid gap-10 lg:gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            {svc.intro && <p className="p text-[17px] leading-8">{svc.intro}</p>}

            {Array.isArray(svc.areas) && svc.areas.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {svc.areas.map((a) => (
                  <div key={a.title} className="rounded-2xl bg-white border border-[var(--border)] p-5">
                    <h2 className="h3 text-[18px]">{a.title}</h2>
                    <p className="mt-2 text-[15px] leading-6 text-[var(--muted)]">{a.text}</p>
                  </div>
                ))}
              </div>
            )}

            {Array.isArray(svc.bullets) && svc.bullets.length > 0 && (
              <div className="mt-8">
                <h2 className="h3">Di cosa ci occupiamo</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {svc.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl bg-white border border-[var(--border)] p-4">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[15px] leading-6">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {svc.outro && <p className="p mt-6 text-[var(--muted)]">{svc.outro}</p>}

            {/* Come funziona (riuso steps) */}
            <div className="mt-10">
              <h2 className="h3">Come si svolge</h2>
              <ol className="mt-4 space-y-3">
                {(site.steps || []).map((st, i) => (
                  <li key={st.title} className="flex gap-4">
                    <span className="font-serif text-2xl text-[var(--sage)] leading-none w-8 shrink-0">0{i + 1}</span>
                    <div>
                      <div className="font-medium">{st.title}</div>
                      <p className="text-[14.5px] leading-6 text-[var(--muted)]">{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            {operators.length > 0 && (
              <div className="card p-5">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Chi se ne occupa
                </h2>
                <ul className="mt-4 space-y-3">
                  {operators.map((m) => {
                    const pic = img(m.image, { alt: m.name });
                    return (
                      <li key={m.slug}>
                        <Link href={`/team/${m.slug}`} className="group flex items-center gap-3 rounded-xl p-2 -m-2 hover:bg-[var(--sage-soft)]">
                          <img src={pic.src} alt={pic.alt} className="h-12 w-12 rounded-full object-cover object-top border border-[var(--border)]" loading="lazy" />
                          <span className="min-w-0">
                            <span className="block font-medium truncate">{m.name}</span>
                            <span className="block text-[13px] text-[var(--muted)]">{m.role}</span>
                          </span>
                          <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {rooms.map(({ owners, room }, i) => (
              <Link key={room.src} href={`/team/${owners[0].slug}`} className="card overflow-hidden block group hover-lift">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={room.src} alt={room.alt || ""} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
                </div>
                <div className="p-4">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{i === 0 ? "Dove si svolge" : "E anche"}</div>
                  <div className="mt-1 font-medium">{room.caption}</div>
                  <div className="text-[13px] text-[var(--muted)]">con {names(owners)}</div>
                </div>
              </Link>
            ))}

            <div className="card p-5">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Altri servizi</h2>
              <ul className="mt-3 divide-y divide-[var(--border)]">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servizi/${s.slug}`} className="flex items-center gap-3 py-2.5 link-quiet">
                      <ServiceIcon name={s.icon} className="h-[18px] w-[18px] text-[var(--sage-strong)]" />
                      <span className="text-[15px]">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Form ===== */}
      <section id="richiedi" className="section-tight">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <div>
            <span className="eyebrow">Richiedi informazioni</span>
            <h2 className="h2 mt-3">Parliamo di {svc.title.toLowerCase()}</h2>
            <p className="lead mt-3">Lascia un messaggio: ti ricontattiamo per un primo colloquio conoscitivo, senza impegno.</p>
          </div>
          <ContattiForm defaultService={svc.title} />
        </div>
      </section>
    </>
  );
}
