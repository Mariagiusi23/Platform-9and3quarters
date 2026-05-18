// Dichiarazione della variabile per il motore MLC, inizialmente nulla
let CreateMLCEngine = null;

// Numero massimo di domande standard prima di tentare una conclusione
const MAX_QUESTIONS = 18;
// Numero di domande aggiuntive in caso di recupero dopo un errore
const RECOVERY_QUESTIONS = 6;
// Numero massimo di round di recupero consentiti
const MAX_RECOVERY_ROUNDS = 2;
// Identificativo del modello AI Llama da utilizzare tramite WebLLM
const MODEL_ID = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
// Mappatura delle etichette testuali per i valori delle risposte
const ANSWER_LABELS = { yes:"Sì", no:"No", maybe:"Forse", unknown:"Non lo so" };
// Mappatura delle etichette per le tipologie di entità nel database
const TYPE_LABELS = { personaggio:"Personaggio", creatura:"Creatura", oggetto:"Oggetto", luogo:"Luogo", incantesimo:"Incantesimo", pozione:"Pozione" };

// Variabile per l'istanza del motore AI
let engine = null;
// Flag per indicare se l'AI è stata caricata e abilitata
let aiEnabled = false;
// Array che memorizza la cronologia delle risposte dell'utente
let answers = [];
// Set per tenere traccia degli ID delle domande già poste
let asked = new Set();
// Variabile per memorizzare la domanda attualmente visualizzata
let currentQuestion = null;
// Variabile per memorizzare l'ultimo oggetto risultato proposto
let lastResult = null;
// Set per forzare l'esclusione di determinati tipi in base alle risposte
let forcedExcludedTypes = new Set();
// Variabile per forzare l'inclusione di un tipo specifico
let forcedIncludedType = null;
// Set per memorizzare i nomi dei risultati già rifiutati dall'utente
let rejectedGuesses = new Set();
// Contatore dei round di recupero effettuati
let recoveryRounds = 0;
// Flag per controllare la visibilità delle opzioni alternative
let alternativesVisible = false;
// Conteggio delle alternative rifiutate (non usato direttamente nel flusso principale)
let rejectedAlternativesCount = 0;
// Contatore degli errori commessi dall'AI nell'indovinare
let wrongGuessCount = 0;
// Numero massimo di tentativi errati prima della resa
const MAX_WRONG_GUESSES = 3;

// Funzione helper per abbreviare document.getElementById
const $ = id => document.getElementById(id);

// Definizione di gruppi di tag mutuamente esclusivi
const exclusiveGroups = [
  ["personaggio","creatura","oggetto_magico","luogo","incantesimo","pozione"],
  ["maschio","femmina"],
  ["grifondoro","serpeverde","corvonero","tassorosso"],
  ["vivo","morto"],
  ["buono","malvagio","ambiguo"]
];

// Array di domande strategiche predefinite con priorità per filtrare il database
const strategicQuestions = [
  { id:"creatura", text:"È una creatura o un animale magico?", tag:"creatura", priority:11 },
  { id:"oggetto_magico", text:"È soprattutto un oggetto magico o uno strumento?", tag:"oggetto_magico", priority:11 },
  { id:"luogo", text:"È un luogo del mondo magico?", tag:"luogo", priority:11 },
  { id:"incantesimo", text:"È un incantesimo o una magia pronunciabile?", tag:"incantesimo", priority:11 },
  { id:"pozione", text:"È una pozione o una preparazione magica?", tag:"pozione", priority:11 },
  { id:"hogwarts", text:"È fortemente collegato a Hogwarts?", tag:"hogwarts", priority:8 },
  { id:"fantasma", text:"È un fantasma o qualcosa legato alla morte?", tag:"fantasma", priority:6 },
  { id:"drago", text:"Ha a che fare con un drago?", tag:"drago", priority:6 },
  { id:"gufo", text:"È o coinvolge un gufo?", tag:"gufo", priority:6 },
  { id:"mappa", text:"Serve a localizzare persone o luoghi?", tag:"mappa", priority:6 },
  { id:"scopa", text:"È collegato a una scopa volante?", tag:"scopa", priority:6 },
  { id:"specchio", text:"È collegato a uno specchio o a una visione?", tag:"specchio", priority:5 },
  { id:"memoria", text:"È collegato ai ricordi o alla memoria?", tag:"memoria", priority:5 },
  { id:"fuoco", text:"È collegato al fuoco?", tag:"fuoco", priority:5 },
  { id:"protettivo", text:"Serve principalmente a proteggere o difendere?", tag:"protettivo", priority:5 },
  { id:"trasformazione", text:"Ha a che fare con trasformazioni o cambio d'identità?", tag:"trasformazione", priority:5 }
];

// Chiamata alla funzione di inizializzazione all'avvio dello script
init();

// Gestore globale degli errori per fornire feedback all'utente in caso di file mancanti
window.addEventListener("error", event => {
  console.error(event.error || event.message);
  const status = $("aiStatus");
  if(status){
    status.textContent = "Errore rilevato: controlla che database.js, database_extra.js, style.css e script.js siano nella stessa cartella.";
  }
});

