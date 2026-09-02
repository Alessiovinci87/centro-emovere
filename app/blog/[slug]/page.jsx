// app/blog/[slug]/page.jsx — singolo articolo
import Link from "next/link";
import { notFound } from "next/navigation";
import site, { getMember, getService, img, absoluteUrl } from "@/lib/site";
import { getPosts, getPost, formatDate } from "@/lib/blog";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, Check, ChevronLeftSmall, ServiceIcon } from "@/components/Icons";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Articolo" };
  const image = img(post.cover).src;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: `${post.title} — ${site.brand}`, description: post.excerpt, url: `/blog/${post.slug}`, type: "article", images: [image] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cover = img(post.cover, { alt: post.title });
  const author = getMember(post.author);
  const service = getService(post.service);
  const others = getPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: absoluteUrl(cover.src),
    url: absoluteUrl(`/blog/${post.slug}`),
    author: author ? { "@type": "Person", name: author.name, url: absoluteUrl(`/team/${author.slug}`) } : { "@type": "Organization", name: site.brand },
    publisher: { "@type": "Organization", name: site.brand, url: absoluteUrl("/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="blob -top-32 -right-32 h-[380px] w-[380px] bg-[var(--sage-soft)] opacity-90" />
        <div className="container relative pt-5 pb-6 md:pt-14 md:pb-10">
          <nav aria-label="Percorso" className="crumbs text-[13px] text-[var(--muted)]">
            <Link href="/blog" className="crumb-back hidden text-[14px]"><ChevronLeftSmall /> Blog</Link>
            <Link href="/" className="link-quiet">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="link-quiet">Blog</Link>
          </nav>
          <div className="mt-5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--muted)]">
              {service && (
                <Link href={`/servizi/${service.slug}`} className="chip hover:bg-[var(--sage)] hover:text-white transition-colors">
                  <ServiceIcon name={service.icon} className="h-4 w-4" /> {service.title}
                </Link>
              )}
              <span>{formatDate(post.date)}</span>
              {post.readingTime && <span>· {post.readingTime} di lettura</span>}
            </div>
            <h1 className="h1 mt-4">{post.title}</h1>
            <p className="lead mt-4">{post.excerpt}</p>
            {author && (
              <Link href={`/team/${author.slug}`} className="mt-6 inline-flex items-center gap-3 group">
                <img src={img(author.image).src} alt="" className="h-11 w-11 rounded-full object-cover object-top border border-[var(--border)]" />
                <span className="text-[14.5px] leading-tight">
                  <span className="block font-medium group-hover:text-[var(--sage-strong)]">{author.name}</span>
                  <span className="block text-[var(--muted)]">{author.role}</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="container">
        <figure className="max-w-3xl overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-soft-2 aspect-[16/9] md:aspect-[2/1] md:max-h-[340px]">
          <img src={cover.src} alt={cover.alt} className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
        </figure>
      </section>

      <section className="section-tight">
        <div className="container">
          <article className="max-w-3xl space-y-6">
            {(post.body || []).map((b, i) => <Block key={i} block={b} />)}
          </article>

          {service && (
            <div className="max-w-3xl mt-10 card p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="font-medium">Hai un dubbio su questi segnali?</div>
                <p className="text-[14.5px] leading-6 text-[var(--muted)]">Scopri il servizio di {service.title.toLowerCase()} del centro o scrivici per un primo colloquio conoscitivo.</p>
              </div>
              <Link href={`/servizi/${service.slug}`} className="btn btn-primary shrink-0">{service.title} <ArrowRight /></Link>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-tight border-t border-[var(--border)]">
          <div className="container">
            <div className="section-head"><span className="eyebrow">Continua a leggere</span><h2 className="h2 mt-3">Altri articoli</h2></div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="card p-5 block h-full hover-lift">
                    <div className="text-[13px] text-[var(--muted)]">{formatDate(p.date)}</div>
                    <h3 className="h3 mt-1">{p.title}</h3>
                    <span className="link-arrow mt-3 text-[14.5px]">Leggi <ArrowRight /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="mt-6 md:mt-10"><CtaBand /></div>
    </>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="h2 pt-4">{block.text}</h2>;
    case "h3":
      return <h3 className="h3 pt-2">{block.text}</h3>;
    case "p":
      return <p className="p text-[17px] leading-8">{block.text}</p>;
    case "steps":
      return (
        <ol className="space-y-3">
          {block.items.map((it) => (
            <li key={it.title} className="flex flex-col sm:flex-row gap-1 sm:gap-4 rounded-2xl bg-white border border-[var(--border)] p-4 md:p-5">
              <span className="font-serif text-[var(--sage-strong)] text-[17px] leading-6 sm:w-32 shrink-0">{it.title}</span>
              <p className="text-[15.5px] leading-7">{it.text}</p>
            </li>
          ))}
        </ol>
      );
    case "ul":
      return (
        <ul className="space-y-3">
          {block.items.map((it) => (
            <li key={it.title || it.text} className="flex items-start gap-3 rounded-2xl bg-white border border-[var(--border)] p-4">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]"><Check className="h-3.5 w-3.5" /></span>
              <p className="text-[15.5px] leading-7">{it.title && <strong className="font-medium">{it.title}: </strong>}{it.text}</p>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="rounded-2xl bg-[var(--sage-soft)]/70 border border-[var(--border)] px-5 py-4 md:px-6 md:py-5">
          <p className="text-[16px] leading-7">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}
