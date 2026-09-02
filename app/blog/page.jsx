// app/blog/page.jsx — elenco articoli
import Link from "next/link";
import site from "@/content/site.config.json";
import { getPosts, formatDate } from "@/lib/blog";
import { getMember, getService, img } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, Instagram } from "@/components/Icons";

export const metadata = {
  title: "Blog",
  description: `Approfondimenti su crescita, linguaggio, movimento e benessere scritti dall'équipe del ${site.brand} di Alghero.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();
  const [first, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="blob -top-32 -right-32 h-[380px] w-[380px] bg-[var(--blush)] opacity-60" />
        <div className="container relative pt-8 pb-6 md:py-16">
          <div className="max-w-2xl">
            <span className="eyebrow">Blog</span>
            <h1 className="h1 mt-3">Approfondimenti dall&apos;équipe</h1>
            <p className="lead mt-3">Crescita, linguaggio, movimento e benessere: articoli brevi scritti dalle persone del centro.</p>
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="container pb-10">
          <div className="card p-8 text-center">
            <p className="lead">Stiamo preparando i primi articoli. Nel frattempo seguici su Instagram.</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
              <Instagram className="h-[18px] w-[18px]" /> Seguici su Instagram
            </a>
          </div>
        </section>
      ) : (
        <section className="container pb-4 md:pb-10 space-y-6 md:space-y-8">
          <PostCard post={first} featured />
          {rest.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
              {rest.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          )}
        </section>
      )}

      <div className="mt-8 md:mt-12">
        <CtaBand />
      </div>
    </>
  );
}

function PostCard({ post, featured = false }) {
  const cover = img(post.cover, { alt: post.title });
  const author = getMember(post.author);
  const service = getService(post.service);
  const meta = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--muted)]">
      {service && <span className="chip">{service.title}</span>}
      <span>{formatDate(post.date)}</span>
      {post.readingTime && <span>· {post.readingTime} di lettura</span>}
    </div>
  );

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group card overflow-hidden hover-lift grid md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden">
          <img src={cover.src} alt={cover.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="eager" />
        </div>
        <div className="p-6 md:p-10 flex flex-col">
          {meta}
          <h2 className="h2 mt-3">{post.title}</h2>
          <p className="mt-3 text-[16px] leading-7 text-[var(--muted)]">{post.excerpt}</p>
          {author && (
            <div className="mt-5 flex items-center gap-3">
              <img src={img(author.image).src} alt="" className="h-9 w-9 rounded-full object-cover object-top border border-[var(--border)]" loading="lazy" />
              <span className="text-[14px]"><span className="font-medium">{author.name}</span> <span className="text-[var(--muted)]">· {author.role}</span></span>
            </div>
          )}
          <span className="link-arrow mt-auto pt-6">Leggi l&apos;articolo <ArrowRight /></span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group card overflow-hidden hover-lift flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={cover.src} alt={cover.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" decoding="async" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {meta}
        <h3 className="h3 mt-2">{post.title}</h3>
        <p className="mt-2 text-[15px] leading-6 text-[var(--muted)] line-clamp-3">{post.excerpt}</p>
        <span className="link-arrow mt-4 text-[14.5px]">Leggi <ArrowRight /></span>
      </div>
    </Link>
  );
}
