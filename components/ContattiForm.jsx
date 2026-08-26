"use client";
import { useState } from "react";
import site from "@/content/site.config.json";
import { ArrowRight, Check } from "@/components/Icons";

const services = Array.isArray(site?.services) ? site.services : [];

export default function ContattiForm({ defaultService = "" }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");

    const data = new FormData(form);
    if (data.get("bot-field")) return; // honeypot

    try {
      // Netlify Forms: POST url-encoded verso la pagina statica che definisce il form
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contatti", ...Object.fromEntries(data) }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-6 md:p-8 text-center" role="status">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--sage-soft)] text-[var(--sage-strong)]">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="h3 mt-4">Messaggio inviato</h3>
        <p className="p mt-2 text-[var(--muted)]">Grazie! Ti risponderemo il prima possibile all&apos;indirizzo che ci hai lasciato.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form
      name="contatti"
      onSubmit={onSubmit}
      className="card p-5 md:p-7 space-y-4"
      noValidate={false}
    >
      <input type="hidden" name="form-name" value="contatti" />
      <p className="hidden">
        <label>Non compilare: <input name="bot-field" /></label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="label">Nome e cognome *</label>
          <input id="nome" name="nome" required autoComplete="name" className="input" placeholder="Il tuo nome" />
        </div>
        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input id="email" type="email" name="email" required autoComplete="email" className="input" placeholder="nome@esempio.it" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="telefono" className="label">Telefono</label>
          <input id="telefono" type="tel" name="telefono" autoComplete="tel" className="input" placeholder="Facoltativo" />
        </div>
        <div>
          <label htmlFor="servizio" className="label">Di cosa hai bisogno?</label>
          <select id="servizio" name="servizio" className="select" defaultValue={defaultService}>
            <option value="">Non lo so ancora / orientamento</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="messaggio" className="label">Messaggio *</label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          rows={5}
          className="textarea"
          placeholder="Raccontaci in poche righe la tua situazione: ti aiuteremo a capire da dove partire."
        />
      </div>

      <label className="flex items-start gap-3 text-[13.5px] leading-snug text-[var(--muted)]">
        <input type="checkbox" name="privacy" required className="mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--sage-strong)] focus:ring-[var(--sage)]" />
        <span>
          Ho letto l&apos;<a href="/privacy" className="underline underline-offset-2">informativa privacy</a> e acconsento al trattamento dei dati per essere ricontattato/a. *
        </span>
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === "loading"}>
          {status === "loading" ? "Invio in corso…" : "Invia il messaggio"} <ArrowRight />
        </button>
        <span className="text-[13px] text-[var(--muted)]">Rispondiamo di solito entro 1–2 giorni lavorativi.</span>
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700" role="alert">
          Non siamo riusciti a inviare il messaggio. Puoi scriverci direttamente a{" "}
          <a href={`mailto:${site.email}`} className="font-medium underline">{site.email}</a>.
        </p>
      )}
    </form>
  );
}
