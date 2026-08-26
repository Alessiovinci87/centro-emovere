import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export const metadata = { title: "Pagina non trovata" };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-[var(--border)] px-6 py-16 md:py-24 text-center">
          <div className="blob -top-20 -right-20 h-56 w-56 bg-[var(--sage-soft)] opacity-90" />
          <div className="relative">
            <span className="font-serif text-6xl text-[var(--sage)]">404</span>
            <h1 className="h2 mt-3">Pagina non trovata</h1>
            <p className="lead mt-3 max-w-md mx-auto">La pagina che cercavi non esiste o è stata spostata.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/" className="btn btn-primary btn-lg">Torna alla Home <ArrowRight /></Link>
              <Link href="/contatti" className="btn btn-ghost btn-lg">Contattaci</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
