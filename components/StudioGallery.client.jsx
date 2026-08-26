"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/Icons";

export default function StudioGallery({ images = [] }) {
  const pics = images.slice(0, 6);
  const [active, setActive] = useState(0); // desktop: pannello espanso
  const [idx, setIdx] = useState(0); // mobile: slide corrente
  const trackRef = useRef(null);

  // Mobile: carosello a scroll-snap nativo, aggiorna l'indice in base allo scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIdx(Math.max(0, Math.min(pics.length - 1, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [pics.length]);

  if (!pics.length) return null;

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const n = (i + pics.length) % pics.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      {/* DESKTOP: pannelli espandibili */}
      <div className="hidden lg:flex h-[520px] gap-3">
        {pics.map((p, i) => {
          const isActive = active === i;
          return (
            <button
              key={p.src}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={p.caption || p.alt || `Foto ${i + 1}`}
              className="group relative h-full min-w-0 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-white transition-[flex-grow] duration-500 ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
            >
              <img
                src={p.src}
                alt={p.alt || ""}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 text-left">
                <span
                  className={`block font-serif text-white text-lg transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {p.caption}
                </span>
              </div>
              {!isActive && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium text-[var(--fg)] shadow">
                  {p.caption}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* MOBILE / TABLET: carosello scroll-snap */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-[var(--radius)] border border-[var(--border)] bg-white"
            aria-roledescription="carosello"
          >
            {pics.map((p, i) => (
              <figure key={p.src} className="relative w-full shrink-0 snap-center aspect-[4/3]">
                <img
                  src={p.src}
                  alt={p.alt || ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {p.caption && (
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[12.5px] font-medium shadow">
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(idx - 1)}
            aria-label="Foto precedente"
            className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow hover:bg-white"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => goTo(idx + 1)}
            aria-label="Foto successiva"
            className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow hover:bg-white"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {pics.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Vai alla foto ${i + 1}`}
              aria-current={i === idx}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[var(--sage-strong)]" : "w-2 bg-[var(--border)]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