// Funzione principale di inizializzazione dell'applicazione
function init(){
  hydrateDatabase();
  hydrateQuestions();
  wireEvents();
  updateDbStats();
  renderCandidates();
}

// Associa i listener degli eventi agli elementi del DOM
function wireEvents(){
  $("loadAI")?.addEventListener("click", loadAI);
  $("backBtn")?.addEventListener("click", undoAnswer);
  $("restartBtn")?.addEventListener("click", resetToStart);
  $("okBtn")?.addEventListener("click", () => {
  $("feedback").textContent = "Perfetto: lettura riuscita. La partita è stata completata.";
  $("okBtn").disabled = true;
  goToEndScreen();
});
  $("retryBtn")?.addEventListener("click", () => feedback(false));
  $("newGameBtn")?.addEventListener("click", resetToStart);
  $("reviewBtn")?.addEventListener("click", reviewAnswers);

  document.querySelectorAll("[data-answer]").forEach(btn => {
    btn.addEventListener("click", () => answer(btn.dataset.answer));
  });
}

// Funzione asincrona per caricare il motore AI nel browser
async function loadAI(){
  if(engine){
    aiEnabled = true;
    startGame();
    return;
  }

  $("loadAI").disabled = true;
  $("loadPanel").classList.remove("hidden");

  if(!navigator.gpu){
    activateLogicAI("WebGPU non è disponibile: uso comunque un motore AI locale basato sul database, senza API e senza backend.");
    return;
  }

  setLoadProgress(3, "Preparazione del modello AI locale...");

  try{
    if(!CreateMLCEngine){
      setLoadProgress(5, "Caricamento libreria WebLLM...");
      const webllm = await import("https://esm.run/@mlc-ai/web-llm");
      CreateMLCEngine = webllm.CreateMLCEngine;
    }

    engine = await CreateMLCEngine(MODEL_ID, {
      initProgressCallback: p => {
        setLoadProgress(
          Math.max(6, Math.round((p.progress || 0) * 100)),
          p.text || "Caricamento modello..."
        );
      }
    });

    aiEnabled = true;
    setLoadProgress(100, "AI WebLLM caricata. Inizio partita...");
    startGame();

  }catch(err){
    console.error(err);
    activateLogicAI("WebLLM non è riuscito a caricarsi: attivo il motore AI locale di emergenza basato sul database.");
  }
}

// Attiva la modalità fallback senza WebLLM, usando solo la logica del database
function activateLogicAI(message){
  engine = null;
  aiEnabled = true;
  setLoadProgress(100, message);

  if($("modePill")){
    $("modePill").textContent = "AI locale database";
  }

  setTimeout(() => startGame(), 250);
}

// Esporta la funzione startGame globalmente e ne definisce la logica
window.startGame = startGame;
function startGame(){
  if(!aiEnabled){
    $("aiStatus").textContent = "Prima avvia l’AI locale. Se WebLLM non parte, userò il motore AI locale basato sul database.";
    return;
  }

  aiEnabled = true;
  answers = [];
  asked = new Set();
  forcedExcludedTypes = new Set();
  forcedIncludedType = null;
  rejectedGuesses = new Set();
  recoveryRounds = 0;
  alternativesVisible = false;
  wrongGuessCount = 0;
  currentQuestion = null;
  lastResult = null;

  $("start").classList.add("hidden");
  $("result").classList.add("hidden");
  $("thinking").classList.add("hidden");
  $("quiz").classList.remove("hidden");

  $("okBtn").disabled = false;
  $("modePill").textContent = engine ? "AI" : "AI: database" ;

  nextQuestion();
}

// Esporta la funzione answer globalmente e gestisce la risposta dell'utente
window.answer = answer;
function answer(value){
  if(!currentQuestion) return;

  answers.push({
    id: currentQuestion.id,
    tag: currentQuestion.tag,
    question: currentQuestion.text,
    answer: value
  });

  asked.add(currentQuestion.id);
  applyAnswerConstraints(currentQuestion, value);

  const scored = scoreDatabase();
  updateDashboard(scored);

  if(answers.length >= getQuestionLimit() || confidenceReady()){
    finishWithAI();
  }else{
    nextQuestion();
  }
}

// Rimuove l'ultima risposta data e aggiorna lo stato del gioco
function undoAnswer(){
  if(!answers.length) return;

  answers.pop();
  rebuildAskedAndConstraints();

  $("result").classList.add("hidden");
  $("quiz").classList.remove("hidden");

  nextQuestion();
}

