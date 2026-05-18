// Array contenente la definizione di tutte le pozioni giocabili
const potions=[
 {id:'felix',icon:'🍀',name:'Felix Felicis',diff:'Difficile',desc:'Una pozione dorata che porta fortuna a chi la beve, ma solo se preparata con assoluta precisione.',recipe:['quadrifoglio lunare','essenza dorata','piuma di fenice','lacrima di sirena']},
 {id:'polisucco',icon:'🧪',name:'Pozione Polisucco',diff:'Molto difficile',desc:'Trasforma temporaneamente l’aspetto di chi la beve. Richiede ingredienti rari e un ordine rigoroso.',recipe:['mosche crisopa','sanguisughe','corno di bicorno','pelle di boomslang','ciocca misteriosa']},
 {id:'amortentia',icon:'💗',name:'Amortentia',diff:'Difficile',desc:'La pozione dell’attrazione più potente, riconoscibile dal suo profumo diverso per ogni persona.',recipe:['petali di rosa nera','perla lunare','vapore di vaniglia','polvere di rubino']},
 {id:'sonno',icon:'🌙',name:'Distillato Soporis',diff:'Media',desc:'Una pozione soporifera perfetta per addormentare anche il mago più agitato.',recipe:['radice di valeriana','lavanda stregata','gocce di luna','semi di papavero blu']},
 {id:'memoria',icon:'🧠',name:'Essenza della Memoria',diff:'Media',desc:'Rende più chiari ricordi e intuizioni, ma diventa instabile se viene mescolata male.',recipe:['foglie di salvia','cristallo mentale','inchiostro blu','scaglia d’argento']},
 {id:'vigore',icon:'🔥',name:'Filtro del Vigore',diff:'Facile',desc:'Restituisce energia e coraggio durante le prove più dure.',recipe:['pepe di drago','radice rossa','brace di salamandra']},
 {id:'invisibilita',icon:'👻',name:'Nebbia Invisibile',diff:'Difficile',desc:'Avvolge chi la usa in un velo evanescente, quasi impossibile da distinguere nell’ombra.',recipe:['nebbia in ampolla','occhio di camaleonte','polvere d’opale','menta fantasma']},
 {id:'guarigione',icon:'✨',name:'Elisir Rigenerante',diff:'Media',desc:'Lenisce ferite leggere e ridona stabilità dopo un duello magico.',recipe:['dittamo','acqua stellare','miele ambrato','scaglia di unicorno']}
];

// Dizionario che associa ad ogni nome di ingrediente un'icona (emoji) e una breve descrizione
const allIngredients={
 'quadrifoglio lunare':['🍀','Raro e luminoso'], 'essenza dorata':['🟡','Brilla come sole liquido'], 'piuma di fenice':['🪶','Calda al tatto'], 'lacrima di sirena':['💧','Argentea e melodica'],
 'mosche crisopa':['🪰','Da maneggiare con cura'], 'sanguisughe':['🪱','Viscide ma essenziali'], 'corno di bicorno':['🦏','Ridotto in polvere'], 'pelle di boomslang':['🐍','Sottile e velenosa'], 'ciocca misteriosa':['🧵','Ingrediente finale'],
 'petali di rosa nera':['🥀','Profumo intenso'], 'perla lunare':['⚪','Fredda e pura'], 'vapore di vaniglia':['☁️','Dolce e leggero'], 'polvere di rubino':['🔴','Rosso incandescente'],
 'radice di valeriana':['🌿','Base soporifera'], 'lavanda stregata':['💜','Calma la miscela'], 'gocce di luna':['🌙','Risvegliano il colore'], 'semi di papavero blu':['🔵','Chiudono la pozione'],
 'foglie di salvia':['🍃','Chiariscono la mente'], 'cristallo mentale':['💎','Amplifica i ricordi'], 'inchiostro blu':['🖋️','Fissa la memoria'], 'scaglia d’argento':['◻️','Stabilizza il composto'],
 'pepe di drago':['🌶️','Piccante e potente'], 'radice rossa':['🟥','Carica la pozione'], 'brace di salamandra':['🔥','Accende il vigore'],
 'nebbia in ampolla':['🌫️','Quasi invisibile'], 'occhio di camaleonte':['🦎','Cambia colore'], 'polvere d’opale':['🪩','Riflette la luce'], 'menta fantasma':['🌱','Fredda e trasparente'],
 'dittamo':['🌾','Erba curativa'], 'acqua stellare':['⭐','Acqua celeste'], 'miele ambrato':['🍯','Denso e caldo'], 'scaglia di unicorno':['🦄','Purissima']
};

