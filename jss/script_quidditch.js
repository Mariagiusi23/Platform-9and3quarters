// Recupero degli elementi HTML usati dal gioco e dalla mappa.
const scoreEl = document.getElementById('score'),
  timerEl = document.getElementById('timer'),
  livesEl = document.getElementById('lives'),
  levelEl = document.getElementById('level'),
  messageEl = document.getElementById('message'),
  snitch = document.getElementById('goldenSnitch'),
  field = document.getElementById('quidditchField'),
  difficultySelect = document.getElementById('difficulty'),
  bludgers = [document.getElementById('bludgerOne'), document.getElementById('bludgerTwo')],
  dangerZone = document.getElementById('dangerZone'),
  maraudersMap = document.getElementById('maraudersMap'),
  mapStage = document.getElementById('mapStage'),
  mapStatus = document.getElementById('mapStatus');

// Sposta la mappa dentro il campo, così dopo la vittoria appare sopra il Quidditch.
field.appendChild(mapStage);

// Impostazioni delle difficoltà: obiettivo, tempo, vite e velocità degli elementi.
const settings = {
  easy: { label: 'Facile', target: 3, time: 35, lives: 5, snitchSpeed: 1400, bludgerSpeed: 1800, snitchHard: false },
  normal: { label: 'Normale', target: 5, time: 25, lives: 3, snitchSpeed: 950, bludgerSpeed: 1300, snitchHard: false },
  hard: { label: 'Difficile', target: 7, time: 22, lives: 3, snitchSpeed: 650, bludgerSpeed: 950, snitchHard: true },
  extreme: { label: 'Estrema', target: 9, time: 18, lives: 2, snitchSpeed: 430, bludgerSpeed: 650, snitchHard: true }
};

// Variabili di stato della partita.
let score = 0,
  timeLeft = 35,
  lives = 5,
  targetScore = 3,
  gameActive = false,
  timerInterval = null,
  snitchInterval = null,
  bludgerInterval = null,
  current = settings.easy,
  mapUnlocked = false;

// Aggiorna il messaggio sotto il campo e ne cambia lo stile in base al tipo.
function setMessage(text, type = 'info') {
  messageEl.textContent = text;
  messageEl.className = 'message ' + type;
}

// Legge la difficoltà selezionata e imposta i valori della partita.
function readDifficulty() {
  current = settings[difficultySelect.value] || settings.easy;
  targetScore = current.target;
  timeLeft = current.time;
  lives = current.lives;
  snitch.classList.toggle('hard', current.snitchHard);
  levelEl.textContent = current.label;
}

// Riscrive a schermo punteggio, timer, vite e livello.
function updateScoreboard() {
  scoreEl.textContent = score + '/' + targetScore;
  timerEl.textContent = timeLeft + 's';
  livesEl.textContent = '❤'.repeat(lives) || '0';
  levelEl.textContent = current.label;
}

// Ferma tutti i timer attivi del gioco.
function clearAllIntervals() {
  clearInterval(timerInterval);
  clearInterval(snitchInterval);
  clearInterval(bludgerInterval);
}

// Calcola una posizione casuale dentro il campo, evitando di uscire dai bordi.
function randomPosition(el, padding = 30) {
  const maxX = field.clientWidth - el.offsetWidth - padding,
    maxY = field.clientHeight - el.offsetHeight - padding;
  return {
    x: padding / 2 + Math.random() * Math.max(1, maxX),
    y: padding / 2 + Math.random() * Math.max(1, maxY)
  };
}

// Muove il Boccino e sposta anche la zona di pericolo vicino alla sua posizione.
function moveSnitch() {
  if (!gameActive) return;
  const p = randomPosition(snitch, 60);
  snitch.style.transition = 'left .22s linear, top .22s linear';
  snitch.style.left = p.x + 'px';
  snitch.style.top = p.y + 'px';
  dangerZone.style.left = (p.x - 26) + 'px';
  dangerZone.style.top = (p.y - 26) + 'px';
}

