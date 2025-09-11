// components/CardLink.jsx
import Link from "next/link";

function resolveServiceSrc(img) {
  if (!img) return "/img/hero.jpg";

  // Se è oggetto { src, alt }
  if (typeof img === "object" && img.src) {
    return img.src;
  }

  // Se è stringa
  if (typeof img === "string") {
    return img.trim().startsWith("/") ? img : `/img/services/${img.trim()}`;
  }

  return "/img/hero.jpg";
}

function resolveServiceAlt({ img, title }) {
  if (typeof img === "object" && img.alt) return img.alt;
  if (title) return `${title} presso Centro Emovere ad Alghero`;
  return "Servizio del Centro Emovere ad Alghero";
}

export default function CardLink({ href = "#", title = "", text = "", img = "" }) {
  const src = resolveServiceSrc(img);
  const alt = resolveServiceAlt({ img, title });

  return (
    <Link
      href={href}
      className="block card overflow-hidden group hover-lift focus-visible:outline-none"
      title={`${title || "Servizio"} — Centro Emovere Alghero`}
      aria-label={`Apri la pagina: ${title || "Servizio"} del Centro Emovere ad Alghero`}
    >
      <article itemScope itemType="https://schema.org/Service">
        {/* Immagine 16:9 per i servizi */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            itemProp="image"
          />
        </div>

        {/* Testo */}
        <div className="p-4">
          <h3 className="font-serif text-[18px] leading-tight" itemProp="name">
            {title}
          </h3>
          {text && (
            <p
              className="mt-2 text-[15px] leading-6 text-[var(--muted)] line-clamp-3"
              itemProp="description"
            >
              {text}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
