// components/Logo.jsx — emblema del logo (cerchio verde + archi) ridisegnato in SVG.
// La scritta "Centro Emovere" è resa a parte, in testo, da Header e Footer: così non compare due volte.
// Geometria ricavata da public/img/logo-centro-emovere-alghero.png (500x500): archi centrati in (263,232),
// raggi 20/41/62/83/104; cerchio verde centrato in (192,195), raggio 92.

export const LOGO_SRC = "/img/logo-centro-emovere-alghero.png";

const RADII = [104, 83, 62, 41, 20];

export default function Logo({ size = "md", className = "" }) {
  const h = size === "lg" ? "h-12" : "h-10";
  return (
    <svg
      viewBox="96 98 276 194"
      className={`block w-auto shrink-0 ${h} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="192" cy="195" r="92" fill="#a4b885" />
      {RADII.map((r) => (
        <path key={r} d={`M ${263 - r} 232 A ${r} ${r} 0 0 1 ${263 + r} 232`} fill="none" stroke="#141414" strokeWidth="5.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}
