// Variabili globali per la configurazione del giocatore 1
let mode=1, playerHouse='Harry Potter · Grifondoro', playerColor='#b91c1c', playerIcon='🦁', playerPhoto='images/harry.png';

// Variabili di stato del gioco: salute, energia, turno, lock (per impedire input durante le animazioni), scudi, combo, fine partita e status rallentato
let hp1=100,hp2=100,en1=100,en2=100,turn=1,locked=false,shield1=false,shield2=false,combo1=0,combo2=0,ended=false,slow1=false,slow2=false;
// History per undo (salva snapshot semplici dello stato di gioco)
const history = [];

// Dizionario contenente i dati base di tutte le magie disponibili
const spells={
  stupefy:{key:'Q',name:'Stupefy',damage:24,cost:28,color:'#ef4444',text:'colpo stordente devastante'},
  expelliarmus:{key:'W',name:'Expelliarmus',damage:17,cost:20,color:'#ffd76b',text:'disarmo preciso'},
  glacius:{key:'E',name:'Glacius',damage:13,cost:24,color:'#60a5fa',text:'rallenta il bersaglio'},
  protego:{key:'R',name:'Protego',cost:18,color:'#22c55e'}
};

// Utility function per selezionare velocemente gli elementi del DOM tramite il loro ID
// Short helper: seleziona un elemento per ID, ritorna null se non esiste
function $(id){
  return document.getElementById(id);
}

// Funzioni di gestione della schermata introduttiva del tutorial
function openSnape(){
  const intro=$( 'snapeIntro' );
  const tut=$( 'tutorial' );
  const choice=$( 'snapeChoice' );
  const text=$( 'snapeText' );
  if(intro) intro.classList.remove('hidden');
  if(tut) tut.classList.add('hidden');
  if(choice) choice.classList.remove('hidden');
  if(text) text.textContent='Di nuovo? Molto bene. Vediamo se stavolta ascolti.';
}

function showTutorial(){
  const tut=$( 'tutorial' );
  const choice=$( 'snapeChoice' );
  const text=$( 'snapeText' );
  if(tut) tut.classList.remove('hidden');
  if(choice) choice.classList.add('hidden');
  if(text) text.textContent='Le istruzioni sono semplici. Persino per te.';
}

function skipTutorial(){
  const intro=$( 'snapeIntro' );
  if(intro) intro.classList.add('hidden');
}

// Imposta la modalità di gioco (1: vs CPU, 2: Player vs Player)
function setMode(m){
  mode=m;
  const el=$('modeText');
  if(el) el.innerHTML='Modalità selezionata: <strong>'+m+' giocatore'+(m===2?'i':'')+'</strong>';
}

// Gestisce la selezione visiva e dati del personaggio per il Player 1
function selectChar(name,color,icon,photo,el){
  // Aggiorna dati locali del giocatore
  playerHouse=name; playerColor=color; playerIcon=icon; playerPhoto=photo;

  // Se l'elemento avatar esiste, aggiorna la sorgente immagine (non obbligatorio)
  const f1=$('face1');
  if(f1) f1.src=photo;

  // Aggiorna la selezione visuale tra le card
  document.querySelectorAll('.char').forEach(c=>c.classList.remove('selected'));
  if(el && el.classList) el.classList.add('selected'); // Evidenzia la carta del personaggio scelto
}

