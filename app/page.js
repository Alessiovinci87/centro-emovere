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
    { src: "/img/studio/area-accoglienza-centro-emovere-alghero.jpg", alt: "Evento in studio" },
    { src: "/img/studio/ingresso-centro-emovere-alghero.jpg", alt: "Ingresso" },
    { src: "/img/studio/logopedia-alessandra-marrosu-centro-emovere-alghero.jpg", alt: "Dettagli preparazione" },
    { src: "/img/studio/sala-fisioterapia-centro-emovere-alghero.jpg", alt: "Lecture" },
    { src: "/img/studio/studio-psicologia-giiulia-motzo-centro-emovere-alghero.jpg", alt: "Allestimento" },
  ];

  return (
    <>
      <HeroImage
        desktopSrc="/video/centro-emovere-alghero-terapia-riabilitazione.mp4"
        mobileImg={{
          src: "/img/hero/hero-mobile-centro-emovere-alghero.jpg",
          alt: "Centro Emovere Alghero — Terapia, Riabilitazione e Crescita (versione mobile)"
        }}
        tabletImg={{
          src: "/img/hero/hero-tablet-centro-emovere-alghero.jpg",
          alt: "Centro Emovere Alghero — Terapia, Riabilitazione e Crescita (versione tablet)"
        }}
      />


      {/* CONTENUTO */}
      <main id="main" tabIndex="-1">
        {/* Chi Siamo (usa team) */}
        <OperatorsGrid team={team} />

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
