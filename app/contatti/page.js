// 🚫 niente "use client" qui
export const metadata = {
  title: "Contatti",
  description: "Scrivici per informazioni.",
};

import ContattiForm from "@/components/ContattiForm"; // 👈 aggiungi questo
import site from "@/content/site.config.json";

export default function ContattiPage() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="h1">Contatti</h1>
          <p className="p mt-2">Compila il form: ti risponderemo presto.</p>
          <ContattiForm /> {/* 👈 qui usiamo il componente client */}
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
