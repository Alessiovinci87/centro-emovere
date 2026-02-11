// components/StudioGallery.client.jsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function StudioGallery({ images = [] }) {
  const pics = images.slice(0, 5);
  const [active, setActive] = useState(0);     // desktop fisarmonica
  const [idx, setIdx] = useState(0);           // mobile/tablet carosello
  const touchX = useRef(null);

  if (!pics.length) return null;

  const next = () => setIdx((i) => (i + 1) % pics.length);
  const prev = () => setIdx((i) => (i - 1 + pics.length) % pics.length);

  const onTouchStart = (e) => (touchX.current = e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
  };

  return (
    <section className="relative">
      {/* DESKTOP: fisarmonica (max 1229x640 come deciso) */}
      <div className="hidden lg:flex mx-auto w-full max-w-[1229px] h-[640px] gap-6 px-4">
        {pics.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`Apri immagine ${i + 1}`}
            className="group relative h-full basis-0 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] transition-[flex-grow] duration-500 ease-in-out focus:outline-none focus-visible:ring-2"
            style={{ flexGrow: active === i ? 8 : 1 }}
          >
            <Image
              src={img.src}
              alt={img.alt || `Foto ${i + 1}`}
              fill
              sizes="(min-width:1024px) 1229px, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {/* MOBILE/TABLET: carosello con frecce */}
      <div className="lg:hidden px-4">
        <div
          className="relative w-full mx-auto max-w-[640px] aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-[var(--border)]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={pics[idx].src}
            alt={pics[idx].alt || `Foto ${idx + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          {/* Freccia sinistra */}
          <button
            onClick={prev}
            aria-label="Precedente"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[var(--fg)] grid place-items-center shadow"
          >
            ‹
          </button>
          {/* Freccia destra */}
          <button
            onClick={next}
            aria-label="Successiva"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[var(--fg)] grid place-items-center shadow"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {pics.map((_, i) => (
              <button
                key={i}
                aria-label={`Vai alla slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2 w-2 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