// Resetta completamente il gioco allo stato iniziale
function resetToStart(){
  answers = [];
  asked = new Set();
  forcedExcludedTypes = new Set();
  forcedIncludedType = null;
  rejectedGuesses = new Set();
  recoveryRounds = 0;
  alternativesVisible = false;
  wrongGuessCount = 0;
  currentQuestion = null;

  $("quiz").classList.add("hidden");
  $("thinking").classList.add("hidden");
  $("result").classList.add("hidden");
  $("start").classList.remove("hidden");

  $("loadAI").disabled = false;
  $("okBtn").disabled = false;
  $("loadAI").textContent = aiEnabled ? "Gioca di nuovo con AI" : "Carica AI e gioca";
  $("aiStatus").textContent = aiEnabled ? "AI pronta: puoi ricominciare subito." : "Pronto: carica l’AI locale per iniziare.";

  restoreResultButtons();

  renderHistory();
  renderCandidates();
  updateProgress();
}

// Pulisce lo stato e mostra la schermata iniziale dopo una vittoria
function goToEndScreen(){
  window.pfAwardGameWin?.('legilimanzia', {
    onSuccess: (_data, message) => {
      const status = $("aiStatus");
      if(status) status.textContent = "Bravo! " + message + " Vuoi iniziare un'altra partita?";
    }
  });

  answers = [];
  asked = new Set();
  forcedExcludedTypes = new Set();
  forcedIncludedType = null;
  rejectedGuesses = new Set();
  recoveryRounds = 0;
  alternativesVisible = false;
  wrongGuessCount = 0;
  currentQuestion = null;
  lastResult = null;

  $("quiz").classList.add("hidden");
  $("thinking").classList.add("hidden");
  $("result").classList.add("hidden");
  $("start").classList.remove("hidden");

  $("loadAI").disabled = false;
  $("loadAI").textContent = "Inizia un'altra partita";
  $("aiStatus").textContent = "Bravo! Ho indovinato. Vuoi iniziare un'altra partita?";

  $("loadPanel").classList.add("hidden");

  restoreResultButtons();

  renderHistory();
  renderCandidates();
  updateProgress();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Applica restrizioni logiche (esclusioni) basate sulla risposta data
function applyAnswerConstraints(question, value){
  const genderOpposite = {
    maschio: "femmina",
    femmina: "maschio"
  };

  if(value === "yes"){
    exclusiveGroups.forEach(group => {
      if(group.includes(question.id)){
        group.forEach(id => {
          if(id !== question.id){
            asked.add(id);
          }
        });
      }
    });

    if(["personaggio","creatura","luogo","incantesimo","pozione"].includes(question.tag)){
      forcedIncludedType = question.tag;
    }

    if(question.tag === "oggetto_magico"){
      forcedIncludedType = "oggetto";
    }
  }

  if(value === "no" && genderOpposite[question.id]){
    asked.add(genderOpposite[question.id]);
  }

  if(value === "no"){
    if(question.tag === "personaggio") forcedExcludedTypes.add("personaggio");
    if(question.tag === "creatura") forcedExcludedTypes.add("creatura");
    if(question.tag === "luogo") forcedExcludedTypes.add("luogo");
    if(question.tag === "incantesimo") forcedExcludedTypes.add("incantesimo");
    if(question.tag === "pozione") forcedExcludedTypes.add("pozione");
    if(question.tag === "oggetto_magico") forcedExcludedTypes.add("oggetto");
  }
}

// Ricostruisce i vincoli logici da zero analizzando tutto l'array delle risposte
function rebuildAskedAndConstraints(){
  asked = new Set();
  forcedExcludedTypes = new Set();
  forcedIncludedType = null;

  answers.forEach(a => {
    asked.add(a.id);
    applyAnswerConstraints({ id:a.id, tag:a.tag }, a.answer);
  });
}

// Seleziona e visualizza la domanda successiva
function nextQuestion(){
  const scored = scoreDatabase();
  currentQuestion = chooseBestQuestion(scored);

  if(!currentQuestion){
    return finishWithAI();
  }

  $("status").textContent = `Domanda ${answers.length + 1} di ${getQuestionLimit()}`;
  $("question").textContent = currentQuestion.text;
  $("aiHint").textContent = buildQuestionHint(currentQuestion, scored);

  updateDashboard(scored);
}

// Calcola il punteggio di ogni elemento nel database in base alle risposte fornite
function scoreDatabase(){
  const normalizedAnswers = answers.map(a => ({
    ...a,
    tag: normalizeTag(a.tag)
  }));

  return globalThis.DATABASE.map(item => {
    const tags = new Set([item.type, ...(item.tags || [])].map(normalizeTag));

    let score = 0;
    const matched = [];
    const contradicted = [];

    normalizedAnswers.forEach(a => {
      const has = tags.has(a.tag);

      if(a.answer === "yes"){
        score += has ? 8 : -8;
        has ? matched.push(a.tag) : contradicted.push(a.tag);
      }

      if(a.answer === "no"){
        score += has ? -7 : 2.1;
        if(has) contradicted.push(a.tag);
      }

      if(a.answer === "maybe"){
        score += has ? 3 : -0.7;
        if(has) matched.push(a.tag);
      }

      if(a.tag === "femmina" && a.answer === "yes" && tags.has("maschio")){
        score -= 50;
      }

      if(a.tag === "maschio" && a.answer === "yes" && tags.has("femmina")){
        score -= 50;
      }

      if(a.tag === "femmina" && a.answer === "no" && tags.has("femmina")){
        score -= 50;
      }

      if(a.tag === "maschio" && a.answer === "no" && tags.has("maschio")){
        score -= 50;
      }
    });

    if(item.tags.includes("principale")) score += 0.9;
    if(item.tags.includes("importante")) score += 0.55;

    if(forcedIncludedType && item.type !== forcedIncludedType){
      score -= 14;
    }

    if(forcedExcludedTypes.has(item.type)){
      score -= 14;
    }

    if(rejectedGuesses.has(item.name.toLowerCase())){
      score -= 999;
    }

    return {
      ...item,
      score,
      matched,
      contradicted
    };
  }).sort((a,b) => b.score - a.score);
}

// Sceglie la domanda più efficace per restringere il campo dei candidati
function chooseBestQuestion(scored){
  const candidates = scored
    .filter(x => x.score > scored[0].score - 32)
    .slice(0, 24);

  const possible = globalThis.QUESTIONS
    .filter(q => !asked.has(q.id))
    .map(q => {
      let yesWeight = 0;
      let noWeight = 0;

      candidates.forEach((item, index) => {
        const tags = new Set([item.type, ...(item.tags || [])].map(normalizeTag));
        const weight = Math.max(1, 24 - index) + Math.max(0, item.score / 4);

        if(tags.has(q.tag)){
          yesWeight += weight;
        }else{
          noWeight += weight;
        }
      });

      const total = yesWeight + noWeight;
      const balance = total ? 1 - Math.abs(yesWeight - noWeight) / total : 0;
      const separates = yesWeight > 0 && noWeight > 0;

      const earlyBoost =
        answers.length < 4 &&
        ["personaggio","creatura","oggetto_magico","luogo","incantesimo","pozione"].includes(q.tag)
          ? 18
          : 0;

      return {
        ...q,
        infoScore: (separates ? balance * 100 : 0) + (q.priority || 1) + earlyBoost,
        yesWeight,
        noWeight
      };
    })
    .filter(q => q.infoScore > 0);

  return possible.sort((a,b) => b.infoScore - a.infoScore)[0]
    || globalThis.QUESTIONS.find(q => !asked.has(q.id))
    || null;
}

// Verifica se la differenza di punteggio tra i primi due candidati è sufficiente per concludere
function confidenceReady(){
  if(answers.length < 8) return false;

  const scored = scoreDatabase();
  const gap = (scored[0]?.score || 0) - (scored[1]?.score || 0);

  return gap >= 20 && scored[0].matched.length >= 4;
}

// Conclude la partita utilizzando l'AI per generare una motivazione o il database come fallback
async function finishWithAI(){
  $("quiz").classList.add("hidden");
  $("thinking").classList.remove("hidden");

  const ranked = scoreDatabase();

  updateDashboard(ranked);

  const candidates = ranked.slice(0, 8).map(x => ({
    name: x.name,
    type: x.type,
    tags: x.tags,
    score: Math.round(x.score * 10) / 10,
    matched: x.matched,
    contradicted: x.contradicted
  }));

  const best = ranked[0];

  if(!engine){
    return showResult(
      best,
      buildLocalReason(best) + " Decisione presa dal motore AI locale di emergenza, usando ranking e coerenza delle risposte.",
      confidenceFromScores(ranked)
    );
  }

  const prompt =
    `Sei il decisore centrale di un gioco stile Akinator ambientato nel mondo di Harry Potter.\n` +
    `Il ranking locale è la fonte di verità.\n` +
    `Devi scegliere ESATTAMENTE il primo candidato della lista.\n` +
    `Il nome scelto deve essere: "${best.name}".\n` +
    `Non devi scegliere altri candidati anche se ti sembrano plausibili.\n` +
    `Non inventare nomi.\n` +
    `Scrivi solo una motivazione coerente con le risposte dell'utente.\n` +
    `Rispondi SOLO con JSON valido: {"name":"${best.name}","reason":"...","confidence":80}.\n\n` +
    `Risposte utente:\n${JSON.stringify(answers, null, 2)}\n\n` +
    `Candidati ordinati:\n${candidates.map((c,i) =>
      `${i+1}. ${c.name} | tipo=${c.type} | score=${c.score} | match=${c.matched.join(",")} | contro=${c.contradicted.join(",")} | tag=${c.tags.join(",")}`
    ).join("\n")}`;

  for(let attempt = 0; attempt < 2; attempt++){
    try{
      const reply = await engine.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Sei un classificatore rigoroso. Devi confermare il primo candidato fornito e restituire solo JSON valido."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.03,
        max_tokens: 220
      });

      const parsed = parseAIResponse(reply.choices?.[0]?.message?.content || "");

      return showResult(
        best,
        parsed?.reason || buildLocalReason(best),
        clampNumber(parsed?.confidence || confidenceFromScores(ranked), 50, 98)
      );

    }catch(err){
      console.error("AI final failed", err);
    }
  }

  return showResult(
    best,
    "Uso il ranking più coerente con le tue risposte.",
    confidenceFromScores(ranked)
  );
}

