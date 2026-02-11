// components/BackgroundPattern.jsx
export default function BackgroundPattern({ variant = "hero", className = "" }) {
  // set di layout predefiniti per le sezioni
  const V = {
    hero: (
      <>
        {/* cerchio grande in alto a sx */}
        <div
          className="absolute -top-24 -left-24 rounded-full opacity-20"
          style={{ width: 420, height: 420, background: "var(--sage)" }}
        />
        {/* cerchio piccolo in basso a sx */}
        <div
          className="absolute bottom-8 left-12 rounded-full opacity-14"
          style={{ width: 160, height: 160, background: "var(--sage)" }}
        />
        {/* archi in basso a dx */}
        <img
          src="/img/arches.svg"
          alt=""
          className="absolute -bottom-6 -right-6 w-[520px] max-w-none opacity-10 hidden sm:block"
        />
      </>
    ),
    band: (
      <>
        <div
          className="absolute -top-16 -left-16 rounded-full opacity-14"
          style={{ width: 280, height: 280, background: "var(--sage)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 rounded-full opacity-14"
          style={{ width: 320, height: 320, background: "var(--sage)" }}
        />
      </>
    ),
    card: (
      <>
        {/* piccolo accento dietro l'immagine */}
        <div
          className="absolute -top-6 -left-6 rounded-full opacity-14"
          style={{ width: 160, height: 160, background: "var(--sage)" }}
        />
        <img
          src="/img/arches.svg"
          alt=""
          className="absolute -bottom-8 -right-8 w-64 opacity-8 hidden md:block"
        />
      </>
    ),
    footer: (
      <>
        <img
          src="/img/arches.svg"
          alt=""
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[680px] opacity-8"
        />
        <div
          className="absolute -bottom-24 -left-24 rounded-full opacity-12"
          style={{ width: 360, height: 360, background: "var(--sage)" }}
        />
      </>
    ),
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {V[variant] ?? V.hero}
    </div>
  );
}
