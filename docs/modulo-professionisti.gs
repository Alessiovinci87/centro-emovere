/**
 * Crea il Google Form "Centro Emovere — 3 minuti per la tua pagina" (VERSIONE BREVE)
 * con foglio risposte collegato e un LINK PERSONALE per ogni professionista (nome già selezionato).
 *
 * Perché breve: chiede solo ciò che manca davvero per completare la pagina di ogni professionista
 * (P. IVA, albo, qualifica, poche righe di presentazione, contatti da mostrare). Tutto il resto
 * (dati del centro, orari, FAQ, privacy) lo compilano le fondatrici direttamente con il referente del sito.
 *
 * COME USARLO
 * 1. Vai su https://script.google.com con l'account Google del centro
 * 2. "Nuovo progetto" → cancella il contenuto → incolla tutto questo file → salva
 * 3. In alto scegli la funzione "creaModuloBreve" → "Esegui" → autorizza (Consenti)
 * 4. Nel "Registro di esecuzione" trovi: link generico, link PERSONALI (uno per persona: quelli da
 *    mandare su WhatsApp), link di modifica e foglio risposte
 */

var TEAM = ["Martina Salis", "Giulia Motzo", "Valentina Agostara", "Alessandra Marrosu", "Daniele Delrio", "Letizia Pala"];

function creaModuloBreve() {
  var form = FormApp.create("Centro Emovere — 3 minuti per la tua pagina sul sito");
  form
    .setDescription(
      "Ciao! Il sito www.centroemovere.it è online: manca solo la tua pagina.\n\n" +
      "Sono 6 domande, 3 minuti, si compila anche dal telefono. Non serve scrivere bene: " +
      "butta giù quello che ti viene, ai testi pensiamo noi."
    )
    .setCollectEmail(false)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage("Fatto, grazie! Ci pensiamo noi al resto. Se vuoi correggere qualcosa usa il link \"Modifica la risposta\".");

  // ---------- Le 6 domande (una sola pagina) ----------
  var nome = form.addListItem().setTitle("Chi sei?").setChoiceValues(TEAM).setRequired(true);

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
      "come lavori, perché fai questo lavoro. Lo sistemiamo noi."
    )
    .setRequired(true);

  form.addTextItem()
    .setTitle("Contatti personali da mostrare sulla TUA pagina del sito")
    .setHelpText("Telefono/WhatsApp, email, Instagram… solo quelli che vuoi rendere pubblici. Lascia vuoto = sulla tua pagina compaiono solo i contatti del centro.");

  // ---------- Foglio risposte ----------
  var ss = SpreadsheetApp.create("Centro Emovere — Risposte scheda professionisti (breve)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ---------- Link personali (nome già selezionato) ----------
  Logger.log("\n=== FATTO ===");
  Logger.log("Link generico:\n" + form.getPublishedUrl());
  Logger.log("\nLINK PERSONALI da mandare su WhatsApp (nome già selezionato):");
  TEAM.forEach(function (nomePersona) {
    var url = form.createResponse().withItemResponse(nome.createResponse(nomePersona)).toPrefilledUrl();
    Logger.log("- " + nomePersona + ":\n  " + url);
  });
  Logger.log("\nLink per modificare il modulo:\n" + form.getEditUrl());
  Logger.log("Foglio con le risposte:\n" + ss.getUrl());
}