// Inizializza l'interfaccia di gioco e prepara l'arena al primo turno
function startGame(){
  const menu=$('menu'); const game=$('game');
  if(menu) menu.classList.add('hidden');
  if(game) game.classList.remove('hidden');

  resetStats();

  // Assicura che eventuali overlay introduttivi o di conferma siano nascosti prima di giocare
  const intro = $('snapeIntro'); if(intro && !intro.classList.contains('hidden')) intro.classList.add('hidden');
  const tut = $('tutorial'); if(tut && !tut.classList.contains('hidden')) tut.classList.add('hidden');
  const confirm = $('confirmExit'); if(confirm && !confirm.classList.contains('hidden')) confirm.classList.add('hidden');
  locked = false; // garantisce input dopo l'avvio

  const wiz1=$('wiz1'); if(wiz1) wiz1.style.setProperty('--house',playerColor);
  const f1=$('face1'); if(f1) f1.src=playerPhoto;
  const f2=$('face2'); if(f2) f2.src= mode===1 ? 'images/draco.png' : 'images/draco.png';

  const p1=$('p1name'); if(p1) p1.textContent = playerIcon + ' Player 1';
  const t1=$('txt1'); if(t1) t1.textContent = playerHouse;
  const p2=$('p2name'); if(p2) p2.textContent = mode===1 ? '🐍 CPU Serpeverde' : '🐍 Player 2';
  const t2=$('txt2'); if(t2) t2.textContent = mode===1 ? 'CPU' : 'Player 2';

  update();
  log('Piton osserva in silenzio. Player 1, comincia.');
  // Assicura che la pagina possa ricevere eventi da tastiera
  try{ 
    if(document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    document.body.tabIndex = -1; document.body.focus(); 
  }catch(e){}
  // Aggiorna visibilità del pulsante undo
  const ub = $('undoBtn'); if(ub) ub.style.display = history.length ? 'inline-block' : 'none';
}

// Resetta le statistiche ai valori di partenza
function resetStats(){hp1=100;hp2=100;en1=100;en2=100;turn=1;locked=false;shield1=false;shield2=false;combo1=0;combo2=0;ended=false;slow1=false;slow2=false;history.length=0;const ub=$('undoBtn');if(ub)ub.style.display='none'}
// Riavvia un duello mantenendo i personaggi scelti
function resetGame(){closeFinish();resetStats();update();log('Duello riavviato. Player 1 inizia.')}
// Torna al menu principale dalla schermata di fine partita
function backMenu(){closeFinish();$('game').classList.add('hidden');$('menu').classList.remove('hidden');resetStats()}
// Chiude il modal di vittoria/sconfitta
function closeFinish(){$('finish').classList.add('hidden')}

// Aggiorna le barre della vita (HP) e dell'energia nel DOM
function update(){
  const hp1el=$('hp1fill'); const hp2el=$('hp2fill');
  const en1el=$('en1fill'); const en2el=$('en2fill');
  const turnEl=$('turnText');
  if(hp1el) hp1el.style.width = Math.max(0,hp1) + '%';
  if(hp2el) hp2el.style.width = Math.max(0,hp2) + '%';
  if(en1el) en1el.style.width = Math.max(0,en1) + '%';
  if(en2el) en2el.style.width = Math.max(0,en2) + '%';
  if(turnEl) turnEl.textContent = ended ? 'Concluso' : (turn===1 ? 'Turno Player 1' : 'Turno ' + (mode===1 ? 'CPU' : 'Player 2'));
}

// Utility per scrivere messaggi nel box testuale in basso
function log(t){ const l=$('log'); if(l) l.textContent = t }

// Ciclo principale per la ricarica dell'energia nel tempo
setInterval(()=>{
  const game=$('game');
  if(ended || !game || game.classList.contains('hidden')) return;
  en1 = Math.min(100, en1 + 2.2); // Ricarica energia periodica
  en2 = Math.min(100, en2 + 2.2);
  update();
}, 260);

// Controlla se il giocatore/CPU ha abbastanza energia per lanciare la magia, altrimenti scala il costo
function enoughEnergy(caster,type){
  // Difesa: se il tipo di incantesimo non esiste, falliamo
  if(!spells[type]){ log('Incantesimo non trovato: '+type); return false }
  const cost = spells[type].cost || 0;
  if(caster===1 && en1 < cost){ log('Energia insufficiente. Aspetta un istante.'); return false }
  if(caster===2 && en2 < cost){ log('Energia insufficiente per Player 2.'); return false }
  if(caster===1) en1 -= cost; else en2 -= cost;
  return true;
}

// Filtro input per i click sui bottoni della magia (blocca se è il turno sbagliato)
function playerSpell(type){
  if(locked||ended) return;
  if(mode===1 && turn!==1) return; // In PVE, ignora i comandi se è il turno della CPU
  // Salva lo stato prima dell'azione per permettere undo
  saveState();
  cast(turn,type);
}

// Gestisce la logica principale dell'uso di una magia (sia offensiva che difensiva)
function cast(caster,type){
  if(locked || ended) return;
  if(!enoughEnergy(caster,type)) return;

  if(type === 'protego'){ doProtego(caster); return } // Protego è difensivo

  locked = true; // Blocca input durante animazioni
  const spell = spells[type];
  const attacker = caster === 1 ? $('wiz1') : $('wiz2');
  const defender = caster === 1 ? $('wiz2') : $('wiz1');

  // Se per qualche motivo attacker/defender non esistono, procediamo comunque ma senza crash
  if(attacker && attacker.classList) attacker.classList.add('cast');
  setTimeout(()=>{ if(attacker && attacker.classList) attacker.classList.remove('cast') },460);
  projectile(caster, spell);
  
  // Calcolo dell'impatto dopo 500ms
  setTimeout(()=>{
  let shielded = (caster === 1 ? shield2 : shield1);
  let damage = spell.damage || 0;
    
    // Glacius applica uno status rallentamento (ritarda il turno)
    if(type==='glacius'){ if(caster===1) slow2=true; else slow1=true; }
    
    // Gestione dell'impatto con o senza scudo
    if(shielded){
      damage = Math.round(damage * .3);
      shieldedImpact(caster === 1 ? 2 : 1);
      log('Protego assorbe il colpo. Piton sembra quasi non disprezzarlo.');
    } else {
      impact(caster, spell.color);
      if(defender && defender.classList) {
        defender.classList.add('hit');
        setTimeout(()=>{ if(defender && defender.classList) defender.classList.remove('hit') },420);
      }
      log(spell.name + '! ' + (spell.text || '')); 
    }
    
    // Applicazione del danno e reset degli scudi
  if(caster === 1){ hp2 -= damage; shield2 = false; combo1++; combo2 = 0 } 
  else { hp1 -= damage; shield1 = false; combo2++; combo1 = 0 }
    
    // Meccanica delle Combo (3 colpi a segno garantiscono danni extra)
    if(combo1>=3&&caster===1){hp2-=9;combo1=0;log('Combo perfetta! Piton alza appena un sopracciglio.')}
    if(combo2>=3&&caster===2){hp1-=9;combo2=0;log('Combo dell’avversario. Doloroso, ma istruttivo.')}
    
  burstParticles(caster === 1 ? 78 : 22, 55, spell.color);
    update();
    checkWinner();
    
    // Passaggio del turno, calcolando un ritardo aggiuntivo se affetti da Glacius (slow)
    setTimeout(()=>{ locked = false; nextTurn() }, (caster === 1 && slow1) || (caster === 2 && slow2) ? 740 : 430)
  },500)
}

// Esecuzione dello scudo difensivo
function doProtego(caster){
  locked=true;
  if(caster===1){shield1=true;showShield(1);log('Player 1 evoca Protego.')}else{shield2=true;showShield(2);log((mode===1?'CPU':'Player 2')+' evoca Protego.')}
  update();
  setTimeout(()=>{locked=false;nextTurn()},650)
}

// Filtro input per la meccanica di schivata
function playerDodge(){
  if(locked||ended)return;
  if(mode===1 && turn!==1) return;
  saveState();
  dodge(turn);
}

// Salva snapshot dello stato di gioco (semplice, non include DOM transizioni)
function saveState(){
  // Manteniamo soltanto gli ultimi 10 snapshot
  if(history.length > 9) history.shift();
  history.push({hp1,hp2,en1,en2,turn,shield1,shield2,combo1,combo2,ended,slow1,slow2});
  const ub = $('undoBtn'); if(ub) ub.style.display = history.length ? 'inline-block' : 'none';
}

// Ripristina l'ultimo snapshot
function undoLast(){
  if(!history.length) return;
  const s = history.pop();
  hp1 = s.hp1; hp2 = s.hp2; en1 = s.en1; en2 = s.en2; turn = s.turn;
  shield1 = s.shield1; shield2 = s.shield2; combo1 = s.combo1; combo2 = s.combo2;
  ended = s.ended; slow1 = s.slow1; slow2 = s.slow2;
  // Aggiorna UI e sblocca input
  update();
  locked = false; ended = false;
  const ub = $('undoBtn'); if(ub) ub.style.display = history.length ? 'inline-block' : 'none';
  log('Hai annullato l\'ultima azione.');
}

// Esecuzione della schivata: costa energia quanto un expelliarmus e fa da scudo totale temporaneo
function dodge(caster){
  if(!enoughEnergy(caster,'expelliarmus')) return;
  locked = true;
  const wiz=caster===1?$('wiz1'):$('wiz2');
  if(wiz){
    if(caster===1){wiz.style.transform='translateX(42px)';shield1=true}else{wiz.style.transform='scaleX(-1) translateX(42px)';shield2=true}
    setTimeout(()=>{ wiz.style.transform=''; },320); // Reset della posizione
  }
  log((caster===1?'Player 1':mode===1?'CPU':'Player 2')+' schiva: il prossimo colpo sarà ridotto.');
  setTimeout(()=>{ locked=false; nextTurn(); },360);
}

// Gestione della fine del turno, scambio degli avversari e reset status slow
function nextTurn(){
  if(ended)return;
  if(turn===1) slow1=false; else slow2=false;
  turn=turn===1?2:1;
  update();
  // Se è il turno della CPU, aspetta e poi esegui la sua mossa
  if(mode===1&&turn===2){setTimeout(cpuMove, slow2?1050:650)}
}

// Intelligenza Artificiale semplificata della CPU
function cpuMove(){
  if(ended||locked)return;
  const choice=Math.random(); // Genera un numero tra 0 e 1 per le probabilità
  
  if(en2<18){setTimeout(cpuMove,500);return} // Attende energia se ne ha troppa poca
  
  // Percentuali di scelta della CPU per l'utilizzo delle mosse
  if(choice<.16) cast(2,'protego');
  else if(choice<.30) dodge(2);
  else if(choice<.58) cast(2,'stupefy');
  else if(choice<.82) cast(2,'expelliarmus');
  else cast(2,'glacius');
}

// Genera visivamente il proiettile dell'incantesimo nell'arena
function projectile(caster,spell){
  const arena = $('arena');
  if(!arena) return; // Safety: se l'arena manca non creiamo l'elemento
  const el = document.createElement('div');
  el.className = 'spell-projectile';
  el.style.color = spell.color || '';
  el.style.background = spell.color || '';
  el.style.top = '308px';
  if(caster === 1){ el.style.left = '23%'; el.style.setProperty('--travel','560px') }
  else { el.style.right = '23%'; el.style.setProperty('--travel','-560px') }
  arena.appendChild(el);
  setTimeout(()=>{ if(el && el.remove) el.remove() },650);
}

// Genera l'impatto visivo sul corpo del mago (senza scudo)
function impact(caster,color){
  const arena = $('arena'); if(!arena) return;
  const el = document.createElement('div');
  el.className = 'impact';
  el.style.color = color || '';
  el.style.top = '265px';
  el.style.left = caster === 1 ? '72%' : '18%';
  arena.appendChild(el);
  setTimeout(()=>{ if(el && el.remove) el.remove() },700);
}

// Wrapper per mostrare l'effetto dello scudo colpito
function shieldedImpact(target){showShield(target)}

// Genera visivamente l'alone dello scudo 'Protego'
function showShield(target){
  const arena = $('arena'); if(!arena) return;
  const el = document.createElement('div'); el.className = 'shield';
  el.style.top = '215px'; el.style.left = target === 1 ? '9%' : '68%';
  arena.appendChild(el);
  const wiz = target === 1 ? $('wiz1') : $('wiz2');
  if(wiz && wiz.classList) wiz.classList.add('shielding');
  setTimeout(()=>{ if(el && el.remove) el.remove(); if(wiz && wiz.classList) wiz.classList.remove('shielding') },750);
}

// Genera le particelle luminose al momento dell'impatto dell'incantesimo
function burstParticles(x,y,color){
  const arena = $('arena'); if(!arena) return;
  for(let i = 0; i < 18; i++){
    const s = document.createElement('span'); s.className = 'sparkle';
    s.style.left = x + '%'; s.style.top = y + '%'; s.style.background = color || '';
    s.style.boxShadow = '0 0 18px ' + (color || '#fff');
    s.style.transform = 'translate(' + (Math.random() * 80 - 40) + 'px,' + (Math.random() * 50 - 25) + 'px)';
    arena.appendChild(s);
    setTimeout(()=>{ if(s && s.remove) s.remove() }, 1200);
  }
}

// Verifica la salute dei giocatori per decretare se c'è un vincitore
function checkWinner(){
  if(hp1 <= 0 || hp2 <= 0){
    ended = true; locked = true; update();
    const p1win = hp2 <= 0;
    const wt = $('winnerTitle'); const wtxt = $('winnerText'); const finish = $('finish');
    if(wt) wt.textContent = p1win ? 'Vittoria di Player 1!' : 'Vittoria di ' + (mode === 1 ? 'CPU' : 'Player 2') + '!';
    if(wtxt) wtxt.textContent = p1win ? 'Piton: “Accettabile. Non eccellente. Accettabile.”' : 'Piton: “Prevedibile. Forse la prossima volta leggerai le istruzioni.”';
    if(p1win){
      window.pfAwardGameWin?.('club_duellanti', {
        onSuccess: (_data, message) => {
          if(wtxt) wtxt.textContent += ' ' + message;
        }
      });
    }
    if(finish) finish.classList.remove('hidden');
  }
}

/* ---------- Conferma uscita / cambia modalità (Piton-style) ---------- */
// Mostra il dialog di conferma per abbandonare il duello
function showConfirmExit(){
  const dlg = $('confirmExit');
  if(!dlg) return;
  // Mostra frase random di Piton
  const phrases = [
    'Sei sicuro di voler abbandonare il duello? Solo i mediocri cercano scuse.',
    'Abbandonare ora? Dimostreresti scarsa disciplina, e io lo noterò.',
    'Preferisci cambiare modalità e rischiare meno? Pensaci due volte.'
  ];
  const text = $('confirmExitText'); if(text) text.textContent = phrases[Math.floor(Math.random()*phrases.length)];
  dlg.classList.remove('hidden');
  // Impedisce input di gioco mentre il dialog è aperto
  locked = true;
}

// Nasconde il dialog di conferma
function hideConfirmExit(){
  const dlg = $('confirmExit');
  if(!dlg) return;
  dlg.classList.add('hidden');
  locked = false;
}

// Conferma l'uscita: torna al menu principale (resetta stato)
function confirmExit(){
  // Nascondi dialog e riporta al menu
  hideConfirmExit();
  // Chiudiamo eventuali schermate e riportiamo al menu
  resetStats();
  $('game') && $('game').classList.add('hidden');
  $('menu') && $('menu').classList.remove('hidden');
  log('Hai abbandonato il duello. Piton sembra soddisfatto... o quasi.');
}

// Gestore dei tasti: separato in funzione per poter registrare listener multipli
function handleKeyEvent(e){
  if(!e || !e.key) return;
  const k = e.key.toLowerCase();

  // Durante l'intro/tut controlliamo solo quei tasti
  const snapeIntro = $('snapeIntro');
  if(snapeIntro && !snapeIntro.classList.contains('hidden')){
    if(k === 'n') showTutorial();
    if(k === 's') skipTutorial();
    return;
  }

  // ESC gestito a prescindere per chiudere dialog
  if(k === 'escape' || k === 'esc'){
    const dlg = $('confirmExit');
    if(dlg && !dlg.classList.contains('hidden')){ hideConfirmExit(); return; }
  }

  const game = $('game');
  if(!game || game.classList.contains('hidden') || locked || ended) return;

  // Input Player 1 (turno)
  if(turn === 1){
    if(k === 'q') playerSpell('stupefy');
    if(k === 'w') playerSpell('expelliarmus');
    if(k === 'e') playerSpell('glacius');
    if(k === 'r') playerSpell('protego');
    if(k === 'a' || k === 'd') playerDodge();
    return;
  }

  // Input Player 2 (solo in locale multiplayer)
  if(mode === 2){
    if(k === 'i') playerSpell('stupefy');
    if(k === 'o') playerSpell('expelliarmus');
    if(k === 'p') playerSpell('glacius');
    if(k === 'l') playerSpell('protego');
    if(k === 'arrowleft' || k === 'arrowright') playerDodge();
  }
}

// Registra il listener principale una sola volta, per evitare doppie letture dello stesso tasto
document.addEventListener('keydown', handleKeyEvent);

// Rende disponibili le funzioni agli onclick presenti nell'HTML.
// Serve soprattutto se il file viene caricato in un contesto più rigido o insieme ad altri script.
Object.assign(window, {
  openSnape, showTutorial, skipTutorial, setMode, selectChar, startGame,
  resetGame, backMenu, closeFinish, playerSpell, playerDodge, undoLast,
  showConfirmExit, hideConfirmExit, confirmExit
});