// Array di ingredienti "trappola" (non servono per nessuna ricetta specifica, ma appaiono per confondere il giocatore)
const extra=['occhio di rospo','fungo viola','sale nero','spina di rosa','ambra liquida','cenere fredda'];
// Aggiunge gli ingredienti extra al dizionario principale
extra.forEach(x=>allIngredients[x]=['⚗️','Ingrediente comune']);

// Frasi casuali mostrate da Piton in caso di successo
const phrases=[
 'Accettabile. Sorprendentemente.',
 'Dieci punti in meno se ti monti la testa.',
 'La precisione, finalmente, ha fatto visita a questo calderone.',
 'Non è disastroso. Consideralo un complimento.',
 'Per una volta, il calderone non chiede vendetta.',
 'Silenzio. La pozione è riuscita.'
];

// Variabili di stato del gioco
let selected=null,  // Salva la pozione attualmente selezionata
    step=0,         // Tiene traccia di a che punto della ricetta si trova l'utente
    locked=false;   // Blocca i click durante le animazioni o a fine gioco

// Riferimenti ai nodi principali del DOM
const grid=document.getElementById('potionsGrid'), 
      selection=document.getElementById('selectionScreen'), 
      lab=document.getElementById('labScreen');

// Funzione che genera le "pergamene" visivamente nella prima schermata
function renderPotions(){
  grid.innerHTML=potions.map((p,i)=>
  `<div class="scroll-card" onclick="selectPotion('${p.id}')" style="transform:rotate(${[-1.2,.8,-.6,1.1,.7,-1,.9,-.8][i]}deg)">
    <div class="scroll-paper"></div>
    <div class="scroll-content">
      <div class="seal">${p.icon}</div>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="recipe"><strong>Ricetta:</strong><br>${p.recipe.join(' → ')}</div>
      <div class="difficulty">${p.diff}</div>
    </div>
  </div>`).join('')
}

// Invocata quando un utente clicca su una pergamena per avviare il laboratorio
function selectPotion(id){
  // Trova la pozione corrispondente
  selected=potions.find(p=>p.id===id);
  step=0;
  locked=false;
  
  // Cambia schermata: nasconde selezione, mostra laboratorio
  selection.classList.add('hidden');
  lab.classList.remove('hidden');
  
  // Popola l'interfaccia con i dati della pozione scelta
  document.getElementById('currentTitle').textContent=selected.icon+' '+selected.name;
  document.getElementById('currentDesc').textContent=selected.desc;
  document.getElementById('recipeStrip').innerHTML=selected.recipe.map((r,i)=>`<span class="recipe-chip">${i+1}. ${r}</span>`).join('');
  
  // Genera i pulsanti degli ingredienti
  renderIngredients();
  updateProgress();
  
  // Imposta il messaggio di log iniziale
  setLog('Seleziona il primo ingrediente: '+selected.recipe[0], '');
  document.getElementById('liquid').className='liquid'
}