// Verifica se la scelta fatta dall'AI è coerente con i dati del database
function validateAIChoice(name, ranked){
  const exact = ranked.find(x => x.name.toLowerCase() === String(name || "").trim().toLowerCase());

  if(!exact) return null;

  const index = ranked.indexOf(exact);

  if(index <= 4) return exact;

  return exact.matched.length >= 3 && exact.contradicted.length <= 1 ? exact : null;
}

// Estrae l'oggetto JSON dalla stringa di risposta testuale dell'AI
function parseAIResponse(text){
  const match = String(text || "").match(/\{[\s\S]*\}/);

  if(!match) return null;

  try{
    const parsed = JSON.parse(match[0]);
    return parsed?.name ? parsed : null;
  }catch{
    return null;
  }
}

// Mostra la schermata finale con il risultato indovinato
function showResult(item, reason, confidence){
  lastResult = item;
  alternativesVisible = false;

  $("quiz").classList.add("hidden");
  $("thinking").classList.add("hidden");
  $("result").classList.remove("hidden");

  restoreResultButtons();

  $("resultName").textContent = item.name;

  const img = $("resultImage");
  setSmartImage(img, item.image, item.name);

  $("resultReason").textContent = `Sicurezza stimata: ${confidence || "?"}%. ${reason || ""}`;

  $("resultBadges").innerHTML = [item.type, ...(item.tags || []).slice(0,7)]
    .map(t => `<span class="tag-badge">${readableTag(t)}</span>`)
    .join("");

  hideAlternativeAnswers();
  clearFinalImages();

  $("retryBtn").textContent = "No, mostra alternative ❌";

  $("feedback").textContent = hasUsableImage(item.image)
    ? ""
    : "Non ho trovato una foto valida per questa voce nel database.";
}

