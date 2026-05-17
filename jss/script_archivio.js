// --- ELEMENTI DEL DOM ---
// Recupero gli elementi HTML necessari per gestire l'apertura e la chiusura dell'archivio
const trigger = document.getElementById("archiveTrigger");
const overlay = document.getElementById("archiveOverlay");
const closeBtn = document.getElementById("closeArchive");

// Elementi per la navigazione e la visualizzazione dei contenuti dell'archivio
const categories = document.querySelectorAll(".category"); // I bottoni/tab delle varie categorie
const contentTitle = document.getElementById("contentTitle"); // Il titolo della categoria selezionata
const contentArea = document.getElementById("contentArea"); // L'area dove verranno iniettate le schede

// Elementi della finestra modale usata per visualizzare i modelli 3D o i video
const modelModal = document.getElementById("modelModal");
const modelViewer = document.getElementById("modelViewer"); // Il componente <model-viewer> per il 3D
const mediaContainer = document.getElementById("mediaContainer"); // Il contenitore per iniettare i tag <video>
const closeModel = document.getElementById("closeModel"); // Bottone per chiudere la modale
const modelBackdrop = document.getElementById("modelBackdrop"); // Lo sfondo scuro dietro la modale

// upload button/input removed from HTML — upload variables not needed

// --- DATABASE DEI CONTENUTI ---
// Un oggetto che funge da database locale diviso per categorie (professori, studenti, ecc.)
// Ogni elemento contiene nome, sottotitolo (caption), descrizione e il percorso al file multimediale (modello 3D o video)
const data = {
  professori: [
    { name: "Filius Flitwick", caption: "Professore di Incantesimi", model: "personaggi/professor_flitwick.glb", description: "Piccolo di statura ma grande nel cuore della classe, il Professor Flitwick è noto per la sua abilità con gli incantesimi pratici e per il suo approccio paziente verso gli studenti. Le sue lezioni combinano teoria e esercitazioni pratiche per potenziare la precisione magica." },
    { name: "Minerva McGonagall", caption: "Professoressa di Trasfigurazione", model: "personaggi/professor_minerva_mcgonagall.glb", description: "Rigida ma giusta, la Professoressa McGonagall è esperta in trasfigurazione complessa e nella gestione disciplinare della scuola. Viene rispettata per la sua fermezza, il profondo senso del dovere e la capacità di guidare gli studenti nei momenti difficili." },
    { name: "Severus Snape", caption: "Maestro di Pozioni", model: "personaggi/severus_snape.glb", description: "Maestro di Pozioni dal temperamento freddo, con una conoscenza enciclopedica degli ingredienti e delle loro interazioni. Le sue lezioni richiedono concentrazione, precisione e un approccio metodico alla preparazione degli elisir." },
    { name: "Albus Dumbledore", caption: "Preside di Hogwarts", model: "personaggi/harry-potter_albus_dumbledore.glb", description: "Figura carismatica e saggia, il Preside Dumbledore guida la scuola con saggezza e lungimiranza. Le sue decisioni, spesso dettate da una profonda comprensione della magia e della natura umana, ispirano studenti e docenti." },
    { name: "Rubeus Hagrid", caption: "Guardiacaccia di Hogwarts", model: "personaggi/rubeus_hagrid.glb", description: "Umano dal cuore grande e amante delle creature, Hagrid si occupa della cura delle bestie e dell'accoglienza degli studenti. La sua gentilezza e la conoscenza pratica delle creature magiche lo rendono una figura di fiducia per i più giovani." },
    { name: "Madam Hooch", caption: "Insegnante di Volo", model: "personaggi/madam_hooch.glb", description: "Istruttrice esperta di volo, responsabile delle lezioni pratiche sulle scope e della sicurezza durante le sessioni di volo. Sa istillare disciplina e abilità tecnica nei giovani aspiranti giocatori di Quidditch." },
    { name: "Pomona Sprout", caption: "Professoressa di Erbologia", model: "personaggi/madam_sprout.glb", description: "Esperta di piante magiche, la Professoressa Sprout conduce gli studenti attraverso il regno dell'erbologia con cura e precisione. Le sue lezioni spesso coinvolgono osservazione pratica e cura delle specie più delicate." },
    { name: "Poppy Pomfrey", caption: "Infermiera di Hogwarts", model: "personaggi/madam_poppy_pomfrey_night_ver..glb", description: "Responsabile dell'infermeria, conosciuta per la sua abilità nel gestire ferite magiche e per i rimedi rapidi ed efficaci. Gli studenti si affidano a lei per cure rassicuranti e competenti." },
    { name: "Gilderoy Lockhart", caption: "Professore di Difesa contro le Arti Oscure", model: "personaggi/gilderoy_lockhart_cos_gamecubexbox.glb", description: "Figura affascinante e vanitosa famosa per i suoi racconti di imprese eroiche. Le sue lezioni sono spesso più orientate alla presentazione personale che alla sostanza, ma ritratto di popolarità tra alcuni studenti." },
    { name: "Quirinus Quirrell", caption: "Professore di Hogwarts", model: "personaggi/quirinus_quirrell.glb", description: "Docente timido e nervoso, la sua figura sembra nascondere più di quanto dica la sua voce tremolante. Le sue lezioni possono essere inaspettate e rivelano aspetti poco convenzionali della pratica magica." },
    { name: "Argus Filch", caption: "Custode di Hogwarts", model: "personaggi/argus_filch_cos_gamecubexbox.glb", description: "Custode scontroso e attento ai regolamenti, Filch pattuglia i corridoi con costante vigilanza. La sua conoscenza degli angoli nascosti del castello lo rende un osservatore temuto dagli studenti indisciplinati." }
  ],

  studenti: [
    { name: "Harry Potter", caption: "Studente di Grifondoro", model: "personaggi/harry_potter.glb", description: "Studente coraggioso noto per la sua determinazione e le esperienze straordinarie che lo hanno coinvolto. Ha un forte senso di lealtà verso gli amici e una propensione a mettersi in gioco quando necessario." },
    { name: "Hermione Granger", caption: "Studentessa brillante", model: "personaggi/hermione_granger.glb", description: "Studiosa diligente con curiosità insaziabile, Hermione eccelle nello studio della magia teorica e pratica. È spesso fonte di soluzioni intelligenti e di consigli ponderati per i compagni." },
    { name: "Ronald Weasley", caption: "Studente di Grifondoro", model: "personaggi/ronald_weasley.glb", description: "Amichevole e leale, Ron è un compagno di avventure dal grande cuore. Il suo senso dell'umorismo e la profonda amicizia lo rendono un pilastro nei gruppi a cui appartiene." },
    { name: "Luna Lovegood", caption: "Studentessa sognatrice di Corvonero", model: "personaggi/luna_lovegood_harry_potter.glb", description: "Creativa e fuori dagli schemi, Luna possiede una visione unica del mondo magico. La sua calma e la capacità di vedere dettagli nascosti la rendono una compagna preziosa in molte situazioni." },
    { name: "Cho Chang", caption: "Studentessa e Cercatrice", model: "personaggi/cho_chang_harry_potter.glb", description: "Atleta e studentessa riflessiva, Cho è nota per le sue abilità nel Quidditch e per il suo carattere sensibile. Si distingue per grazia e determinazione nelle attività scolastiche." },
    { name: "Draco Malfoy", caption: "Studente di Serpeverde", model: "personaggi/draco_malfoy.glb", description: "Figura ambiziosa e spesso in contrasto con i compagni di altre case; Draco è caratterizzato da uno spirito competitivo e da una forte pressione familiare che influisce sul suo comportamento." },
    { name: "Ginny Weasley", caption: "Studentessa e Giocatrice di Quidditch", model: "personaggi/ginny_weasley_harry_potter.glb", description: "Determinata e coraggiosa, Ginny mostra talento nel Quidditch e personalità vivace. È una figura influente tra gli studenti e combacia forza e empatia." },
    { name: "Cedric Diggory", caption: "Studente di Tassorosso", model: "personaggi/Cedric.glb", description: "Atleta leale e rispettato, Cedric incarna fair play e coraggio; noto per la sua abilità nel Torneo Tremaghi e per il comportamento nobile sia dentro che fuori dal campo." },
  ],

  creature: [
    { name: "Dobby", caption: "Elfo domestico libero", model: "personaggi/updated_dobby_the_free_house_elf_-_retextured.glb", description: "Ex-elfo domestico che ha guadagnato la libertà, Dobby è leale, coraggioso e disponibile. La sua personalità vivace si accompagna a un forte senso del sacrificio per coloro che protegge." },
    { name: "Hedwig", caption: "Gufo delle nevi di Harry", model: "personaggi/hedwig.glb", description: "Compagna fedele e messaggera esperta, Hedwig è nota per il comportamento calmo e la precisione nelle consegne. Il legame con il suo padrone è profondo e protettivo." },
    { name: "Ippogrifo", caption: "Creatura magica alata", model: "personaggi/hippogriff.glb", description: "Nobile creatura alata che richiede rispetto e cerimonie per l'approccio. Può essere un alleato valoroso a patto che vengano rispettate le regole del suo comportamento." },
    { name: "Drago Chinese Fireball", caption: "Drago magico", model: "personaggi/chinese_fireball_dragon.glb", description: "Una delle molte specie di drago; potente e fiero, il Chinese Fireball è noto per la sua aggressività e le fiamme caratteristiche che emette. Richiede gestori esperti." },
    { name: "Fenice", caption: "Creatura magica immortale", model: "personaggi/fenix.glb", description: "Creatura leggendaria in grado di rinascere dalle proprie ceneri; la fenice è simbolo di rinnovamento e possiede lacrime curative e un canto carico di mistero." },
    { name: "Mandragola", caption: "Pianta magica urlante", model: "personaggi/mandrake.glb", description: "Pianta dalle radici pericolose il cui grido può essere nocivo; la sua cura richiede precauzioni e l'uso di protezioni adeguate durante le lezioni di erboristeria." },
    { name: "Libro Mostro dei Mostri", caption: "Libro magico aggressivo", model: "personaggi/the_monster_book_of_monsters.glb", description: "Volume apparentemente ostile che si comporta come un animale, il Libro Mostro necessita di cautela e tecniche specifiche per essere maneggiato in sicurezza." },
    { name: "Basilisco", caption: "Creatura magica serpentina", model: "personaggi/basilisk.glb", description: "Serpente gigante e letale, il Basilisco è noto per il suo sguardo mortale e la pelle resistente. Richiede un approccio esperto e cautela per essere affrontato." }
  ],

  oggetti: [
    { name: "Mappa del Malandrino", caption: "Mostra i movimenti dentro Hogwarts", model: "personaggi/the_marauders_map_free_rigged.glb", description: "Mappa incantata che rivela i passaggi segreti e i movimenti delle persone all'interno del castello. Utile per esplorazioni furtive e per chi cerca di comprendere la geografia nascosta della scuola." },
    { name: "Bacchetta di Sambuco", caption: "Una delle Tre Reliquie della Morte", model: "personaggi/elder_wand.glb", description: "Bacchetta leggendaria rinomata per la sua potenza; leggendaria e controversa, chi la brandisce può ottenere grande potere ma spesso attira pericoli e conflitti." },
    { name: "Bacchetta di Harry Potter", caption: "Bacchetta personale di Harry", model: "personaggi/harry_potters_wand.glb", description: "Strumento personale del protagonista, bilanciato per l'utilizzo quotidiano e per l'affidabilità in situazioni di necessità. Ogni bacchetta ha una propria affinità." },
    { name: "Cappello Parlante", caption: "Smista gli studenti nelle case", model: "personaggi/harry_potter_hogwarts_sorting_hat.glb", description: "Antico cappello che valuta le qualità degli studenti per assegnarli a una delle case. Il suo giudizio combina conoscenza, intuizione e tradizione." },
    { name: "Giratempo", caption: "Oggetto magico per viaggiare nel tempo", model: "personaggi/time_turner_harry_potter.glb", description: "Dispositivo che consente viaggi temporali limitati: uno strumento potente e pericoloso che richiede responsabilità e controllo per evitare paradossi." },
    { name: "Calice Tremaghi", caption: "Coppa del Torneo Tremaghi", model: "personaggi/triwizard_cup.glb", description: "Trofeo magico che seleziona i concorrenti e li prova attraverso sfide complesse; simbolo di competizione, pericolo e gloria." },
    { name: "Diario di Tom Riddle", caption: "Horcrux di Voldemort", model: "personaggi/diario_tom_riddle.glb", description: "Oggetto contenente frammenti dell'anima di chi lo ha creato; il diario ha capacità manipolative e può influire su chi lo usa." },
    { name: "Anello di Gaunt", caption: "Horcrux della famiglia Gaunt", model: "personaggi/gaunts_ring_horcrux_-_harry_potter.glb", description: "Relitto carico di magia oscura e di significati familiari, associato a poteri corrotti e a conseguenze dolorose per chi lo possiede." },
    { name: "Chiave Alata", caption: "Chiave magica volante", model: "personaggi/daedalian_key.glb", description: "Piccolo oggetto incantato capace di volare e di aprire specifiche serrature; spesso impiegato in prove di abilità e in enigmi aventi a che fare con precisione e tecnica." },
    { name: "Boccino d’Oro", caption: "Palla del Quidditch", model: "personaggi/harry_potter_golden_snitch.glb", description: "Piccola sfera dorata con ali utilizzata nelle partite di Quidditch; catturarlo significa vittoria immediata per la propria squadra, grazie alla sua velocità e agilità." },
    { name: "Uovo d’Oro", caption: "Indizio del Torneo Tremaghi", model: "personaggi/harry_potter_golden_egg.glb", description: "Elemento che contiene indizi per le prove del torneo; spesso protetto da incantesimi e richiede abilità di interpretazione per svelarne il contenuto." },
    { name: "Pluffa da Quidditch", caption: "Palla del Quidditch", model: "personaggi/harry_potter_quidditch_quaffle_ball.glb", description: "Palla principale usata durante il Quidditch, progettata per essere maneggiata dai cacciatori e usata per guadagnare punti segnando canestri." },
    { name: "Spada di Godric Grifondoro", caption: "Reliquia di Grifondoro", model: "personaggi/the_sword_of_godric_gryffindor.glb", description: "Antica spada forgiata con caratteristiche magiche che rispondono al coraggio; è un oggetto simbolico e potente nelle mani del suo prescelto." },
    { name: "Still Life Magico", caption: "Oggetto decorativo magico", model: "personaggi/wizardry_still_life.glb", description: "Composizione magica impiegata per decorazione o studio, spesso animata da incantesimi di movimento o cambiamento visivo." },
  ],

  incantesimi: [
    { name: "Expelliarmus", caption: "Incantesimo di disarmo", video: "personaggi/expelliarmus.mp4", description: "Formula di disarmo che rimuove la bacchetta dalle mani dell'avversario in modo rapido; ampiamente usata nella difesa personale. Una corretta esecuzione richiede concentrazione e intenzione di neutralizzare, non di ferire." },
    { name: "Wingardium Leviosa", caption: "Incantesimo di levitazione", video: "personaggi/wingardium_leviosa.mp4", description: "Incantesimo fondamentale per sollevare e spostare oggetti con precisione. Viene insegnato ai principianti per esercitare controllo e coordinazione nella manipolazione degli oggetti; la pronuncia corretta e il movimento della bacchetta sono essenziali." },
    { name: "Expecto Patronum", caption: "Incantesimo di protezione", video: "personaggi/expecto_patronum.mp4", description: "Incantesimo avanzato che evoca una figura luminosa (Patronus) capace di respingere creature oscure. Richiede la focalizzazione su ricordi positivi potenti e la disciplina emotiva per incanalare energia protettiva." }
  ],

  personaggiSecondari: [
    { name: "Lord Voldemort", caption: "Oscuro Signore", model: "personaggi/lord_voldemort.glb", description: "Figura potente e temuta che ha perseguito l'immortalità a qualsiasi costo; simbolo di magia oscura e manipolazione. La sua presenza incute timore e richiama eventi drammatici." },
    { name: "Bellatrix Lestrange", caption: "Seguace di Voldemort", model: "personaggi/bellatrix_lestrange.glb", description: "Seguace fanatica e pericolosa, nota per la sua ferocia e la devozione al leader oscuro. Le sue azioni sono improntate a violenza e disprezzo per le regole morali." },
    { name: "Lucius Malfoy", caption: "Mago purosangue e Mangiamorte", model: "personaggi/lucius_malfoy_cos_ps2.glb", description: "Membro di una famiglia influente, elegante e spesso freddo nei modi; Lucius esercita influenza sociale e mostra fedeltà a ideologie pericolose." },
    { name: "Mangiamorte", caption: "Seguace di Voldemort", model: "personaggi/death_eater.glb", description: "Termine collettivo per i seguaci del male: individui che abbracciano metodi e ideologie oscuri pur di ottenere potere e riconoscimento." },
    { name: "Molly Weasley", caption: "Membro della famiglia Weasley", model: "personaggi/molly_weasley_cos_gamecubexbox.glb", description: "Matriarca calorosa e protettiva, nota per la sua dedizione alla famiglia e per un carattere forte che sa farsi rispettare quando serve." },
    { name: "La Signora Grassa", caption: "Ritratto della Torre di Grifondoro", model: "personaggi/the_fat_lady.glb", description: "Ritratto vivente che parla e controlla l'accesso alla torre di Grifondoro; il suo ruolo combina guardia sociale e commento ironico sulle vicende della scuola." },
    { name: "Nymphadora Tonks", caption: "Auror e metamorfomagus", model: "personaggi/nymphadora_tonks.glb", description: "Capace di cambiare aspetto a volontà, Tonks combina abilità investigative con destrezza magica. Il suo atteggiamento vivace nasconde una forte professionalità nelle situazioni pericolose." },
    { name: "Statua del Cavaliere Guardiano", caption: "Elemento decorativo", model: "personaggi/pc_computer_-_harry_potter__the_philosophers_st.glb", description: "Statua animata che funge da guardiano per la Torre di Grifondoro, spesso coinvolta in enigmi e prove di coraggio." }
  ],

  trasporti: [
    { name: "Espresso per Hogwarts", caption: "Treno diretto a Hogwarts", model: "personaggi/hogwarts_express_-_the_jacobite_steam_train..glb", description: "Treno che trasporta generazioni di studenti all'inizio dell'anno scolastico; ambiente affollato, festoso e carico di aspettative per la nuova stagione." },
    { name: "Ford Anglia", caption: "Auto volante dei Weasley", model: "personaggi/car_ford_anglia.glb", description: "Auto magica in grado di volare, famosa per le sue apparizioni bizzarre e per l'uso creativo da parte della famiglia Weasley; spesso coinvolta in episodi avventurosi." },
    { name: "Nimbus 2000", caption: "Scopa volante di Harry", model: "personaggi/nimbus_2000.glb", description: "Modello di scopa adottato da cacciatori e giocatori di Quidditch; bilanciata per velocità e controllo, è un simbolo di abilità sportiva nel mondo magico." }
  ]
};

