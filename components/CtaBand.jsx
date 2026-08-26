import Link from "next/link";
import site from "@/content/site.config.json";
import { ArrowRight, Mail } from "@/components/Icons";
import WhatsAppButton, { whatsappHref } from "@/components/WhatsAppButton";

export default function CtaBand({
  title = "Non sai da dove iniziare? Parliamone.",
  text = "Un primo colloquio conoscitivo serve a capire insieme di cosa hai bisogno e quale figura può aiutarti. Senza impegno.",
}) {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--sage)] text-[var(--fg)] px-6 py-12 md:px-14 md:py-16">
        <div className="blob -top-24 -right-16 h-72 w-72 bg-white opacity-25" />
        <div className="blob -bottom-28 -left-10 h-64 w-64 bg-[var(--sage-deep)] opacity-15" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h2 className="h2">{title}</h2>
            <p className="mt-3 text-[16px] leading-7 text-[var(--fg)]/80 max-w-xl">{text}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link href="/contatti" className="btn btn-lg btn-dark w-full sm:w-auto">
              Prenota un colloquio <ArrowRight />
            </Link>
            {whatsappHref() ? (
              <WhatsAppButton className="btn btn-lg border border-[var(--fg)]/25 text-[var(--fg)] hover:bg-white/40 w-full sm:w-auto" />
            ) : (
              <a href={`mailto:${site.email}`} className="btn btn-lg border border-[var(--fg)]/25 text-[var(--fg)] hover:bg-white/40 w-full sm:w-auto">
                <Mail className="h-[18px] w-[18px]" /> Scrivici una email
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
