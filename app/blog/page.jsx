import Link from "next/link";
import site from "@/content/site.config.json";
import { ArrowRight, Instagram } from "@/components/Icons";

export const metadata = {
  title: "Blog",
  description: "Approfondimenti e notizie dal Centro Emovere. Sezione in arrivo.",
  robots: { index: false, follow: true },
};

export default function BlogUnderConstruction() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-[var(--border)] shadow-soft-1 px-6 py-14 md:px-14 md:py-20 text-center">
          <div className="blob -top-20 -left-20 h-56 w-56 bg-[var(--blush)] opacity-60" />
          <div className="blob -bottom-24 -right-16 h-64 w-64 bg-[var(--sage-soft)] opacity-90" />
          <div className="relative max-w-xl mx-auto">
            <span className="eyebrow justify-center">Blog</span>
            <h1 className="h1 mt-3">Stiamo preparando i primi articoli</h1>
            <p className="lead mt-4">
              Qui troverai approfondimenti su crescita, linguaggio, movimento e benessere scritti dall&apos;équipe. Nel frattempo seguici su Instagram.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <Instagram className="h-[18px] w-[18px]" /> Seguici su Instagram
              </a>
              <Link href="/" className="btn btn-ghost btn-lg">
                Torna alla Home <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