// --- GESTIONE DELL'INTERFACCIA UI ---

// Apre e chiude l'overlay principale dell'archivio (es. tramite una classe CSS 'hidden')
trigger.onclick = () => overlay.classList.toggle("hidden");
closeBtn.onclick = () => overlay.classList.add("hidden");

// Aggiunge un evento click a ciascuna categoria nel menu
categories.forEach(cat => {
  cat.onclick = () => {
    // Ottiene il tipo di dato dall'attributo data-cat HTML (es. data-cat="studenti")
    const type = cat.dataset.cat;
    // Aggiorna il titolo visibile a schermo
    contentTitle.innerText = cat.innerText;

    // Crea dinamicamente l'HTML per le schede in base ai dati della categoria scelta
    // Il metodo map() cicla gli array dentro l'oggetto `data` e crea delle card per ogni elemento.
    // L'uso degli operatori ternari `? :` serve per mostrare il bottone giusto a seconda che ci sia un .glb o un .mp4
    contentArea.innerHTML = data[type].map(item => `
      <div class="entry">
        <div class="name">${item.name}</div>
        <div class="caption">${item.caption}</div>
        ${item.description ? `<div class="description">${item.description}</div>` : ""}
        ${item.model ? `<button class="preview" data-type="model" data-src="${item.model}">Apri Modello</button>` : ""}
        ${item.video ? `<button class="preview" data-type="video" data-src="${item.video}">Guarda Incantesimo</button>` : ""}
      </div>
    `).join(""); // Trasforma l'array di stringhe HTML in una singola stringa per inserirla nel DOM
  };
});

