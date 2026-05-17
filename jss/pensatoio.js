document.addEventListener("DOMContentLoaded", () => {
    const basin = document.getElementById('pensieve-basin');
    const btnExtract = document.getElementById('btn-extract');
    const modalAdd = document.getElementById('modal-add');
    const modalRead = document.getElementById('modal-read');
    const formMemory = document.getElementById('form-memory');

    let memories = [];

    // Funzione per pescare i ricordi dal Database
    async function fetchMemories() {
        try {
            const res = await fetch('php/get_ricordi.php');
            const data = await res.json();
            
            if (data.success) {
                memories = data.memories;
                renderMemories();
            } else {
                console.warn(data.message);
            }
        } catch (e) {
            console.error("Errore di legilimanzia:", e);
        }
    }

    // Genera i filamenti fluttuanti
    function renderMemories() {
        const oldWisps = document.querySelectorAll('.wisp');
        oldWisps.forEach(w => w.remove());

        memories.forEach((mem) => {
            const wisp = document.createElement('div');
            wisp.classList.add('wisp');
            
            // Posizione casuale
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 200; 
            const x = 250 + radius * Math.cos(angle) - 6; 
            const y = 250 + radius * Math.sin(angle) - 6;

            wisp.style.left = `${x}px`;
            wisp.style.top = `${y}px`;
            wisp.style.animationDelay = `${Math.random() * 5}s`;

            // Colore leggermente diverso per i ricordi "base" (tutti)
            if (mem.username === 'tutti') {
                wisp.style.boxShadow = "0 0 15px 5px rgba(255, 215, 0, 0.6)"; // Leggero riflesso dorato
            }

            wisp.addEventListener('click', () => openReadModal(mem));
            basin.appendChild(wisp);
        });
    }

    // Apre la pergamena per leggere
    function openReadModal(memory) {
        document.getElementById('read-title').innerText = memory.titolo;
        // Se la data c'è, la mostriamo, altrimenti niente
        document.getElementById('read-date').innerText = memory.data_creazione ? memory.data_creazione.substring(0, 10) : '';
        document.getElementById('read-text').innerText = memory.testo;
        
        const gifImg = document.getElementById('read-gif');
        if (memory.gif_url && memory.gif_url !== "") {
            gifImg.src = memory.gif_url;
            gifImg.style.display = "block";
        } else {
            gifImg.style.display = "none";
            gifImg.src = "";
        }

        modalRead.classList.remove('hidden');
    }

    // Chiusura Modali
    window.closeModals = function() {
        modalAdd.classList.add('hidden');
        modalRead.classList.add('hidden');
    }
    btnExtract.addEventListener('click', () => modalAdd.classList.remove('hidden'));

    // Salva un nuovo ricordo nel DB
    formMemory.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            titolo: document.getElementById('memory-title').value,
            gif_url: document.getElementById('memory-gif').value,
            testo: document.getElementById('memory-text').value
        };

        const res = await fetch('php/add_ricordo.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if(data.success) {
            closeModals();
            formMemory.reset();
            fetchMemories(); // Ricarica la bacinella per far apparire il nuovo globo!
        } else {
            window.pfAlertMessage(data.message); // Probabilmente l'utente non è loggato
        }
    });

    // All'avvio della pagina, pesca i ricordi
    fetchMemories();
});
