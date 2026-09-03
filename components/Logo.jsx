// components/Logo.jsx — logo wordmark (public/img/logo-centro-emovere-alghero.png)
// L'immagine è 500x500 con ampi margini bianchi: il contenuto occupa circa x 65–445, y 100–300.
// Qui viene ritagliata via CSS e fusa con lo sfondo (mix-blend-multiply) così il bianco sparisce.

export const LOGO_SRC = "/img/logo-centro-emovere-alghero.png";

export default function Logo({ size = "md", className = "" }) {
  // scale: md 0.22 (contenuto alto 44px) · lg 0.28 (56px)
  const s =
    size === "lg"
      ? { box: "h-14 w-[108px]", img: "w-[140px] h-[140px] left-[-18px] top-[-28px]" }
      : { box: "h-11 w-[84px]", img: "w-[110px] h-[110px] left-[-14px] top-[-22px]" };

  return (
    <span className={`relative block overflow-hidden shrink-0 ${s.box} ${className}`} aria-hidden="true">
      <img
        src={LOGO_SRC}
        alt=""
        className={`absolute max-w-none mix-blend-multiply ${s.img}`}
        decoding="async"
      />
    </span>
  );
}
