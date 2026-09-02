"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Mail } from "@/components/Icons";

/**
 * Pulsante email con menu: copia l'indirizzo, apri in Gmail o nell'app di posta.
 * Evita il solo mailto: (che su desktop apre spesso Outlook).
 */
export default function EmailButton({ email, subject = "", className = "btn btn-ghost", label = "Email" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!email) return null;
  const subj = subject ? `&su=${encodeURIComponent(subject)}` : "";
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}${subj}`;
  const mailto = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 1400);
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" className={className} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Mail className="h-[18px] w-[18px]" /> {label}
      </button>
      {open && (
        <div role="menu" className="absolute left-0 top-[calc(100%+8px)] z-30 w-[260px] rounded-2xl border border-[var(--border)] bg-white p-2 shadow-soft-2">
          <div className="px-3 pt-1.5 pb-2 text-[13px] text-[var(--muted)] break-all select-all">{email}</div>
          <button type="button" role="menuitem" onClick={copy} className="email-item">
            {copied ? <Check className="h-4 w-4 text-[var(--sage-strong)]" /> : <CopyIcon />}
            {copied ? "Copiato!" : "Copia indirizzo"}
          </button>
          <a role="menuitem" href={gmail} target="_blank" rel="noopener noreferrer" className="email-item" onClick={() => setOpen(false)}>
            <GmailIcon /> Scrivi da Gmail
          </a>
          <a role="menuitem" href={mailto} className="email-item" onClick={() => setOpen(false)}>
            <Mail className="h-4 w-4" /> Apri l&apos;app di posta
          </a>
        </div>
      )}
    </div>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
    </svg>
  );
}
function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M3 7.5v10A1.5 1.5 0 0 0 4.5 19H7V10l5 3.5 5-3.5v9h2.5a1.5 1.5 0 0 0 1.5-1.5v-10" />
      <path d="M3 7.5L12 14l9-6.5" />
      <path d="M3 7.5A1.5 1.5 0 0 1 5.4 6.3L12 11l6.6-4.7A1.5 1.5 0 0 1 21 7.5" />
    </svg>
  );
}
