import site from "@/content/site.config.json";

export const metadata = {
  title: "Cookie policy",
  robots: { index: false, follow: true },
};

const LAST_UPDATE = "25 settembre 2026";

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
          <h2>Cookie e strumenti tecnici</h2>
          <p>Il sito di {site.brand} utilizza cookie e strumenti tecnici strettamente necessari al suo funzionamento, che non richiedono consenso ai sensi dell&apos;art. 122 del Codice Privacy e delle Linee guida del Garante del 10 giugno 2021:</p>
          <ul>
            <li>un cookie, eventuale, che ricorda l&apos;accesso alla versione in anteprima riservata all&apos;équipe;</li>
            <li>la memorizzazione nel tuo browser (localStorage) della scelta che fai sui cookie di analisi, con la relativa data, per non riproporti il banner a ogni pagina. Non contiene identificativi e non viene inviata a noi; ti chiediamo di nuovo la scelta dopo circa 6 mesi.</li>
          </ul>

          <h2>Cookie di analisi: Microsoft Clarity (solo con il tuo consenso)</h2>
          <p>Se premi &quot;Accetta&quot; nel banner, il sito carica <strong>Microsoft Clarity</strong>, un servizio di Microsoft Corporation che ci aiuta a capire come viene usato il sito (per esempio quali pagine vengono visitate, dove si clicca, fin dove si scorre, se qualcosa non funziona) tramite statistiche aggregate, mappe di calore e registrazioni delle sessioni di navigazione. Lo usiamo solo per migliorare il sito: <strong>non per pubblicità né per profilazione</strong>, e comunichiamo a Clarity il consenso per le sole finalità di analisi, negando quello per finalità pubblicitarie.</p>
          <p>Finché non accetti, o se rifiuti, lo script di Clarity <strong>non viene caricato</strong> e nessun dato viene inviato a Microsoft.</p>
          <p>Con il consenso, Clarity può impostare cookie di prima parte (sul nostro dominio) come <code>_clck</code>, che conserva un identificativo pseudonimo del visitatore, e <code>_clsk</code>, che collega le pagine visitate in un&apos;unica sessione. In determinate condizioni possono essere impostati anche cookie di terza parte su domini Microsoft (per esempio <code>MUID</code>, <code>CLID</code>, <code>ANONCHK</code>, <code>MR</code>, <code>SM</code>). Nomi, finalità e caratteristiche sono descritti da Microsoft nella pagina{" "}
            <a href="https://learn.microsoft.com/it-it/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">Cookie di Clarity</a>; la durata è quella stabilita da Microsoft e può variare nel tempo.
          </p>
          <p>Clarity raccoglie dati tecnici e di interazione (pagine visitate, clic, movimenti e scorrimento, tipo di dispositivo e browser, posizione geografica approssimativa). Il contenuto dei campi dei moduli non viene registrato e il modulo contatti è escluso interamente dalle registrazioni. I dati sono trattati da Microsoft secondo la sua{" "}
            <a href="https://www.microsoft.com/it-it/privacy/privacystatement" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a>. Maggiori dettagli nell&apos;<a href="/privacy">informativa privacy</a>.
          </p>

          <h2>Come dare, cambiare o revocare il consenso</h2>
          <p>Puoi cambiare scelta in qualsiasi momento dal link <strong>&quot;Preferenze cookie&quot;</strong> in fondo a ogni pagina. Se revochi un consenso dato in precedenza, chiediamo a Clarity di cancellare i propri cookie dal tuo browser e di interrompere il tracciamento, e smettiamo di caricarlo. I cookie di terza parte sui domini Microsoft possono essere eliminati dalle impostazioni del browser.</p>

          <h2>Contenuti di terze parti</h2>
          <p>
            Nella pagina Contatti è disponibile una mappa di Google Maps che <strong>non viene caricata automaticamente</strong>: compare solo dopo che hai premuto il pulsante &quot;Carica la mappa&quot;. Solo da quel momento Google può installare propri cookie secondo la sua{" "}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">informativa</a>. Se preferisci, puoi aprire il percorso direttamente su Google Maps senza caricare la mappa nel sito.
          </p>

          <h2>Nessuna profilazione, nessuna pubblicità</h2>
          <p>Non utilizziamo cookie di profilazione né strumenti di tracciamento pubblicitario.</p>

          <h2>Form contatti</h2>
          <p>Il form non usa cookie. I messaggi inviati vengono recapitati alla nostra casella email tramite il servizio Resend, che tratta i dati per conto nostro esclusivamente per l&apos;inoltro. Maggiori dettagli nell&apos;<a href="/privacy">informativa privacy</a>.</p>

          <h2>Come gestire i cookie</h2>
          <p>Puoi cancellare o bloccare i cookie dalle impostazioni del tuo browser. La disattivazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.</p>

          <p className="text-sm text-[var(--muted)]">Ultimo aggiornamento: {LAST_UPDATE}.</p>
        </div>
      </div>
    </section>
  );
}
