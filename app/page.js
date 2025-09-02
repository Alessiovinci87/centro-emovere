// app/page.js
import site from "@/content/site.config.json";
import HeroImage from "@/components/HeroImage.client";
import CardLink from "@/components/CardLink";
import OperatorsGrid from "@/components/OperatorsGrid";
import Reveal from "@/components/Reveal";
import BackgroundPattern from "@/components/BackgroundPattern";
import StudioGallery from "@/components/StudioGallery.client";

// ✅ Metadata deve stare fuori dalla funzione
export const metadata = {
  title: "Centro Emovere",
  description: "Terapia · Riabilitazione · Crescita",
};

export default function Home() {
  const team = Array.isArray(site?.team) ? site.team : [];
  const services = Array.isArray(site?.services) ? site.services : [];

  const studioImages = [
    { src: "/img/studio/1.jpg", alt: "Evento in studio" },
    { src: "/img/studio/2.jpg", alt: "Ingresso" },
    { src: "/img/studio/3.jpg", alt: "Dettagli preparazione" },
    { src: "/img/studio/4.jpg", alt: "Lecture" },
    { src: "/img/studio/5.jpg", alt: "Allestimento" },
  ];

  return (
    <>
      <HeroImage
        desktopSrc="/video/herovid.mp4"
        mobileImg="/video/herosmartimg.jpg"
        tabletImg="/video/herotabimg.jpg"
        showArrow
      />

      {/* CONTENUTO */}
      <main id="main" tabIndex="-1">
        {/* Chi Siamo (usa team) */}
        <OperatorsGrid team={team} />

        {/* Fascia highlight con pattern brand (DISATTIVATA) */}
        {/*
        <section
          className="mt-12 relative overflow-hidden rounded-[var(--radius)] shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
          style={{ background: "#f7f2e7" }}
        >
          <BackgroundPattern variant="band" />
          <div className="container py-10 md:py-14 relative z-10">
            <h3 className="h2 mb-4">Ambienti e attenzione</h3>
            <div className="grid-1x3">
              {highlights.map((src, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="img-wrap">
                    <div className="relative w-full pt-[66%]">
                      <img src={src} alt="" className="img-cover" loading="lazy" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* Tutti i servizi — con sfondo/pattern */}
        <section
          id="tutti-servizi"
          className="mt-12 relative overflow-hidden rounded-[var(--radius)] shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
          style={{ background: "#f7f2e7" }}
        >
          <BackgroundPattern variant="band" />
          <div className="container py-10 md:py-14 relative z-10">
            <h3 className="section-title">Tutti i servizi</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.04}>
                  <CardLink
                    href={`/servizi/${s.slug}`}
                    title={s.title}
                    text={s.description}
                    img={s.images?.[0] || "/img/hero.jpg"}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Galleria Studio — sfondo normale */}
        <section className="container mt-12">
          <h3 className="section-title">Lo studio</h3>
          <StudioGallery images={studioImages} />
        </section>
      </main>
    </>
  );
}
