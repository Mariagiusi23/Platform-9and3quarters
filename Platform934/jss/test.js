// Il database delle bacchette (stesso dello shop)
const wands = [
    { id: 1, name: "Bacchetta di Harry Potter", wood: "Agrifoglio", core: "Piuma di Fenice", length: "11 pollici" },
    { id: 2, name: "Bacchetta di Hermione Granger", wood: "Vite", core: "Corda di Cuore di Drago", length: "10 pollici e ¾" },
    { id: 3, name: "Bacchetta di Ron Weasley", wood: "Salice", core: "Crine di Unicorno", length: "14 pollici" },
    { id: 4, name: "La Bacchetta di Sambuco", wood: "Sambuco", core: "Crine di Thestral", length: "15 pollici" },
    { id: 5, name: "Bacchetta di Draco Malfoy", wood: "Biancospino", core: "Crine di Unicorno", length: "10 pollici" },
    { id: 6, name: "Bacchetta di Lord Voldemort", wood: "Tasso", core: "Piuma di Fenice", length: "13 pollici e ½" }
];

// Le domande del Test
// Ogni wandId corrisponde all'ID della bacchetta che riceverà 1 punto se viene selezionata quell'opzione
const questions = [
    {
        question: "Davanti a un pericolo imminente, come reagisci?",
        options: [
            { text: "Lo affronto a testa alta, costi quel che costi.", wandId: 1 }, 
            { text: "Cerco una soluzione logica, magari ricordando qualcosa letto in un libro.", wandId: 2 }, 
            { text: "Mi preoccupo prima di tutto di proteggere i miei amici.", wandId: 3 },
            { text: "Sfrutto la situazione a mio vantaggio per uscirne vincitore.", wandId: 5 } 
        ]
    },
    {
        question: "Se potessi scegliere un oggetto magico da portare sempre con te, sceglieresti...",
        options: [
            { text: "Un mantello dell'invisibilità.", wandId: 1 }, 
            { text: "Una Giratempo per fare più cose.", wandId: 2 }, 
            { text: "Qualcosa di divertente, come i Tiri Vispi Weasley.", wandId: 3 }, 
            { text: "Un manufatto oscuro e di potere inestimabile.", wandId: 6 } 
        ]
    },
    {
        question: "Quale di queste creature magiche ti affascina maggiormente?",
        options: [
            { text: "La Fenice, simbolo di rinascita e lealtà.", wandId: 1 }, 
            { text: "Il Drago, fiero e inarrestabile.", wandId: 2 }, 
            { text: "Il Thestral, incompreso e misterioso.", wandId: 4 }, 
            { text: "L'Unicorno, puro e sfuggente.", wandId: 5 } 
        ]
    },
    {
        question: "Qual è il tuo ambiente ideale per riflettere?",
        options: [
            { text: "Il calore della Sala Comune di fronte al fuoco.", wandId: 3 }, 
            { text: "Il silenzio assoluto della Biblioteca di Hogwarts.", wandId: 2 }, 
            { text: "I sotterranei freddi e calcolatori.", wandId: 5 }, 
            { text: "L'oscurità della Foresta Proibita.", wandId: 6 } 
        ]
    },
    {
        question: "Qual è la tua ambizione più grande?",
        options: [
            { text: "Sconfiggere le ingiustizie e proteggere i deboli.", wandId: 1 }, 
            { text: "Avere una conoscenza sconfinata della magia.", wandId: 2 },
            { text: "Raggiungere il potere assoluto, a qualunque costo.", wandId: 6 },
            { text: "Possedere una magia imbattibile e leggendaria.", wandId: 4 } 
        ]
    }
];


let currentQuestionIndex = 0;
// Oggetto per tenere traccia dei punti di ogni bacchetta, ho id bacchetta : punteggio
let scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

// Elementi del DOM
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const resultCard = document.getElementById('result-card');
const returnBtn = document.querySelector('.return-btn');

checkAssignedWand();

// Inizia il quiz
startBtn.addEventListener('click', () => {
    startQuiz();
});

function resetScores() {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
}

function getWandDescription(wand) {
    if (!wand) return "La bacchetta conserva un mistero che solo il suo mago potra rivelare.";

    const descriptions = {
        1: "Agrifoglio e piuma di fenice: una bacchetta legata al coraggio, alla protezione e alle scelte difficili fatte per il bene degli altri.",
        2: "Vite e corda di cuore di drago: una bacchetta brillante, precisa, adatta a chi cerca conoscenza e sa trasformarla in azione.",
        3: "Salice e crine di unicorno: una bacchetta leale e sensibile, perfetta per chi trova forza negli affetti e nella fiducia.",
        4: "Sambuco e crine di Thestral: una bacchetta rara e potente, destinata a chi non teme il peso delle grandi responsabilita.",
        5: "Biancospino e crine di unicorno: una bacchetta complessa, elegante, capace di seguire chi conosce bene ambizione e disciplina.",
        6: "Tasso e piuma di fenice: una bacchetta intensa e decisa, adatta a una magia determinata, profonda e difficile da ignorare."
    };

    return descriptions[wand.id] || "La bacchetta conserva un mistero che solo il suo mago potra rivelare.";
}

