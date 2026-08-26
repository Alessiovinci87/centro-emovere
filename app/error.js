"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-[var(--border)] px-6 py-16 md:py-24 text-center">
          <div className="blob -top-20 -right-20 h-56 w-56 bg-[var(--sage-soft)] opacity-90" />
          <div className="relative">
            <span className="eyebrow justify-center">Ops</span>
            <h1 className="h2 mt-3">Qualcosa è andato storto</h1>
            <p className="lead mt-3 max-w-md mx-auto">Si è verificato un errore imprevisto. Riprova, oppure torna alla Home.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <button type="button" onClick={() => reset()} className="btn btn-primary btn-lg">Riprova</button>
              <Link href="/" className="btn btn-ghost btn-lg">Torna alla Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
