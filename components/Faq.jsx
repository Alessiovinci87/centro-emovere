import { ChevronDown } from "@/components/Icons";

/** FAQ con <details> nativi: accessibili, senza JavaScript, indicizzabili. */
export default function Faq({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="divide-y divide-[var(--border)] rounded-3xl border border-[var(--border)] bg-white shadow-soft-1">
      {items.map((f, i) => (
        <details key={i} className="group px-5 md:px-7" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-medium text-[16px] md:text-[17px] leading-snug">{f.q}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)] transition-transform group-open:rotate-180">
              <ChevronDown />
            </span>
          </summary>
          <div className="pb-6 -mt-1 pr-2 md:pr-12">
            <p className="text-[15px] leading-7 text-[var(--muted)]">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
