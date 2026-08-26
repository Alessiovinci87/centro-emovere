/**
 * Carosello orizzontale a scatti su mobile/tablet, griglia normale da md/lg in su.
 * Uso: <HScroll cols="md:grid-cols-2 lg:grid-cols-3" item="w-[78%] sm:w-[58%]">…</HScroll>
 */
export default function HScroll({ children, cols = "md:grid-cols-2 lg:grid-cols-3", item = "w-[78%] sm:w-[58%]", className = "" }) {
  const kids = Array.isArray(children) ? children : [children];
  return (
    <div
      className={`hscroll flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 pb-1 sm:-mx-6 sm:px-6 md:grid md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:gap-5 ${cols} ${className}`}
    >
      {kids.filter(Boolean).map((child, i) => (
        <div key={child?.key ?? i} className={`snap-start shrink-0 ${item} md:w-auto`}>
          {child}
        </div>
      ))}
    </div>
  );
}
