'use client';
import { useState } from 'react';
import site from '@/content/site.config.json';

export const metadata = { title: "Contatti", description: "Scrivici per informazioni." };

export default function ContattiPage() {
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Errore invio');
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="h1">Contatti</h1>
          <p className="p mt-2">Compila il form: ti risponderemo presto.</p>
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
              <textarea name="messaggio" required rows={6} className="textarea" placeholder="Come possiamo aiutarti?" />
            </div>
            <button className="btn" disabled={status==='loading'}>
              {status === 'loading' ? 'Invio…' : 'Invia'}
            </button>
            {status === 'success' && <p className="text-green-600">Messaggio inviato correttamente.</p>}
            {status === 'error' && <p className="text-red-600">Errore nell’invio. Riprova.</p>}
          </form>
        </div>
        <div className="space-y-3">
          <div className="card p-4">
            <h2 className="h2">Dove siamo</h2>
            <p className="p mt-2">{site.address}</p>
            <p className="p">{site.email}</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-neutral-200">
            <iframe
              title="Mappa Centro Emovere"
              src="https://www.google.com/maps?q=Via%20XX%20Settembre%20246%2C%20Alghero&output=embed"
              className="w-full h-64 md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