// Muove i Bolidi in posizioni casuali del campo.
function moveBludgers() {
  if (!gameActive) return;
  bludgers.forEach(b => {
    const p = randomPosition(b, 50);
    b.style.transition = 'left .28s linear, top .28s linear';
    b.style.left = p.x + 'px';
    b.style.top = p.y + 'px';
  });
}

// Crea piccole scintille nel punto cliccato.
function createSpark(x, y, color = 'white') {
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.style.left = (x + Math.random() * 34 - 17) + 'px';
    s.style.top = (y + Math.random() * 34 - 17) + 'px';
    s.style.color = color;
    s.style.background = color;
    field.appendChild(s);
    setTimeout(() => s.remove(), 760);
  }
}

// Avvia una nuova partita con la difficoltà selezionata.
function startGame() {
  clearAllIntervals();
  hideMap(false);
  readDifficulty();
  score = 0;
  gameActive = true;
  snitch.style.display = 'flex';
  dangerZone.style.display = 'block';
  bludgers.forEach(b => b.style.display = 'block');
  updateScoreboard();
  moveSnitch();
  moveBludgers();
  setMessage('Partita iniziata! Prendi il Boccino e non cliccare i Bolidi o il campo a vuoto.', 'info');
  timerInterval = setInterval(() => {
    timeLeft--;
    updateScoreboard();
    if (timeLeft <= 0) loseGame('Tempo scaduto! Il Boccino è fuggito oltre gli spalti.');
  }, 1000);
  snitchInterval = setInterval(moveSnitch, current.snitchSpeed);
  bludgerInterval = setInterval(moveBludgers, current.bludgerSpeed);
}

// Riporta il gioco allo stato iniziale.
function resetGame() {
  clearAllIntervals();
  readDifficulty();
  score = 0;
  gameActive = false;
  snitch.style.display = 'none';
  dangerZone.style.display = 'none';
  bludgers.forEach(b => b.style.display = 'none');
  updateScoreboard();
  hideMap(false);
  setMessage('Partita azzerata. Premi “Inizia partita” per riprovare.', 'info');
}

// Click sul Boccino: aumenta il punteggio e controlla se il giocatore ha vinto.
snitch.addEventListener('click', e => {
  if (!gameActive) return;
  e.stopPropagation();
  score++;
  createSpark(e.offsetX + snitch.offsetLeft, e.offsetY + snitch.offsetTop, '#fff7a8');
  updateScoreboard();
  if (score >= targetScore) winGame();
  else {
    setMessage('Preso! Ancora ' + (targetScore - score) + ' e la mappa si aprirà.', 'success');
    moveSnitch();
  }
});

// Click su un Bolide: toglie una vita.
bludgers.forEach(b => b.addEventListener('click', e => {
  if (!gameActive) return;
  e.stopPropagation();
  lives--;
  createSpark(e.offsetX + b.offsetLeft, e.offsetY + b.offsetTop, '#ef4444');
  updateScoreboard();
  if (lives <= 0) loseGame('Sei stato colpito da troppi Bolidi. Partita persa!');
  else {
    setMessage('Attenzione! Hai cliccato un Bolide e hai perso una vita.', 'error');
    moveBludgers();
  }
}));

// Click a vuoto sul campo: penalizza il giocatore togliendo una vita.
field.addEventListener('click', e => {
  if (!gameActive || e.target === snitch || bludgers.includes(e.target)) return;
  lives--;
  createSpark(e.offsetX, e.offsetY, '#93c5fd');
  updateScoreboard();
  if (lives <= 0) loseGame('Troppi click a vuoto: il Boccino è sparito!');
  else setMessage('Click mancato! Hai perso una vita. Concentrati sul Boccino.', 'error');
});

