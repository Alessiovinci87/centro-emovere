// components/Icons.jsx — icone SVG inline (nessuna dipendenza esterna)

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

export function ArrowRight({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function ChevronDown({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
export function ChevronLeft({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}
export function ChevronRight({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
export function Menu({ className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function Close({ className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
export function Mail({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}
export function Phone({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
export function Pin({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
export function Instagram({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function Home({ className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 11.5L12 4l8.5 7.5" />
      <path d="M5.5 10v9.5h13V10" />
      <path d="M10 19.5v-5h4v5" />
    </svg>
  );
}
export function Grid({ className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </svg>
  );
}
export function Users({ className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.3a3.2 3.2 0 0 1 0 5.4" />
      <path d="M16.5 14.2a5.5 5.5 0 0 1 4 5.3" />
    </svg>
  );
}
export function Chat({ className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.5V16H6.5A2.5 2.5 0 0 1 4 13.5z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}
export function ChevronLeftSmall({ className = "h-4 w-4" }) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M14 6l-6 6 6 6" />
    </svg>
  );
}
export function Clock({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
export function Check({ className = "h-4 w-4" }) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/* ---------- Icone servizi ---------- */
const service = {
  // cervello
  psicologia: (
    <>
      <path d="M9.5 3.5a4 4 0 0 0-4 4v1a3 3 0 0 0-1.5 5.5A3.5 3.5 0 0 0 7 20h2.5" />
      <path d="M14.5 3.5a4 4 0 0 1 4 4v1a3 3 0 0 1 1.5 5.5A3.5 3.5 0 0 1 17 20h-2.5" />
      <path d="M12 3.5V20M9 9h3M12 13h3" />
    </>
  ),
  // profilo che parla
  logopedia: (
    <>
      <path d="M13.5 4.5a5 5 0 0 0-6.5 4.8v2.2L5.5 14h1.5v2.5a2 2 0 0 0 2 2H12v2" />
      <path d="M11 9.5h.01" />
      <path d="M16 8.5a3.5 3.5 0 0 1 0 5M18.5 6.3a6.5 6.5 0 0 1 0 9.4M21 4a9.5 9.5 0 0 1 0 14" />
    </>
  ),
  // bambino in movimento
  neuropsicomotricita: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M12 8v5.5M12 8l-4.5 2.5M12 8l4.5 3.5M12 13.5L8.5 20M12 13.5l3.5 6.5" />
    </>
  ),
  // colonna vertebrale
  fisioterapia: (
    <>
      <path d="M12 3v18" />
      <path d="M9 5.5h6M8.5 8.5h7M8 11.5h8M8.5 14.5h7M9 17.5h6M9.5 20.5h5" />
    </>
  ),
  // germoglio
  educazione: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6z" />
      <path d="M12 15c0-3-2-5-5.5-5 0 3 2 5 5.5 5z" />
      <path d="M7 21h10" />
    </>
  ),
  // casa con cuore (genitori e famiglia)
  "parent-training": (
    <>
      <path d="M3.5 11L12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M12 17.5s-3.5-2.2-3.5-4.5a1.9 1.9 0 0 1 3.5-1 1.9 1.9 0 0 1 3.5 1c0 2.3-3.5 4.5-3.5 4.5z" />
    </>
  ),
};

export function ServiceIcon({ name, className = "h-6 w-6" }) {
  return (
    <svg {...base} className={className}>
      {service[name] ?? service.educazione}
    </svg>
  );
}