// Gestisce il feedback dell'utente (se l'AI ha indovinato o meno)
window.feedback = feedback;
function feedback(ok){
  if(ok){
    $("feedback").textContent = "Perfetto: lettura riuscita. La partita è stata completata.";
    hideAlternativeAnswers();
    $("retryBtn").textContent = "No, continua ❌";
    return;
  }

  wrongGuessCount += 1;

  if(wrongGuessCount >= MAX_WRONG_GUESSES){
    showGiveUpScreen();
    return;
  }

  if(!alternativesVisible){
    showAlternativesAfterWrongGuess();
    return;
  }

  continueAfterWrongGuess();
}

// Prosegue il gioco dopo un errore, aggiungendo domande di recupero
function continueAfterWrongGuess(){
  if(lastResult){
    rejectedGuesses.add(lastResult.name.toLowerCase());
  }

  if(recoveryRounds < MAX_RECOVERY_ROUNDS){
    recoveryRounds += 1;
  }

  alternativesVisible = false;

  $("retryBtn").textContent = "No, continua ❌";
  $("feedback").textContent = `Ok: faccio altre ${RECOVERY_QUESTIONS} domande mirate e scarto la risposta appena proposta. Tentativi sbagliati: ${wrongGuessCount}/${MAX_WRONG_GUESSES}.`;

  setTimeout(() => {
    $("result").classList.add("hidden");
    $("thinking").classList.add("hidden");
    $("quiz").classList.remove("hidden");
    currentQuestion = null;
    nextQuestion();
  }, 550);
}

// Permette all'utente di tornare indietro per rivedere le domande
function reviewAnswers(){
  $("result").classList.add("hidden");
  $("thinking").classList.add("hidden");
  $("quiz").classList.remove("hidden");

  currentQuestion = null;

  nextQuestion();
}

// Imposta un'entità alternativa scelta dall'utente come risultato corrente
window.acceptAlternative = acceptAlternative;
function acceptAlternative(name){
  const picked = globalThis.DATABASE.find(x => x.name === name);

  if(!picked) return;

  lastResult = picked;
  alternativesVisible = false;

  $("resultName").textContent = picked.name;

  setSmartImage($("resultImage"), picked.image, picked.name);

  $("resultReason").textContent = "Hai selezionato questa risposta tra le alternative più probabili. Conferma se è corretta oppure chiedimi altre alternative.";

  $("resultBadges").innerHTML = [picked.type, ...(picked.tags || []).slice(0,7)]
    .map(t => `<span class="tag-badge">${readableTag(t)}</span>`)
    .join("");

  hideAlternativeAnswers();
  clearFinalImages();

  $("retryBtn").textContent = "No, mostra alternative ❌";

  $("feedback").textContent = hasUsableImage(picked.image)
    ? ""
    : "Non ho trovato una foto valida per questa voce nel database.";
}

// Aggiorna tutti gli elementi visivi del cruscotto di debug e stato
function updateDashboard(scored = scoreDatabase()){
  updateProgress();
  renderHistory();
  renderCandidates(scored);

  $("askedCount").textContent = answers.length;

  $("confidenceMini").textContent = answers.length === 0
    ? "—"
    : `${confidenceFromScores(scored)}%`;

  $("backBtn").disabled = answers.length === 0;
}