// Gestisce la vittoria: ferma la partita e sblocca la mappa.
function winGame() {
  clearAllIntervals();
  gameActive = false;
  snitch.style.display = 'none';
  dangerZone.style.display = 'none';
  bludgers.forEach(b => b.style.display = 'none');
  updateScoreboard();
  revealMap();
  setMessage('Hai vinto! Il campo sparisce e la Mappa del Malandrino si apre sopra il Quidditch.', 'success');
  window.pfAwardGameWin?.('quidditch', {
    onSuccess: (_data, message) => setMessage('Hai vinto! ' + message, 'success')
  });
}

// Gestisce la sconfitta: ferma tutto e mostra il messaggio di errore.
function loseGame(text) {
  clearAllIntervals();
  gameActive = false;
  snitch.style.display = 'none';
  dangerZone.style.display = 'none';
  bludgers.forEach(b => b.style.display = 'none');
  updateScoreboard();
  setMessage(text, 'error');
}

// Mostra la Mappa del Malandrino con animazione di apertura.
function revealMap() {
  mapUnlocked = true;
  field.classList.add('map-opened');
  mapStatus.textContent = 'Giuro solennemente di non avere buone intenzioni...';
  mapStage.classList.add('map-visible', 'reveal-flash');
  maraudersMap.className = 'marauders-map opening';
  createMapParticles();
  setTimeout(() => {
    maraudersMap.className = 'marauders-map open';
    mapStatus.textContent = 'Mappa sbloccata: impronte e nomi si muovono. Clicca sulla mappa per zoomare.';
  }, 3250);
  setTimeout(() => mapStage.classList.remove('reveal-flash'), 2600);
}

// Nasconde la mappa e, se richiesto, blocca di nuovo lo sblocco.
function hideMap(resetUnlock = true) {
  if (resetUnlock) mapUnlocked = false;
  field.classList.remove('map-opened');
  mapStatus.textContent = 'La mappa si aprirà solo dopo la vittoria.';
  mapStage.classList.remove('map-visible', 'reveal-flash');
  maraudersMap.className = 'marauders-map closed';
}

// Crea particelle dorate durante la comparsa della mappa.
function createMapParticles() {
  const rect = mapStage.getBoundingClientRect();
  for (let i = 0; i < 42; i++) {
    const p = document.createElement('span');
    p.className = 'gold-particle';
    p.style.left = (rect.width * .14 + Math.random() * rect.width * .72) + 'px';
    p.style.top = (rect.height * .25 + Math.random() * rect.height * .5) + 'px';
    p.style.animationDelay = (Math.random() * .35) + 's';
    mapStage.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

// Click sulla mappa aperta: attiva o disattiva lo zoom.
maraudersMap.addEventListener('click', () => {
  if (!mapUnlocked || maraudersMap.classList.contains('closed')) return;
  maraudersMap.classList.toggle('zoomed');
});

// Cambio difficoltà: aggiorna i valori e resetta lo stato della partita.
difficultySelect.addEventListener('change', () => {
  readDifficulty();
  score = 0;
  gameActive = false;
  clearAllIntervals();
  snitch.style.display = 'none';
  dangerZone.style.display = 'none';
  bludgers.forEach(b => b.style.display = 'none');
  updateScoreboard();
  setMessage('Difficoltà impostata su ' + current.label + '. Premi “Inizia partita”.', 'info');
});

// Inizializzazione della schermata appena la pagina viene caricata.
readDifficulty();
updateScoreboard();
hideMap();

// --- DEBUG: controllo visibilità e animazione delle scope (rimuovere in produzione) ---
;(function debugPlayers(){
  const p = document.querySelector('.player');
  if (!p) return console.log('DEBUG: nessuna .player trovata nel DOM');
  const cs = getComputedStyle(p);
  console.log('DEBUG: field.className =', field.className);
  console.log('DEBUG: prima .player computed opacity =', cs.opacity, ' display =', cs.display, ' animation-name =', cs.animationName);
  // Aiuta a verificare se l'animazione è sospesa o se l'elemento è nascosto via CSS
})();
