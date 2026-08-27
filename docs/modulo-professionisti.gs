/**
 * Crea il Google Form "Centro Emovere — 3 minuti per la tua pagina" (VERSIONE BREVE)
 * con foglio risposte collegato e un LINK PERSONALE per ogni professionista (nome già selezionato).
 *
 * Perché breve: chiede solo ciò che manca davvero per completare il sito (P. IVA, albo, qualifica,
 * poche righe di presentazione, contatti da mostrare). Tutto il resto lo sistemiamo noi.
 * Le fondatrici vedono in più una pagina con 4 domande sui dati del centro; gli altri inviano subito.
 *
 * COME USARLO
 * 1. Vai su https://script.google.com con l'account Google del centro
 * 2. "Nuovo progetto" → cancella il contenuto → incolla tutto questo file → salva
 * 3. In alto scegli la funzione "creaModuloBreve" → "Esegui" → autorizza (Consenti)
 * 4. Nel "Registro di esecuzione" trovi: link generico, link PERSONALI (uno per persona: quelli da
 *    mandare su WhatsApp), link di modifica e foglio risposte
 */

var TEAM = [
  // nome, qualifica attuale sul sito, fondatrice?
  ["Martina Salis", "Educatrice professionale", true],
  ["Giulia Motzo", "Psicologa", true],
  ["Valentina Agostara", "Neuropsicomotricista", true],
  ["Alessandra Marrosu", "Logopedista", false],
  ["Daniele Delrio", "Fisioterapista", false],
  ["Letizia Pala", "Psicologa", false],
];

function creaModuloBreve() {
  var form = FormApp.create("Centro Emovere — 3 minuti per la tua pagina sul sito");
  form
    .setDescription(
      "Ciao! Il sito www.centroemovere.it è online: manca solo la tua pagina.\n\n" +
      "Sono 6 domande, 3 minuti, si compila anche dal telefono. Non serve scrivere bene: " +
      "butta giù quello che ti viene, ai testi pensiamo noi. Se preferisci, puoi anche rispondere con un vocale su WhatsApp."
    )
    .setCollectEmail(false)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage("Fatto, grazie! Ci pensiamo noi al resto. Se vuoi correggere qualcosa usa il link \"Modifica la risposta\".");

  // ---------- Pagina 1: le 6 domande ----------
  var nome = form.addListItem().setTitle("Chi sei?").setRequired(true);
  // (le scelte, con il salto di pagina per le fondatrici, vengono impostate più sotto)

  form.addTextItem()
    .setTitle("Partita IVA")
    .setHelpText("Obbligatoria per legge sulla pagina di chi esercita in proprio. Solo il numero.")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Ordine / albo e numero di iscrizione")
    .setHelpText("Es. \"Ordine Psicologi Sardegna n. 1234\". Se non lo ricordi a memoria, lascia vuoto: te lo chiediamo dopo.");

  form.addTextItem()
    .setTitle("Come vuoi comparire? (qualifica esatta)")
    .setHelpText("Es. \"Psicologa psicoterapeuta\", \"Logopedista\", \"Terapista della neuro e psicomotricità dell'età evolutiva\". Se quella già sul sito va bene, scrivi \"ok\".");

  form.addParagraphTextItem()
    .setTitle("Raccontati in poche righe")
    .setHelpText(
      "Anche 4–5 righe di getto: formazione, da quanti anni lavori e dove, con chi lavori (bambini, adolescenti, adulti, famiglie), " +
      "come lavori, perché fai questo lavoro. Lo sistemiamo noi. In alternativa: vocale su WhatsApp e scrivi qui \"vocale\"."
    )
    .setRequired(true);

  form.addTextItem()
    .setTitle("Contatti che vuoi mostrare sulla tua pagina")
    .setHelpText("Email, telefono/WhatsApp, Instagram… quelli che vuoi. Lascia vuoto = compaiono solo i contatti del centro.");

  // ---------- Pagina 2 (solo fondatrici): 4 domande sul centro ----------
  var paginaCentro = form.addPageBreakItem()
    .setTitle("Dati del centro (solo fondatrici)")
    .setHelpText("Quattro cose che servono per contatti, FAQ e privacy del sito. Anche una risposta parziale va bene.");

  // Fondatrici → pagina "Dati del centro"; gli altri → invio diretto dopo la pagina 1
  nome.setChoices(TEAM.map(function (p) {
    return p[2] ? nome.createChoice(p[0], paginaCentro) : nome.createChoice(p[0], FormApp.PageNavigationType.SUBMIT);
  }));

  form.addTextItem()
    .setTitle("Numero WhatsApp / telefono del centro")
    .setHelpText("Quello che deve comparire sul sito e nel pulsante WhatsApp.");
  form.addTextItem()
    .setTitle("Orari di apertura")
    .setHelpText("Es. \"Lun–Ven 9:00–19:00, Sab 9:00–13:00\".");
  form.addTextItem()
    .setTitle("Costi: cosa possiamo scrivere nelle FAQ?")
    .setHelpText("Anche solo \"le tariffe si comunicano al primo contatto\", oppure convenzioni/detraibilità se volete indicarle.");
  form.addParagraphTextItem()
    .setTitle("Privacy: nome completo e P. IVA o codice fiscale delle tre titolari")
    .setHelpText("Compaiono nell'informativa privacy come titolari del trattamento.");

  // ---------- Foglio risposte ----------
  var ss = SpreadsheetApp.create("Centro Emovere — Risposte scheda professionisti (breve)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ---------- Link personali (nome già selezionato) ----------
  Logger.log("\n=== FATTO ===");
  Logger.log("Link generico:\n" + form.getPublishedUrl());
  Logger.log("\nLINK PERSONALI da mandare su WhatsApp (nome già selezionato):");
  TEAM.forEach(function (p) {
    var url = form.createResponse().withItemResponse(nome.createResponse(p[0])).toPrefilledUrl();
    Logger.log("- " + p[0] + ":\n  " + url);
  });
  Logger.log("\nLink per modificare il modulo:\n" + form.getEditUrl());
  Logger.log("Foglio con le risposte:\n" + ss.getUrl());
}
