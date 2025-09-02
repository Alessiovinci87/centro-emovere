// components/HeroImage.client.jsx
"use client";

export default function HeroImage({
  // Video desktop (≥1024px)
  desktopSrc = "/video/herovid.mp4",
  poster = null,
  showArrow = true,
  liftDesktop = true,

  // Immagini:
  // se i file sono in /public/img/hero/... usa questi default,
  // altrimenti passali come prop (vedi esempio sotto).
  mobileImg = "/img/hero/herosmartimg.jpg",   // <768px
  tabletImg = "/img/hero/herotabimg.jpg",     // 768–1023px
  alt = "Hero",
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
        src={mobileImg}
        alt={alt}
        className="absolute inset-0 block w-full h-full object-cover md:hidden"
        loading="eager"
      />

      {/* TABLET: 768–1023px */}
      <img
        src={tabletImg}
        alt={alt}
        className="absolute inset-0 hidden md:block lg:hidden w-full h-full object-cover"
        loading="eager"
      />

      {/* DESKTOP: ≥1024px */}
      <video
        className="absolute inset-0 hidden lg:block w-full h-full object-cover"
        src={desktopSrc}
        poster={poster || undefined}
        autoPlay
        muted
        playsInline
        controls={false}
        loop={false}
        preload="metadata"
      />

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