// --- GESTIONE DELL'APERTURA DELLA MODALE (ANTEPRIMA MEDIA) ---

// Listener globale per intercettare i click sui bottoni di anteprima appena generati dinamicamente
document.addEventListener("click", e => {
  const btn = e.target.closest(".preview"); // Controlla se il click è avvenuto su un elemento con classe .preview
  if (!btn) return; // Se il click è su qualcos'altro, interrompe la funzione

  // Estrapola tipo (modello/video) e URL dal bottone cliccato
  const type = btn.dataset.type;
  const src = btn.dataset.src;

  // clear previous media - Resetta i visualizzatori per evitare sovrapposizioni e liberare memoria
  modelViewer.removeAttribute("src");
  mediaContainer.innerHTML = "";

  if (type === "model") {
    // Se è un modello 3D, inserisce semplicemente il link nel componente <model-viewer>
    modelViewer.setAttribute("src", src);
  } else if (type === "video") {
    // Se è un video, crea un nuovo elemento <video>
    // create video element inside the dedicated container
    const video = document.createElement("video");
    video.controls = true; // Mostra i controlli di riproduzione
    video.autoplay = true; // Fa partire il video da solo
    video.playsInline = true; // Necessario per iOS affinché non parta in fullscreen forzato
    video.innerHTML = `<source src="${src}" type="video/mp4">`;
  mediaContainer.appendChild(video);
  // Allow pointer events on media container when a video is present (permette all'utente di cliccare su play/pausa)
  mediaContainer.style.pointerEvents = 'auto';

    // Gestione delle policy restrittive dei browser sull'Autoplay (spesso bloccato se c'è l'audio attivo)
    // Some browsers block autoplay with sound; try to mute to allow autoplay
    video.muted = true; 
    const playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {
        // Autoplay prevented — show controls and leave it paused (se il browser blocca l'autoplay lo smuta e aspetta l'utente)
        video.muted = false;
      });
    }
  }

  // Mostra la modale rimuovendo la classe CSS che la nasconde
  modelModal.classList.remove("hidden");
});

// --- GESTIONE CHIUSURA DELLA MODALE ---

// CHIUDI MODELLO - Tramite il bottone [X]
closeModel.onclick = () => {
  modelModal.classList.add("hidden");
  // clear model and media so the viewer regains interactivity - Svuota l'HTML interno per fermare video/audio nascosti
  modelViewer.removeAttribute('src');
  mediaContainer.innerHTML = '';
  mediaContainer.style.pointerEvents = 'none'; // Disabilita i click sull'area video
};

// Chiude la modale cliccando fuori dalla finestra (sullo sfondo scuro)
modelBackdrop.onclick = () => {
  modelModal.classList.add("hidden");
  modelViewer.removeAttribute('src');
  mediaContainer.innerHTML = '';
  mediaContainer.style.pointerEvents = 'none';
};

// upload UI removed — no upload handlers