// Visualizza la cronologia delle domande e risposte nella barra laterale
function renderHistory(){
  const list = $("historyList");

  if(!list) return;

  list.innerHTML = answers.length
    ? answers.map((a,i) => `<li><b>${i+1}. ${ANSWER_LABELS[a.answer]}</b><br>${a.question}</li>`).join("")
    : `<li>Nessuna risposta ancora.</li>`;
}

// Mostra i 5 candidati più probabili in tempo reale
function renderCandidates(scored = scoreDatabase()){
  const box = $("candidateList");

  if(!box) return;

  if(answers.length === 0){
    box.innerHTML = `<article class="candidate"><small>Rispondi alla prima domanda per vedere i candidati più probabili.</small></article>`;
    return;
  }

  const top = scored.slice(0,5);
  const best = Math.max(1, top[0]?.score || 1);

  box.innerHTML = top.map(item => {
    const pct = Math.max(6, Math.min(100, Math.round((item.score / best) * 100)));

    return `
      <article class="candidate">
        <div class="candidate-top">
          <span class="candidate-name">${item.name}</span>
          <span class="candidate-score">${Math.round(item.score)}</span>
        </div>
        <small>
          ${TYPE_LABELS[item.type] || readableTag(item.type)}
          • match: ${item.matched.slice(0,3).map(readableTag).join(", ") || "in valutazione"}
        </small>
        <div class="bar-mini">
          <span style="width:${pct}%"></span>
        </div>
      </article>
    `;
  }).join("");
}

// Visualizza una lista di alternative se l'utente dice che l'AI ha sbagliato
function showAlternativesAfterWrongGuess(){
  if(lastResult){
    rejectedGuesses.add(lastResult.name.toLowerCase());
  }

  alternativesVisible = true;

  renderAlternativeAnswers(lastResult);

  $("retryBtn").textContent = "Continua con altre domande";
  $("feedback").textContent = `Risposta scartata (${wrongGuessCount}/${MAX_WRONG_GUESSES}). Ti mostro le altre risposte più probabili. Puoi sceglierne una oppure continuare con altre domande.`;
}

// Mostra la schermata di resa dove l'utente può inserire la risposta corretta
function showGiveUpScreen(){
  alternativesVisible = false;

  hideAlternativeAnswers();
  clearFinalImages();

  $("resultName").textContent = "Mi arrendo! 🏳️";
  $("resultReason").textContent = "Non riesco a capire, ma voglio sapere chi o che cosa era: scrivi il nome qui sotto.";
  $("resultBadges").innerHTML = "";

  // Show the input form
  const formBox = $("giveUpForm");
  if(formBox){
    formBox.classList.remove("hidden");
  }

  $("okBtn").style.display = "none";
  $("retryBtn").style.display = "none";
  $("reviewBtn").style.display = "none";

  // Handle form submission
  const userInput = $("userAnswer");
  const submitBtn = $("submitAnswerBtn");

  if(userInput && submitBtn){
    userInput.value = "";
    userInput.focus();

    const handleSubmit = () => {
      const answer = userInput.value.trim();
      if(!answer) return;

      showUserWonScreen(answer);
    };

    submitBtn.onclick = handleSubmit;
    userInput.onkeypress = (e) => {
      if(e.key === "Enter") handleSubmit();
    };
  }

  $("feedback").textContent = "📖 Chi o che cosa stavi pensando?";
}

// Mostra il messaggio finale quando l'utente vince
function showUserWonScreen(userAnswer){
  const formBox = $("giveUpForm");
  if(formBox){
    formBox.classList.add("hidden");
  }

  $("resultName").textContent = userAnswer;
  $("resultReason").textContent = "Ah interessante, mi hai battuto! 🎯";
  $("resultBadges").innerHTML = "";

  $("okBtn").style.display = "none";
  $("retryBtn").style.display = "none";
  $("reviewBtn").style.display = "none";
  $("newGameBtn").style.display = "inline-flex";

  $("feedback").textContent = "Grazie per aver giocato! Premi ‘Nuova partita’ per riprovare.";
  window.pfAwardGameWin?.('legilimanzia', {
    onSuccess: (_data, message) => {
      $("feedback").textContent = message + " Premi ‘Nuova partita’ per riprovare.";
    }
  });
}

// Ripristina la visibilità dei pulsanti di controllo nel pannello risultati
function restoreResultButtons(){
  const okBtn = $("okBtn");
  const retryBtn = $("retryBtn");
  const reviewBtn = $("reviewBtn");
  const newGameBtn = $("newGameBtn");

  if(okBtn){
    okBtn.style.display = "inline-flex";
    okBtn.textContent = "Sì, hai indovinato 🎯";
    okBtn.disabled = false;
  }

  if(retryBtn){
    retryBtn.style.display = "inline-flex";
    retryBtn.textContent = "No, continua ❌";
  }

  if(reviewBtn){
    reviewBtn.style.display = "inline-flex";
  }

  if(newGameBtn){
    newGameBtn.style.display = "inline-flex";
  }

  const formBox = $("giveUpForm");
  if(formBox){
    formBox.classList.add("hidden");
  }
}

