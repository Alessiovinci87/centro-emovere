import site from "@/content/site.config.json";

export const metadata = {
  title: "Informativa privacy",
  robots: { index: false, follow: true },
};

/*
  ⚠️ BOZZA — da completare e far verificare prima della pubblicazione.
  I punti tra [parentesi quadre] vanno compilati con i dati reali del titolare.
*/
export default function Privacy() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl">
          <span className="eyebrow">Legale</span>
          <h1 className="h1 mt-3">Informativa sulla privacy</h1>
          <p className="lead mt-3">Informativa ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR).</p>
        </div>

        <div className="prose prose-neutral max-w-3xl mt-10">
          <h2>Titolare del trattamento</h2>
          <p>
            {site.brand}, {site.address}. Email: <a href={`mailto:${site.email}`}>{site.email}</a>.
            [Inserire ragione sociale / nominativo del titolare e partita IVA o codice fiscale.]
          </p>

          <h2>Dati trattati e finalità</h2>
          <ul>
            <li><strong>Dati inviati tramite il form contatti, email o WhatsApp</strong> (nome, email, telefono, messaggio): utilizzati esclusivamente per rispondere alla richiesta e organizzare un eventuale primo colloquio. Base giuridica: consenso e misure precontrattuali.</li>
            <li><strong>Eventuali dati relativi alla salute</strong> che decidi di inserire nel messaggio (es. una difficoltà del bambino): sono trattati solo per valutare la richiesta, con il tuo consenso esplicito (art. 9 GDPR), e non vengono comunicati a terzi. Ti invitiamo a non inserire nel primo messaggio più dettagli del necessario: ne parleremo con calma al colloquio.</li>
            <li><strong>Dati di navigazione</strong> (indirizzo IP, log tecnici) raccolti automaticamente dal provider di hosting per il funzionamento e la sicurezza del sito. Base giuridica: legittimo interesse.</li>
          </ul>

          <h2>Conservazione</h2>
          <p>I dati inviati tramite il form sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre [12 mesi], salvo l&apos;avvio di un percorso presso il centro.</p>

          <h2>Destinatari</h2>
          <p>I dati possono essere trattati da fornitori tecnici che ospitano il sito (Vercel) e inoltrano i messaggi del form alla nostra casella email (Web3Forms), nominati responsabili del trattamento. Non sono diffusi a terzi per finalità di marketing.</p>

          <h2>Diritti dell&apos;interessato</h2>
          <p>Puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 del GDPR (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione) scrivendo a <a href={`mailto:${site.email}`}>{site.email}</a>. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.</p>

          <p className="text-sm text-[var(--muted)]">Ultimo aggiornamento: [data].</p>
        </div>
      </div>
    </section>
  );
}
