// app/page.js — Home
import Link from "next/link";
import site from "@/content/site.config.json";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TeamCard from "@/components/TeamCard";
import StudioGallery from "@/components/StudioGallery.client";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import Faq, { faqJsonLd } from "@/components/Faq";
import { ArrowRight, Check } from "@/components/Icons";

export const metadata = {
  title: `${site.brand} — Terapia, Riabilitazione e Crescita ad Alghero`,
  alternates: { canonical: "/" },
};

export default function Home() {
  const team = Array.isArray(site.team) ? site.team : [];
  const services = Array.isArray(site.services) ? site.services : [];
  const about = site.about || {};
  const steps = Array.isArray(site.steps) ? site.steps : [];
  const studio = Array.isArray(site.studio) ? site.studio : [];
  const faq = Array.isArray(site.faq) ? site.faq : [];

  return (
    <>
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      )}
      <Hero />

      {/* ===== Servizi ===== */}
      <section id="servizi" className="section">
        <div className="container">
          <div className="section-head flex flex-col md:flex-row md:items-end md:justify-between md:max-w-none gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">I nostri servizi</span>
              <h2 className="h2 mt-3">Sei aree, un unico percorso</h2>
              <p className="lead mt-3">
                Ogni servizio può essere seguito da solo o integrato con gli altri: l&apos;équipe si confronta per costruire il percorso più adatto.
              </p>
            </div>
            <Link href="/contatti" className="link-arrow shrink-0">
              Non sai quale scegliere? Scrivici <ArrowRight />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Chi siamo ===== */}
      <section id="chi-siamo" className="section bg-white border-y border-[var(--border)]">
        <div className="container">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_1fr] items-start">
            <div>
              <span className="eyebrow">Chi siamo</span>
              <h2 className="h2 mt-3">{about.title}</h2>
              <div className="mt-5 space-y-4">
                {(about.text || []).map((t, i) => (
                  <p key={i} className="p text-[var(--muted)]">{t}</p>
                ))}
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {(about.values || []).map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06} as="li">
                  <div className="flex gap-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-5 h-full">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
                      <Check className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="font-medium text-[16px]">{v.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-6 text-[var(--muted)]">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="mt-16 md:mt-20">
            <div className="section-head">
              <span className="eyebrow">L&apos;équipe</span>
              <h2 className="h2 mt-3">Le persone del centro</h2>
            </div>
            <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {team.map((m, i) => (
                <Reveal key={m.slug} delay={i * 0.05}>
                  <TeamCard member={m} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Lo studio ===== */}
      <section id="studio" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Lo studio</span>
            <h2 className="h2 mt-3">Uno spazio pensato per stare bene</h2>
            <p className="lead mt-3">
              Ambienti luminosi e accoglienti in {site.addressStreet}, ad Alghero: stanze dedicate a ogni attività, dalla logopedia alla fisioterapia.
            </p>
          </div>
          <StudioGallery images={studio} />
        </div>
      </section>

      {/* ===== Come funziona ===== */}
      <section id="come-funziona" className="section-tight">
        <div className="container">
          <div className="rounded-3xl bg-[var(--sage-soft)]/70 border border-[var(--border)] px-6 py-10 md:px-12 md:py-14">
            <div className="section-head">
              <span className="eyebrow">Come funziona</span>
              <h2 className="h2 mt-3">Iniziare è semplice</h2>
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {steps.map((st, i) => (
                <Reveal key={st.title} delay={i * 0.08} as="li">
                  <div className="relative rounded-2xl bg-white border border-[var(--border)] p-6 h-full">
                    <span className="font-serif text-4xl text-[var(--sage)]">0{i + 1}</span>
                    <h3 className="h3 mt-3">{st.title}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-[var(--muted)]">{st.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      {faq.length > 0 && (
        <section id="faq" className="section-tight">
          <div className="container grid gap-8 lg:grid-cols-[0.7fr_1.3fr] items-start">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
              <span className="eyebrow">Domande frequenti</span>
              <h2 className="h2 mt-3">Le cose che ci chiedono più spesso</h2>
              <p className="lead mt-3">Non trovi la risposta? Scrivici: rispondiamo volentieri anche prima del primo incontro.</p>
              <Link href="/contatti" className="link-arrow mt-5">
                Vai ai contatti <ArrowRight />
              </Link>
            </div>
            <Faq items={faq} />
          </div>
        </section>
      )}

      <div className="mt-6 md:mt-10">
        <CtaBand />
      </div>
    </>
  );
}