// Svuota il contenitore delle risposte alternative
function hideAlternativeAnswers(){
  const box = $("alternativeAnswers");

  if(box){
    box.innerHTML = "";
  }
}

// Svuota il contenitore delle immagini finali (non utilizzato nel codice corrente)
function clearFinalImages(){
  const box = $("finalImages");

  if(box){
    box.innerHTML = "";
  }
}

// Genera e visualizza le schede cliccabili per i candidati alternativi
function renderAlternativeAnswers(winner){
  const box = $("alternativeAnswers");

  if(!box || !winner) return;

  const picks = scoreDatabase()
    .filter(x => x.name !== winner.name && !rejectedGuesses.has(x.name.toLowerCase()))
    .slice(0, 6);

  if(!picks.length){
    box.innerHTML = "";
    return;
  }

  box.innerHTML = `
    <p class="gallery-title">
      Se non è ${escapeHtml(winner.name)}, potrebbe essere una di queste risposte? Se si cliccala!
    </p>
    <div class="alternative-grid">
      ${picks.map((item, index) => `
        <button type="button" class="alternative-card" data-alt-index="${index}">
          ${hasUsableImage(item.image) ? `<img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" loading="lazy">` : ""}
          <span>${escapeHtml(item.name)}</span>
          <small>${TYPE_LABELS[item.type] || readableTag(item.type)}</small>
        </button>
      `).join("")}
    </div>
  `;

  box.querySelectorAll(".alternative-card").forEach(btn => {
    const picked = picks[Number(btn.dataset.altIndex)];

    btn.addEventListener("click", () => acceptAlternative(picked.name));

    const img = btn.querySelector("img");

    if(img){
      img.onerror = () => img.remove();
    }
  });
}

// Funzione predisposta per renderizzare immagini finali (correntemente vuota)
function renderFinalImages(winner){
  const box = $("finalImages");

  box.innerHTML = "";

  const picks = scoreDatabase()
    .filter(x => hasUsableImage(x.image) && x.name !== winner.name && !rejectedGuesses.has(x.name.toLowerCase()))
    .slice(0,3);
}

// Controlla se una stringa sorgente di un'immagine è valida
function hasUsableImage(src){
  return typeof src === "string" && src.trim().length > 0;
}

// Gestisce il caricamento intelligente dell'immagine con tentativi di fallback su percorsi locali
function setSmartImage(img, src, alt){
  if(!img) return;

  img.removeAttribute("src");
  img.alt = "";
  img.classList.remove("is-loaded");
  img.style.display = "none";

  const feedbackEl = $("feedback");

  if(!hasUsableImage(src)){
    if(feedbackEl) feedbackEl.textContent = "Immagine mancante nel database.";
    return;
  }

  // Costruisco una lista di candidate da provare: l'originale, poi possibili fallback locali
  const raw = String(src || "").trim();
  const candidates = [];

  if(raw) candidates.push(raw);

  try{
    // Se è un URL, estraggo il basename e provo immagini/<basename>
    const u = new URL(raw, location.href);
    const parts = u.pathname.split("/");
    const base = parts.pop() || parts.pop();
    if(base){
      candidates.push(`immagini/${base}`);
      candidates.push(`./immagini/${base}`);
    }
  }catch(e){
    // Non è un URL: potrebbe essere solo il nome del file o un percorso relativo
    const base = raw.split("/").pop();
    if(!raw.startsWith("immagini/") && !raw.startsWith("./immagini/") && !raw.startsWith("/")){
      candidates.push(`immagini/${raw}`);
      if(base && base !== raw) candidates.push(`./immagini/${base}`);
    }
  }

  // Rimuovo duplicati e valori falsy
  const uniq = [...new Set(candidates)].filter(Boolean);

  let attempt = 0;

  img.onload = () => {
    img.style.display = "block";
    requestAnimationFrame(() => img.classList.add("is-loaded"));
    if(feedbackEl) feedbackEl.textContent = "";
    console.log("Immagine caricata:", img.src);
  };

  img.onerror = () => {
    attempt += 1;
    if(attempt < uniq.length){
      // provo il prossimo candidate
      const next = uniq[attempt];
      console.warn("Immagine non caricata, provo fallback:", next);
      img.alt = alt || "Risultato";
      img.src = next;
      return;
    }

    // Tutti i tentativi falliti, ma mostro comunque lo spazio con feedback
    console.error("Immagine non caricata, tentativi:", uniq);
    img.removeAttribute("src");
    img.alt = "";
    img.style.display = "none";
    img.classList.remove("is-loaded");

    if(feedbackEl) feedbackEl.textContent = `La foto esiste nel database, ma non si carica. Ho tentato: ${uniq.join(", ")}`;
  };

  img.alt = alt || "Risultato";
  // Imposto il src e assicuro che l'elemento sia visibile anche se il caricamento è lento
  img.src = uniq[0];
  
  // Forzo il display:block subito, così se l'immagine è in cache, appare istantaneamente
  // e se no, appare comunque quando arriva l'evento onload
  img.style.display = "block";
}

