// app/team/page.jsx — elenco équipe
import site from "@/content/site.config.json";
import TeamCard from "@/components/TeamCard";
import CtaBand from "@/components/CtaBand";
import { Check } from "@/components/Icons";

export const metadata = {
  title: "Équipe",
  description: `Le professioniste e i professionisti del ${site.brand} ad Alghero: psicologia, logopedia, neuropsicomotricità, fisioterapia ed educazione professionale.`,
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const team = Array.isArray(site.team) ? site.team : [];
  const about = site.about || {};
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="blob -top-24 -left-24 h-[320px] w-[320px] bg-[var(--blush)] opacity-50" />
        <div className="container relative pt-8 pb-6 md:py-16">
          <div className="max-w-2xl">
            <span className="eyebrow">L&apos;équipe</span>
            <h1 className="h1 mt-3">Le persone del centro</h1>
            <p className="lead mt-3">{(about.text || [])[0]}</p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 md:gap-8">
          {team.map((m) => (
            <TeamCard key={m.slug} member={m} compact />
          ))}
        </div>
      </section>

      {Array.isArray(about.values) && about.values.length > 0 && (
        <section className="container mt-10 md:mt-16">
          <div className="rounded-3xl bg-white border border-[var(--border)] p-5 md:p-8">
            <h2 className="h3">{about.title}</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {about.values.map((v) => (
                <li key={v.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]"><Check className="h-3.5 w-3.5" /></span>
                  <span><span className="block font-medium text-[15px]">{v.title}</span><span className="block text-[14px] leading-6 text-[var(--muted)]">{v.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="mt-8 md:mt-12">
        <CtaBand />
      </div>
    </>
  );
}
