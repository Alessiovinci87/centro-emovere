/**
 * Crea il Google Form "Centro Emovere — Scheda professionista" con foglio risposte collegato.
 *
 * COME USARLO
 * 1. Vai su https://script.google.com (con l'account Google che deve possedere il modulo)
 * 2. "Nuovo progetto" → cancella il contenuto → incolla tutto questo file → salva (icona floppy)
 * 3. In alto scegli la funzione "creaModulo" → premi "Esegui" → autorizza (Consenti)
 * 4. In basso, nel "Registro di esecuzione", trovi i link: LINK DA INVIARE, link di modifica, foglio risposte
 */
function creaModulo() {
  var form = FormApp.create("Centro Emovere — Scheda professionista per il sito");
  form
    .setDescription(
      "Grazie per i 10 minuti che ci dedichi. Queste informazioni servono per completare la tua pagina su www.centroemovere.it.\n\n" +
      "Tutto è facoltativo tranne le domande con asterisco: ciò che non compili semplicemente non comparirà sul sito. " +
      "Puoi rispondere anche in più volte: alla fine ti verrà mostrato un link per modificare le risposte."
    )
    .setCollectEmail(false)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage("Grazie! Abbiamo ricevuto la tua scheda. Se vuoi correggere qualcosa usa il link \"Modifica la risposta\".");

  // ---------- 1. Chi sei ----------
  form.addSectionHeaderItem().setTitle("1. Chi sei");
  form.addListItem()
    .setTitle("Il tuo nome")
    .setChoiceValues(["Martina Salis", "Giulia Motzo", "Valentina Agostara", "Alessandra Marrosu", "Daniele Delrio", "Letizia Pala"])
    .setRequired(true);
  form.addTextItem()
    .setTitle("Nome come vuoi che compaia sul sito")
    .setHelpText("Es. \"Dott.ssa Martina Salis\" oppure semplicemente \"Martina Salis\".");
  form.addTextItem()
    .setTitle("Qualifica esatta")
    .setHelpText("Es. \"Psicologa psicoterapeuta\", \"Logopedista\", \"Terapista della neuro e psicomotricità dell'età evolutiva\".")
    .setRequired(true);

  // ---------- 2. Dati legali ----------
  form.addPageBreakItem().setTitle("2. Dati legali");
  form.addSectionHeaderItem()
    .setTitle("Dati legali")
    .setHelpText("La partita IVA è obbligatoria per legge sulla pagina di chi esercita in proprio (DPR 633/72). L'iscrizione all'albo dà fiducia a chi legge.");
  form.addTextItem().setTitle("Partita IVA").setRequired(true);
  form.addTextItem()
    .setTitle("Iscrizione all'albo / ordine")
    .setHelpText("Ordine, regione e numero. Es. \"Iscritta all'Ordine degli Psicologi della Sardegna n. 1234\".");

  // ---------- 3. Contatti pubblici ----------
  form.addPageBreakItem().setTitle("3. Contatti che vuoi rendere pubblici");
  form.addSectionHeaderItem()
    .setTitle("Contatti")
    .setHelpText("Scegli tu cosa mostrare: se lasci vuoto, sulla tua pagina compariranno solo i contatti del centro.");
  form.addTextItem().setTitle("Email di lavoro da mostrare").setHelpText("Lascia vuoto per usare solo quella del centro.");
  form.addTextItem().setTitle("Telefono da mostrare").setHelpText("Lascia vuoto per usare solo quello del centro.");
  form.addMultipleChoiceItem()
    .setTitle("Il numero sopra è anche WhatsApp?")
    .setChoiceValues(["Sì, può comparire il pulsante WhatsApp", "No, solo chiamate", "Non ho indicato un numero"]);
  form.addTextItem().setTitle("Instagram professionale").setHelpText("Indirizzo completo o @nome.");
  form.addTextItem().setTitle("LinkedIn").setHelpText("Indirizzo completo del profilo.");
  form.addTextItem().setTitle("Facebook (pagina professionale)");

  // ---------- 4. Bio ----------
  form.addPageBreakItem().setTitle("4. La tua presentazione");
  form.addSectionHeaderItem()
    .setTitle("Presentazione (bio)")
    .setHelpText("Scrivi in modo semplice, come se lo raccontassi a un genitore o a un paziente. 4–8 righe in tutto vanno benissimo: le domande ti aiutano a non dimenticare nulla.");
  form.addParagraphTextItem()
    .setTitle("Formazione")
    .setHelpText("Laurea, specializzazioni, master o corsi che contano davvero per chi ti sceglie.");
  form.addParagraphTextItem()
    .setTitle("Esperienza")
    .setHelpText("Da quanti anni lavori, dove hai lavorato (strutture, scuole, ospedali, altri studi).");
  form.addParagraphTextItem()
    .setTitle("Con chi lavori")
    .setHelpText("Età (bambini, adolescenti, adulti, famiglie) e situazioni tipiche che segui.")
    .setRequired(true);
  form.addParagraphTextItem()
    .setTitle("Come lavori")
    .setHelpText("Approccio o metodo, e cosa succede in pratica al primo incontro.");
  form.addParagraphTextItem()
    .setTitle("Una frase personale")
    .setHelpText("Perché fai questo lavoro, cosa ti sta a cuore. Una o due righe.");
  form.addTextItem()
    .setTitle("Aree specifiche (parole chiave)")
    .setHelpText("3–6 termini separati da virgola. Es. \"DSA, balbuzie, deglutizione atipica\".");
  form.addMultipleChoiceItem()
    .setTitle("Preferisci la bio scritta in prima persona (\"Mi occupo di…\") o in terza (\"Si occupa di…\")?")
    .setChoiceValues(["Prima persona", "Terza persona", "Fate voi"]);

  // ---------- 5. Il tuo servizio ----------
  form.addPageBreakItem().setTitle("5. Il tuo servizio");
  form.addSectionHeaderItem()
    .setTitle("La pagina del tuo servizio")
    .setHelpText("Sul sito c'è già un testo di bozza per ogni servizio (www.centroemovere.it/servizi). Qui puoi confermarlo, correggerlo o riscriverlo. " +
      "Psicologia è condivisa da Giulia e Letizia, Consulenza da Martina e Giulia: basta mettersi d'accordo su un testo unico.");
  form.addCheckboxItem()
    .setTitle("Di quali servizi ti occupi?")
    .setChoiceValues(["Educazione professionale", "Psicologia", "Neuropsicomotricità", "Logopedia", "Fisioterapia", "Consulenza"])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle("Il testo di bozza già online va bene?")
    .setChoiceValues(["Sì, va bene così", "Va bene con le correzioni che scrivo sotto", "Lo riscrivo io qui sotto"]);
  form.addTextItem()
    .setTitle("Descrizione breve (1 riga)")
    .setHelpText("Quella che compare nella card del servizio. Max 120 caratteri.");
  form.addParagraphTextItem()
    .setTitle("Presentazione del servizio (3–4 righe)")
    .setHelpText("Il testo in cima alla pagina del servizio.");
  form.addParagraphTextItem()
    .setTitle("\"Di cosa ci occupiamo\": 4–6 punti")
    .setHelpText("Un punto per riga.");
  form.addParagraphTextItem()
    .setTitle("Per chi è, durata della seduta, strumenti o attività tipiche")
    .setHelpText("Facoltativo: aiuta a rispondere alle domande più comuni prima del contatto.");

  // ---------- 6. Foto ----------
  form.addPageBreakItem().setTitle("6. Foto");
  form.addSectionHeaderItem()
    .setTitle("Foto")
    .setHelpText("La tua foto profilo è già sul sito. Se vuoi cambiarla o aggiungere 1–2 foto in attività nella tua stanza (materiali, mani, giochi, senza volti di pazienti), " +
      "inviale via WhatsApp o email al referente del sito: qui non si possono allegare file.");
  form.addMultipleChoiceItem()
    .setTitle("La foto profilo attuale va bene?")
    .setChoiceValues(["Sì", "No, ne invio un'altra"]);
  form.addMultipleChoiceItem()
    .setTitle("Invierai foto della tua stanza / in attività?")
    .setChoiceValues(["Sì", "No", "Forse più avanti"]);

  // ---------- 7. Solo fondatrici ----------
  form.addPageBreakItem().setTitle("7. Solo per le fondatrici (dati del centro)");
  form.addSectionHeaderItem()
    .setTitle("Dati del centro")
    .setHelpText("Chi non è fondatrice può saltare questa sezione e inviare.");
  form.addTextItem().setTitle("Numero WhatsApp del centro");
  form.addTextItem().setTitle("Telefono del centro (se diverso)");
  form.addParagraphTextItem()
    .setTitle("Orari di apertura")
    .setHelpText("Es. \"Lunedì–Venerdì 9:00–19:00, Sabato 9:00–13:00\".");
  form.addParagraphTextItem()
    .setTitle("Come arrivare")
    .setHelpText("Piano, ascensore, parcheggio, accessibilità con passeggino o carrozzina.");
  form.addParagraphTextItem()
    .setTitle("Costi, convenzioni, detraibilità, pagamenti")
    .setHelpText("Serve per la domanda \"Quali sono i costi?\" nelle FAQ. Anche solo \"le tariffe si comunicano al primo contatto\".");
  form.addParagraphTextItem()
    .setTitle("Privacy: nome completo e P. IVA / codice fiscale delle tre titolari")
    .setHelpText("Compaiono nell'informativa privacy come titolari del trattamento.");
  form.addTextItem().setTitle("Link alla scheda Google (Google Business Profile), se esiste");
  form.addParagraphTextItem().setTitle("Altro che vuoi segnalare");

  // ---------- Foglio risposte ----------
  var ss = SpreadsheetApp.create("Centro Emovere — Risposte scheda professionisti");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log("\n=== FATTO ===");
  Logger.log("LINK DA INVIARE AI PROFESSIONISTI:\n" + form.getPublishedUrl());
  Logger.log("Link per modificare il modulo:\n" + form.getEditUrl());
  Logger.log("Foglio con le risposte:\n" + ss.getUrl());
}