function renderWandCard(wand, extraHtml = '') {
    resultCard.innerHTML = `
        <div style="font-size: 4rem; filter: drop-shadow(0 0 10px rgba(255,200,120,0.5)); margin-bottom: 1rem;">🪄</div>
        <h3>${wand.name}</h3>
        <p><strong>Legno:</strong> ${wand.wood}</p>
        <p><strong>Nucleo:</strong> ${wand.core}</p>
        <p><strong>Lunghezza:</strong> ${wand.length}</p>
        <p style="margin-top: 1rem; font-style: italic; color: #aaa;">${getWandDescription(wand)}</p>
        ${extraHtml}
    `;
}

async function checkAssignedWand() {
    startBtn.disabled = true;
    startBtn.textContent = "Consulto Olivander...";

    try {
        const response = await fetch('php/get_profile.php');
        const data = await response.json();
        const savedWandName = data?.user?.wand;
        const savedWand = wands.find(wand => wand.name === savedWandName);

        if (data.success && savedWand) {
            showAssignedWand(savedWand);
            return;
        }
    } catch (error) {
        console.error("Impossibile controllare la bacchetta salvata:", error);
    }

    startBtn.disabled = false;
    startBtn.textContent = "Inizia il Test";
}

function showAssignedWand(wand) {
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('active');

    renderWandCard(wand, `<p style="margin-top:1rem;"><em>Olivander ha gia registrato questa bacchetta come tua.</em></p>`);

    if (returnBtn) returnBtn.style.display = 'inline-flex';
}

function startQuiz() {
    currentQuestionIndex = 0;
    scores = resetScores();
    resultCard.innerHTML = '';

    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    resultScreen.classList.remove('active');
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    questionScreen.classList.add('active');

    if (returnBtn) returnBtn.style.display = 'none';

    showQuestion();
}

// Mostra la domanda corrente
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Domanda ${currentQuestionIndex + 1} di ${questions.length}`;
    
    optionsContainer.innerHTML = ''; // Pulisce le opzioni precedenti
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        
        button.addEventListener('click', () => selectAnswer(option.wandId));
        optionsContainer.appendChild(button);
    });
}

// Gestisce la scelta dell'utente
function selectAnswer(wandId) {
    // Assegna il punto alla bacchetta corrispondente
    scores[wandId]++;
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
}

// Calcola il vincitore e mostra il risultato
async function calculateResult() {
    let winningWandId = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const winningWand = wands.find(w => w.id == winningWandId);
    
    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('active');

    renderWandCard(winningWand, `
        <p style="margin-top:1rem;"><em>Ti riconosci in questa bacchetta?</em></p>
        <p>Se non ti sembra quella giusta, puoi rifare il test: a volte anche una bacchetta vuole farsi desiderare.</p>
        <div class="result-actions" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
            <button id="confirm-wand-btn" class="quiz-btn" type="button">Si, e' la mia</button>
            <button id="retry-wand-btn" class="quiz-btn" type="button">No, rifaccio il test</button>
        </div>
        <p id="save-wand-status" style="margin-top:1rem;"></p>
    `);

    const saveStatus = document.getElementById('save-wand-status');
    const confirmWandBtn = document.getElementById('confirm-wand-btn');
    const retryWandBtn = document.getElementById('retry-wand-btn');

    confirmWandBtn.addEventListener('click', () => saveWand(winningWand, saveStatus, confirmWandBtn, retryWandBtn));
    retryWandBtn.addEventListener('click', startQuiz);
}

async function saveWand(winningWand, saveStatus, confirmWandBtn, retryWandBtn) {
    saveStatus.innerHTML = `<em>Registrazione della bacchetta in corso...</em>`;
    confirmWandBtn.disabled = true;
    retryWandBtn.disabled = true;

    try {
        const response = await fetch('php/save_wand.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wand: winningWand.name })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Salvataggio non riuscito.");
        }

        saveStatus.innerHTML = `<em>La bacchetta è stata registrata da Olivander.</em>`;
        confirmWandBtn.textContent = "Bacchetta salvata";
        window.setTimeout(() => showAssignedWand(winningWand), 700);
    } catch (error) {
        console.error("Errore durante il salvataggio nel database:", error);
        saveStatus.innerHTML = `<em>La bacchetta e' stata scelta, ma non e' stata salvata nel database.</em>`;
        confirmWandBtn.disabled = false;
        retryWandBtn.disabled = false;
    }
}
