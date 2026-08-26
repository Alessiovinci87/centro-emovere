// app/servizi/page.js — elenco servizi
import Link from "next/link";
import site from "@/content/site.config.json";
import ServiceCard from "@/components/ServiceCard";
import CtaBand from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";

export const metadata = {
  title: "Servizi",
  description: `Psicologia, logopedia, neuropsicomotricità, fisioterapia, educazione professionale e consulenza: i servizi del ${site.brand} ad Alghero.`,
  alternates: { canonical: "/servizi" },
};

export default function ServiziPage() {
  const services = Array.isArray(site.services) ? site.services : [];
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="blob -top-32 -right-32 h-[380px] w-[380px] bg-[var(--sage-soft)] opacity-90" />
        <div className="container relative pt-8 pb-6 md:py-16">
          <div className="max-w-2xl">
            <span className="eyebrow">I nostri servizi</span>
            <h1 className="h1 mt-3">Sei aree, un unico percorso</h1>
            <p className="lead mt-3">Ogni servizio può essere seguito da solo o integrato con gli altri: l&apos;équipe si confronta per costruire il percorso più adatto.</p>
            <Link href="/contatti" className="link-arrow mt-4">
              Non sai quale scegliere? Scrivici <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-4 md:pb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <div className="mt-8 md:mt-12">
        <CtaBand />
      </div>
    </>
  );
}
