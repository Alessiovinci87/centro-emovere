import site from "@/content/site.config.json";

/** Link WhatsApp con messaggio precompilato. Non renderizza nulla finché `whatsapp` in config è vuoto. */
export function whatsappHref(message) {
  const raw = String(site.whatsapp || "").replace(/[^\d]/g, "");
  if (!raw) return null;
  const number = raw.startsWith("39") ? raw : `39${raw}`; // prefisso Italia
  const text = encodeURIComponent(message || site.whatsappMessage || "");
  return `https://wa.me/${number}${text ? `?text=${text}` : ""}`;
}

export function WhatsAppIcon({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.3z" />
    </svg>
  );
}

export default function WhatsAppButton({ message, className = "btn btn-ghost", label = "Scrivici su WhatsApp" }) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsAppIcon /> {label}
    </a>
  );
}
