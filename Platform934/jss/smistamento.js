const questions = [
    {
        question: "Cosa apprezzi di più in te stesso?",
        options: [
            { text: "Il coraggio e l'audacia", house: "Grifondoro" },
            { text: "L'intelligenza e la curiosità", house: "Corvonero" },
            { text: "La lealtà e la pazienza", house: "Tassorosso" },
            { text: "L'ambizione e l'astuzia", house: "Serpeverde" }
        ]
    },
    {
        question: "Se trovassi un portafoglio pieno d'oro per strada, cosa faresti?",
        options: [
            { text: "Cercherei il proprietario per restituirlo, è la cosa giusta da fare.", house: "Tassorosso" },
            { text: "Lo terrei. La fortuna aiuta gli audaci.", house: "Serpeverde" },
            { text: "Lo userei per finanziare i miei progetti o comprare libri rari.", house: "Corvonero" },
            { text: "Lo darei a chi ne ha più bisogno in quel momento.", house: "Grifondoro" }
        ]
    },
    {
        question: "Quale materia attira di più la tua attenzione?",
        options: [
            { text: "Difesa contro le Arti Oscure", house: "Grifondoro" },
            { text: "Pozioni", house: "Serpeverde" },
            { text: "Cura delle Creature Magiche", house: "Tassorosso" },
            { text: "Incantesimi", house: "Corvonero" }
        ]
    },
    {
        question: "Come vuoi essere ricordato nella storia?",
        options: [
            { text: "Come il più saggio.", house: "Corvonero" },
            { text: "Come il più leale.", house: "Tassorosso" },
            { text: "Come il più audace.", house: "Grifondoro" },
            { text: "Come il più grande.", house: "Serpeverde" }
        ]
    }
];

let currentQuestionIndex = 0;
let scores = { "Grifondoro": 0, "Corvonero": 0, "Tassorosso": 0, "Serpeverde": 0 };

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const resultCard = document.getElementById('result-card');
const houseDescriptions = {
    Grifondoro: "Hai coraggio, istinto e un senso forte di giustizia. La tua magia nasce dalla capacità di agire anche quando sarebbe più facile restare fermo.",
    Corvonero: "Hai mente curiosa, spirito creativo e amore per ciò che non è ovvio. La tua forza sta nel cercare risposte nuove e guardare il mondo da angolazioni inattese.",
    Tassorosso: "Hai lealtà, pazienza e una generosità concreta. La tua magia vive nella costanza, nella cura degli altri e nel valore che dai alle promesse.",
    Serpeverde: "Hai ambizione, intuito e capacità di scegliere con strategia. La tua forza sta nel vedere possibilità dove altri vedono solo ostacoli."
};
const houseColors = {
    Grifondoro: "#c50000",
    Serpeverde: "#107c10",
    Corvonero: "#005ea2",
    Tassorosso: "#e3a000"
};

checkAssignedHouse();

startBtn.addEventListener('click', () => {
    startQuiz();
});

async function checkAssignedHouse() {
    startBtn.disabled = true;
    startBtn.textContent = "Consulto gli archivi...";

    try {
        const response = await fetch('php/get_profile.php');
        const data = await response.json();
        const savedHouse = data?.user?.house;

        if (data.success && savedHouse && houseDescriptions[savedHouse]) {
            showAssignedHouse(savedHouse);
            return;
        }
    } catch (error) {
        console.error("Impossibile controllare la casata salvata:", error);
    }

    startBtn.disabled = false;
    startBtn.textContent = "Indossa il Cappello";
}

function showAssignedHouse(house) {
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('active');

    const color = houseColors[house] || "#d9b44a";

    resultCard.innerHTML = `
        <h3 style="color: ${color}; font-size: 2.5rem;">SEI DI ${house.toUpperCase()}</h3>
        <p>${houseDescriptions[house]}</p>
        <p style="margin-top:1rem;"><em>Il Cappello Parlante ha gia registrato la tua casata.</em></p>
    `;
}

function startQuiz() {
    currentQuestionIndex = 0;
    scores = { "Grifondoro": 0, "Corvonero": 0, "Tassorosso": 0, "Serpeverde": 0 };
    resultCard.innerHTML = '';

    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    resultScreen.classList.remove('active');
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    questionScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.innerText = q.question;
    progressText.innerText = `Domanda ${currentQuestionIndex + 1} di ${questions.length}`;
    
    optionsContainer.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => selectAnswer(opt.house));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(house) {
    scores[house]++;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
}

async function calculateResult() {
    let winningHouse = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('active');
    
    let color = houseColors[winningHouse] || "#d9b44a";

    resultCard.innerHTML = `
        <h3 style="color: ${color}; font-size: 2.5rem;">${winningHouse.toUpperCase()}!</h3>
        <p>Il Cappello ha visto nella tua mente e ha fatto la sua scelta.</p>
        <p style="margin-top:1rem;"><em>Ti identifichi in questa casata?</em></p>
        <p>Se non ti sembra quella giusta, puoi rifare il test: anche il Cappello a volte ha bisogno di ascoltare meglio.</p>
        <div class="result-actions" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
            <button id="confirm-house-btn" class="quiz-btn" type="button">Si, mi rappresenta</button>
            <button id="retry-house-btn" class="quiz-btn" type="button">No, rifaccio il test</button>
        </div>
        <p id="save-house-status" style="margin-top:1rem;"></p>
    `;

    const saveStatus = document.getElementById('save-house-status');
    const confirmHouseBtn = document.getElementById('confirm-house-btn');
    const retryHouseBtn = document.getElementById('retry-house-btn');

    confirmHouseBtn.addEventListener('click', () => saveHouse(winningHouse, saveStatus, confirmHouseBtn, retryHouseBtn));
    retryHouseBtn.addEventListener('click', startQuiz);
}

async function saveHouse(winningHouse, saveStatus, confirmHouseBtn, retryHouseBtn) {
    saveStatus.innerHTML = `<em>Registrazione della casata in corso...</em>`;
    confirmHouseBtn.disabled = true;
    retryHouseBtn.disabled = true;

    try {
        const response = await fetch('php/save_house.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ house: winningHouse })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Salvataggio non riuscito.");
        }

        saveStatus.innerHTML = `<em>Il risultato è stato registrato all'Ufficio Misteri.</em>`;
        confirmHouseBtn.textContent = "Casata salvata";
        window.setTimeout(() => showAssignedHouse(winningHouse), 700);
    } catch (error) {
        console.error("Errore di salvataggio:", error);
        saveStatus.innerHTML = `<em>La casata e' stata scelta, ma non e' stata salvata nel database.</em>`;
        confirmHouseBtn.disabled = false;
        retryHouseBtn.disabled = false;
    }
}
