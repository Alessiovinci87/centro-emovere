"use client";
import { useState } from "react";

export default function ContattiForm() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Errore invio");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm mb-1">Nome</label>
        <input name="nome" required className="input" placeholder="Il tuo nome" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" name="email" required className="input" placeholder="nome@dominio.it" />
      </div>
      <div>
        <label className="block text-sm mb-1">Messaggio</label>
        <textarea
          name="messaggio"
          required
          rows={6}
          className="textarea"
          placeholder="Come possiamo aiutarti?"
        />
      </div>
      <button className="btn" disabled={status === "loading"}>
        {status === "loading" ? "Invio…" : "Invia"}
      </button>
      {status === "success" && <p className="text-green-600">Messaggio inviato correttamente.</p>}
      {status === "error" && <p className="text-red-600">Errore nell’invio. Riprova.</p>}
    </form>
  );
}

