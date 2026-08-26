import site from "@/content/site.config.json";

export const metadata = {
  title: "Cookie policy",
  robots: { index: false, follow: true },
};

/*
  ⚠️ BOZZA — da verificare. Ad oggi il sito non usa cookie di profilazione:
  l'unico contenuto di terze parti è la mappa Google incorporata nella pagina Contatti.
*/
export default function Cookies() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl">
          <span className="eyebrow">Legale</span>
          <h1 className="h1 mt-3">Cookie policy</h1>
          <p className="lead mt-3">Come e perché questo sito utilizza i cookie.</p>
        </div>

        <div className="prose prose-neutral max-w-3xl mt-10">
          <h2>Cookie tecnici</h2>
          <p>Il sito di {site.brand} utilizza esclusivamente cookie tecnici e strumenti strettamente necessari al suo funzionamento, che non richiedono consenso.</p>

          <h2>Contenuti di terze parti</h2>
          <p>
            Nella pagina Contatti è disponibile una mappa di Google Maps che <strong>non viene caricata automaticamente</strong>: compare solo dopo che hai premuto il pulsante &quot;Carica la mappa&quot;. Solo da quel momento Google può installare propri cookie secondo la sua{" "}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">informativa</a>. Se preferisci, puoi aprire il percorso direttamente su Google Maps senza caricare la mappa nel sito.
          </p>

          <h2>Nessuna profilazione, nessun banner</h2>
          <p>Non utilizziamo cookie di profilazione, strumenti di analisi né tracciamento pubblicitario: per questo il sito non mostra un banner di consenso. Se in futuro verranno introdotti strumenti di questo tipo, questa pagina sarà aggiornata e verrà richiesto il consenso prima dell&apos;attivazione.</p>

          <h2>Form contatti</h2>
          <p>I messaggi inviati dal form vengono raccolti dal servizio Netlify Forms, che tratta i dati per conto nostro esclusivamente per recapitarci il messaggio. Maggiori dettagli nell&apos;<a href="/privacy">informativa privacy</a>.</p>

          <h2>Come gestire i cookie</h2>
          <p>Puoi cancellare o bloccare i cookie dalle impostazioni del tuo browser. La disattivazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.</p>

          <p className="text-sm text-[var(--muted)]">Ultimo aggiornamento: [data].</p>
        </div>
      </div>
    </section>
  );
}
