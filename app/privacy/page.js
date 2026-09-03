import site from "@/content/site.config.json";

export const metadata = {
  title: "Informativa privacy",
  robots: { index: false, follow: true },
};

const LAST_UPDATE = "3 settembre 2026";

export default function Privacy() {
  const founders = (site.team || []).filter((m) => m.founder);
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl">
          <span className="eyebrow">Legale</span>
          <h1 className="h1 mt-3">Informativa sulla privacy</h1>
          <p className="lead mt-3">Informativa ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR) per chi visita il sito e ci contatta.</p>
        </div>

        <div className="prose prose-neutral max-w-3xl mt-10">
          <h2>Titolari del trattamento</h2>
          <p>
            {site.brand} è uno studio professionale condiviso in {site.address}. Ogni professionista che vi opera è titolare autonomo del trattamento dei dati delle persone che segue, nel rispetto del segreto professionale e delle norme deontologiche del proprio ordine o albo.
          </p>
          <p>Per i dati raccolti tramite questo sito (form contatti, email, WhatsApp) sono contitolari del trattamento le fondatrici del centro:</p>
          <ul>
            {founders.map((m) => (
              <li key={m.slug}>
                <strong>{m.name}</strong>, {m.role}
                {m.vatNumber ? ` — P. IVA ${m.vatNumber}` : ""}
                {m.registration ? ` — ${m.registration.replace(/^Iscritt[ao] all'/, "")}` : ""}
              </li>
            ))}
          </ul>
          <p>
            Contatto unico per ogni questione relativa alla privacy: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Dati trattati e finalità</h2>
          <ul>
            <li><strong>Dati inviati tramite il form contatti, email o WhatsApp</strong> (nome, email, telefono, messaggio): utilizzati esclusivamente per rispondere alla richiesta, indirizzarla al professionista più adatto e organizzare un eventuale primo colloquio. Base giuridica: esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR).</li>
            <li><strong>Eventuali dati relativi alla salute</strong> che decidi di inserire nel messaggio (per esempio una difficoltà del bambino): sono trattati solo per valutare la richiesta, sulla base del consenso esplicito che presti inviando il messaggio (art. 9.2.a GDPR), e non vengono comunicati a terzi. Ti invitiamo a non inserire nel primo messaggio più dettagli del necessario: ne parleremo con calma al colloquio.</li>
            <li><strong>Dati di navigazione</strong> (indirizzo IP, log tecnici) raccolti automaticamente dal provider di hosting per il funzionamento e la sicurezza del sito. Base giuridica: legittimo interesse (art. 6.1.f GDPR).</li>
          </ul>
          <p>Il conferimento dei dati è facoltativo, ma senza i dati di contatto non possiamo rispondere alla richiesta. Non effettuiamo profilazione né decisioni automatizzate. I dati non sono utilizzati per finalità di marketing.</p>
          <p>I dati raccolti durante i percorsi presso il centro (cartelle, valutazioni, relazioni) sono trattati dal singolo professionista secondo un&apos;informativa specifica consegnata al primo incontro.</p>

          <h2>Conservazione</h2>
          <p>I dati inviati tramite il form, email o WhatsApp sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 12 mesi dall&apos;ultimo contatto. Se la richiesta si trasforma in un percorso presso il centro, i dati confluiscono nella documentazione professionale, conservata per i termini di legge. I log tecnici del provider sono conservati per il tempo strettamente necessario alla sicurezza del servizio.</p>

          <h2>Destinatari e trasferimenti</h2>
          <p>I dati possono essere trattati, per conto nostro e in qualità di responsabili del trattamento, da fornitori tecnici:</p>
          <ul>
            <li><strong>Vercel Inc.</strong>, che ospita il sito e gestisce il dominio;</li>
            <li><strong>Resend</strong>, che recapita alla nostra casella email i messaggi inviati dal form (server nell&apos;Unione Europea);</li>
            <li><strong>Google</strong> (Gmail), che fornisce la casella email del centro;</li>
            <li><strong>Meta (WhatsApp)</strong>, se scegli di contattarci tramite WhatsApp, secondo la sua informativa.</li>
          </ul>
          <p>Alcuni di questi fornitori hanno sede negli Stati Uniti: il trasferimento avviene sulla base della decisione di adeguatezza della Commissione Europea (EU-US Data Privacy Framework) o delle clausole contrattuali standard. I dati non sono diffusi né ceduti a terzi.</p>

          <h2>Diritti dell&apos;interessato</h2>
          <p>Puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 del GDPR (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca del consenso) scrivendo a <a href={`mailto:${site.email}`}>{site.email}</a>. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</p>

          <h2>Cookie</h2>
          <p>Il sito utilizza solo cookie tecnici: i dettagli sono nella <a href="/cookies">cookie policy</a>.</p>

          <p className="text-sm text-[var(--muted)]">Ultimo aggiornamento: {LAST_UPDATE}.</p>
        </div>
      </div>
    </section>
  );
}