// Genera la lista degli ingredienti mostrati sul pannello di destra
function renderIngredients(){
  // Clona la ricetta in una "pool"
  const pool=[...selected.recipe];
  // Aggiunge ingredienti extra casuali per creare confusione
  while(pool.length<Math.min(10,selected.recipe.length+4)){
    const e=extra[Math.floor(Math.random()*extra.length)];
    if(!pool.includes(e)) pool.push(e)
  }
  // Mischia in modo casuale l'ordine dei pulsanti
  pool.sort(()=>Math.random()-.5);
  
  // Renderizza i pulsanti nell'HTML
  document.getElementById('ingredientsList').innerHTML=pool.map(name=>{
    const d=allIngredients[name];
    return `<div class="ingredient" data-name="${name}" data-icon="${d[0]}" onclick="addIngredient('${name}',this)"><strong>${name}</strong><span>${d[1]}</span></div>`
  }).join('')
}

// Funzione principale scatenata al clic su un ingrediente
function addIngredient(name,el){
  if(locked||!selected) return; // Se il gioco è bloccato ignora i clic
  
  const needed=selected.recipe[step]; // Identifica l'ingrediente corretto atteso
  const correct=name===needed;        // Controlla se l'utente ha indovinato
  
  // Fa volare l'ingrediente visivamente verso il calderone
  flyIngredientToCauldron(name,el,correct);
  
  if(correct){
    // Caso: Ingrediente corretto
    el.classList.add('used'); // Disabilita visivamente il bottone cliccato
    step++; // Avanza nella ricetta
    
    // Aggiunge l'animazione di spruzzo al calderone e la rimuove dopo ~760ms
    document.getElementById('liquid').className='liquid splash';
    setTimeout(()=>{ 
      if(document.getElementById('liquid').classList.contains('splash')) 
        document.getElementById('liquid').className='liquid'; 
    },760);
    
    setLog('Ottimo: '+name+' sta volando nel calderone e viene assorbito dalla pozione.', 'good');
    spark(el); // Crea scintille sull'ingrediente
    
    // Verifica se la ricetta è terminata
    if(step>=selected.recipe.length){
      locked=true; // Blocca i clic
      // Cambia il colore del liquido in dorato (done)
      setTimeout(()=>{document.getElementById('liquid').className='liquid done';},780);
      setLog('Ricetta completata! La pozione ribolle: sta per arrivare il professore...', 'good');
      // Mostra l'overlay finale di Piton dopo un ritardo
      setTimeout(showPiton,1550)
    } else {
      updateProgress() // Altrimenti aggiorna solo l'indicatore in alto
    }
  } else {
    // Caso: Ingrediente errato
    // Cambia il colore del liquido in rosso (wrong)
    document.getElementById('liquid').className='liquid wrong splash';
    setTimeout(()=>{document.getElementById('liquid').className='liquid wrong';},760);
    setLog('Ingrediente sbagliato: '+name+' è caduto male nel calderone. Dovevi inserire: '+needed+'.', 'bad')
  }
}

// Aggiorna l'etichetta testuale dello Step es: (Ingrediente 2 / 4)
function updateProgress(){
  document.getElementById('progressPill').textContent=`Ingrediente ${Math.min(step+1,selected.recipe.length)} / ${selected.recipe.length}`
}

// Aggiorna il testo e il colore del box di log (feedback)
function setLog(txt,type){
  const log=document.getElementById('log');
  log.textContent=txt;
  log.className='log '+type // Aggiunge 'good' o 'bad' come classe CSS
}

// Resetta la pozione in corso permettendo di ritentarla da zero
function restartPotion(){
  if(!selected)return;
  step=0;
  locked=false;
  renderIngredients(); // Rigenera gli ingredienti per rimescolarli
  updateProgress();
  document.getElementById('liquid').className='liquid'; // Riporta il liquido al colore di base
  setLog('Ricomincia: seleziona '+selected.recipe[0]+'.','')
}

// Torna alla schermata iniziale delle pergamene
function backToSelection(){
  lab.classList.add('hidden');
  selection.classList.remove('hidden');
  selected=null;
  step=0;
  locked=false
}

