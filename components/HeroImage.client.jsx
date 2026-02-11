"use client";

export default function HeroImage({
  // Video desktop (≥1024px)
  desktopSrc = "/video/centro-emovere-alghero-terapia-riabilitazione.mp4",
  showArrow = true,
  liftDesktop = true,

  // Immagini fallback
  mobileImg = {
  src: "/video/hero-mobile-centro-emovere-alghero.jpg",
  alt: "Centro Emovere Alghero — Terapia, Riabilitazione e Crescita (versione mobile)"
},
tabletImg = {
  src: "/video/hero-tablet-centro-emovere-alghero.jpg",
  alt: "Centro Emovere Alghero — Terapia, Riabilitazione e Crescita (versione tablet)"
},

}) {
  return (
    <section
      className={[
        "relative w-full",
        "screen-minus-nav",          // altezza reale su mobile/tablet
        "lg:min-h-[100dvh]",         // full screen su desktop
        liftDesktop ? "lg:-mt-10" : "",
      ].join(" ")}
    >
      {/* MOBILE: <768px */}
      <img
        src={mobileImg?.src}
        alt={mobileImg?.alt || "Centro Emovere Alghero — Terapia, Riabilitazione e Crescita"}
        className="absolute inset-0 block w-full h-full object-cover md:hidden"
        loading="eager"
        decoding="async"
      />

      {/* TABLET: 768–1023px */}
      <img
        src={tabletImg?.src}
        alt={tabletImg?.alt || "Centro Emovere Alghero — Terapia, Riabilitazione e Crescita"}
        className="absolute inset-0 hidden md:block lg:hidden w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* DESKTOP: ≥1024px */}
      <video
        className="absolute inset-0 hidden lg:block w-full h-full object-cover"
        src={desktopSrc}
        autoPlay
        muted
        playsInline
        controls={false}
        loop={false}               // 🔹 parte una sola volta
        preload="metadata"
      >
        Il tuo browser non supporta il video HTML5.
      </video>

      {/* Freccia scroll */}
      {showArrow && (
        <a
          href="#main"
          aria-label="Vai alla sezione principale"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 inline-flex items-center justify-center"
        >
          <svg
            className="h-8 w-8 animate-bounce drop-shadow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span className="sr-only">Scroll to main</span>
        </a>
      )}
    </section>
  );
}