// Esegue l'escaping dei caratteri speciali HTML per evitare XSS
function escapeHtml(value){
  return String(value ?? "").replace(/[&<>'"]/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    "'":"&#39;",
    "\"":"&quot;"
  }[c]));
}

// Versione alias di escapeHtml per gli attributi HTML
function escapeAttr(value){
  return escapeHtml(value);
}

// Ritorna la stringa così com'è (non esegue vero escape, agisce da placeholder)
function escapeJsAttr(value){
  return String(value ?? "");
}

// Crea un suggerimento testuale basato sui primi candidati attuali
function buildQuestionHint(q, scored){
  const topNames = scored.slice(0,3).map(x => x.name).join(", ");
  return `Sto distinguendo tra: ${topNames}.`;
}

// Costruisce una spiegazione testuale del perché l'elemento è stato scelto
function buildLocalReason(best){
  const matched = best.matched.slice(0,5).map(readableTag).join(", ");
  const contradicted = best.contradicted.slice(0,3).map(readableTag).join(", ");

  return `Combacia soprattutto con: ${matched || "le risposte più importanti"}.${contradicted ? ` Contrasti minori: ${contradicted}.` : ""}`;
}

// Calcola la percentuale di confidenza basata sullo scarto di punteggio tra i primi due candidati
function confidenceFromScores(scored){
  if(answers.length === 0) return 0;

  const best = scored[0];
  const second = scored[1];

  if(!best) return 0;

  const gap = second ? best.score - second.score : best.score;

  return Math.max(
    20,
    Math.min(
      96,
      Math.round(35 + gap * 1.45 + best.matched.length * 6 - best.contradicted.length * 3)
    )
  );
}

// Aggiorna visivamente la barra di avanzamento delle domande
function updateProgress(){
  const p = $("progress");

  if(p){
    p.style.width = `${Math.min((answers.length / getQuestionLimit()) * 100, 100)}%`;
  }
}

// Restituisce il numero totale di domande previste, inclusi i round di recupero
function getQuestionLimit(){
  return MAX_QUESTIONS + recoveryRounds * RECOVERY_QUESTIONS;
}

// Aggiorna l'interfaccia durante il caricamento del modello AI
function setLoadProgress(percent, message){
  const value = Math.max(0, Math.min(100, percent || 0));

  $("loadProgress").style.width = `${value}%`;
  $("loadPercent").textContent = `${value}%`;
  $("loadText").textContent = message;
  $("aiStatus").textContent = message;
}

// Normalizza e pulisce i dati contenuti nel database globale
function hydrateDatabase(){
  if(typeof globalThis.DATABASE === "undefined" || !Array.isArray(globalThis.DATABASE)){
    throw new Error("DATABASE non trovato: controlla che database.js sia caricato prima di script.js");
  }

  const seen = new Set();

  globalThis.DATABASE.forEach(item => {
    item.type = normalizeTag(item.type || "personaggio");

    item.tags = [...new Set([item.type, ...(item.tags || [])].map(normalizeTag).filter(Boolean))];

    if(item.type === "oggetto" && !item.tags.includes("oggetto_magico")){
      item.tags.push("oggetto_magico");
    }

    if(item.type === "luogo" && !item.tags.includes("luogo")){
      item.tags.push("luogo");
    }
  });

  for(let i = globalThis.DATABASE.length - 1; i >= 0; i--){
    const key = globalThis.DATABASE[i].name.toLowerCase().trim();

    if(seen.has(key)){
      globalThis.DATABASE.splice(i, 1);
    }else{
      seen.add(key);
    }
  }
}

// Inserisce le domande strategiche nel set di domande globali
function hydrateQuestions(){
  if(typeof globalThis.QUESTIONS === "undefined" || !Array.isArray(globalThis.QUESTIONS)){
    globalThis.QUESTIONS = [];
  }

  const source = Array.isArray(globalThis.QUESTIONS) ? globalThis.QUESTIONS : [];

  strategicQuestions.forEach(q => {
    if(!source.some(x => x.id === q.id)){
      source.unshift(q);
    }
  });

  source.forEach(q => {
    q.tag = normalizeTag(q.tag);
  });
}

// Aggiorna il testo informativo con il numero di elementi e categorie nel DB
function updateDbStats(){
  const byType = globalThis.DATABASE.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  $("dbStats").textContent = `${globalThis.DATABASE.length} voci • ${Object.keys(byType).length} categorie`;
}

// Trasforma una stringa in un formato tag standard (minuscolo, senza spazi)
function normalizeTag(t){
  return String(t || "").trim().replace(/\s+/g, "_").toLowerCase();
}

// Trasforma un tag in una stringa leggibile (sostituisce underscore con spazi)
function readableTag(tag){
  return normalizeTag(tag).replaceAll("_", " ");
}

// Forza un numero a restare entro un intervallo minimo e massimo definito
function clampNumber(n, min, max){
  return Math.max(min, Math.min(max, Math.round(Number(n) || min)));
}