// Mostra la modale scura di vittoria con Piton
function showPiton(){
  document.getElementById('pitonPhrase').textContent=phrases[Math.floor(Math.random()*phrases.length)];
  document.getElementById('pitonOverlay').classList.remove('hidden');
  window.pfAwardGameWin?.('pozioni', {
    onSuccess: (_data, message) => {
      document.getElementById('pitonPhrase').textContent += ' ' + message;
    }
  })
}

// Nasconde la modale di Piton
function closePiton(){
  document.getElementById('pitonOverlay').classList.add('hidden');
  backToSelection()
}

// Crea e anima il div ("clone" dell'ingrediente) che vola verso il calderone
function flyIngredientToCauldron(name,el,correct){
  const icon=(allIngredients[name]&&allIngredients[name][0])||'⚗️';
  const start=el.getBoundingClientRect(); // Posizione iniziale (il bottone cliccato)
  const target=document.getElementById('liquid').getBoundingClientRect(); // Posizione di arrivo (il calderone)
  
  // Creazione dell'elemento volante
  const fly=document.createElement('div');
  fly.className='flying-ingredient';
  fly.innerHTML=`<span class="ico">${icon}</span><span>${name}</span>`;
  document.body.appendChild(fly);
  
  const fw=fly.offsetWidth, fh=fly.offsetHeight;
  // Calcolo delle coordinate centrali iniziali e finali
  const sx=start.left+start.width/2-fw/2, sy=start.top+start.height/2-fh/2;
  const tx=target.left+target.width/2-fw/2, ty=target.top+target.height/2-fh/2;
  
  // Posiziona l'elemento dove si trova il click
  fly.style.left=sx+'px'; fly.style.top=sy+'px';
  
  // Esegue l'animazione calcolando l'arco e la distanza verso il calderone usando la Web Animations API
  fly.animate([
    {transform:'translate(0,0) scale(.85) rotate(-5deg)',opacity:.95},
    {transform: `translate(${(tx-sx)*.45}px,${(ty-sy)-120}px) scale(1.18) rotate(10deg)`, opacity:1},
    {transform: `translate(${tx-sx}px,${ty-sy}px) scale(.42) rotate(${correct?'-20deg':'35deg'})`, opacity:.98}
  ],{duration:920,easing:'cubic-bezier(.18,.85,.22,1)'}).onfinish=()=>{
    // Alla fine dell'animazione, rimuove l'elemento volante...
    fly.remove();
    // ... e genera l'anello luminoso sull'acqua del calderone (drop effect)
    const drop=document.createElement('span');
    drop.className='cauldron-drop '+(correct?'':'bad');
    drop.textContent=icon;
    document.querySelector('.cauldron').appendChild(drop);
    // Rimuove anche l'anello luminoso dopo un secondo
    setTimeout(()=>drop.remove(),1050);
  };
}

// Genera minuscole particelle ("scintille") di conferma visiva quando si azzecca l'ingrediente
function spark(el){
  const r=el.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const s=document.createElement('span');
    // Proprietà inline CSS della particella
    s.style.position='fixed';
    s.style.left=(r.left+r.width/2)+'px';
    s.style.top=(r.top+r.height/2)+'px';
    s.style.width='7px';s.style.height='7px';
    s.style.borderRadius='50%';s.style.background='#ffd66b';
    s.style.boxShadow='0 0 16px #ffd66b';
    s.style.zIndex=50;s.style.pointerEvents='none';
    
    // Genera coordinate di fuga casuali
    const x=(Math.random()-.5)*150,y=(Math.random()-.5)*120;
    
    // Anima la particella verso l'esterno facendola rimpicciolire ed esaurire
    s.animate([
      {transform:'translate(0,0) scale(1)',opacity:1},
      {transform:`translate(${x}px,${y}px) scale(.2)`,opacity:0}
    ],{duration:700,easing:'ease-out'}).onfinish=()=>s.remove(); // Distrugge la particella
    
    document.body.appendChild(s)
  }
}

// Chiama la renderizzazione iniziale delle pozioni per riempire la pagina
renderPotions();
