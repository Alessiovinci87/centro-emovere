import Link from "next/link";
import site from "@/content/site.config.json";
import BackgroundPattern from "@/components/BackgroundPattern";

export const metadata = {
  title: `Blog — ${site.brand}`,
  description: "Sezione in costruzione.",
  robots: { index: false, follow: false }, // evita l’indicizzazione finché è vuoto
};

export default function BlogUnderConstruction() {
  return (
    <main className="container py-12 md:py-16">
      <section className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-white shadow">
        {/* Pattern soft dietro, solo da md in su */}
        <div className="hidden md:block absolute inset-0 opacity-10 -z-10 pointer-events-none">
          <BackgroundPattern variant="band" />
        </div>

        <div className="p-6 md:p-10">
          <h1 className="font-serif text-3xl md:text-4xl mb-2">Blog</h1>
          <p className="p mb-6">
            Stiamo lavorando ai contenuti. Torna presto!
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn btn-ghost px-4 py-2">
              Torna alla Home
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="btn btn-primary px-4 py-2"
            >
              Scrivici
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
