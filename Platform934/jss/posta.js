document.addEventListener("DOMContentLoaded", () => {
    const mailboxGrid = document.getElementById('mailbox-grid');
    const howlerModal = document.getElementById('howler-modal');
    const howlerEnvelope = document.getElementById('howler-envelope');
    const howlerSender = document.getElementById('howler-sender');
    const howlerAshes = document.getElementById('howler-ashes');
    
    const ashModal = document.getElementById('ash-modal');

    async function loadMailbox() {
        try {
            const res = await fetch('php/get_posta.php');
            const data = await res.json();

            if (data.success && data.lettere.length > 0) {
                mailboxGrid.innerHTML = '';
                data.lettere.forEach(letter => {
                    const div = document.createElement('div');
                    div.classList.add('mail-item');
                    
                    if (letter.letta == 0) {
                        div.classList.add('mail-unread');
                        div.innerHTML = `<h3>✉️ Strillettera!</h3><p>Da: ${letter.mittente}</p>`;
                        div.addEventListener('click', () => openUnreadHowler(letter));
                    } else {
                        div.classList.add('mail-read');
                        div.innerHTML = `<h3>🔥 Ceneri</h3><p>Da: ${letter.mittente}</p>`;
                        div.addEventListener('click', () => openReadAsh(letter));
                    }
                    mailboxGrid.appendChild(div);
                });
            } else {
                mailboxGrid.innerHTML = '<p style="text-align:center; width:100%;">Nessun gufo è ancora arrivato per te.</p>';
            }
        } catch (e) {
            console.error("Errore nel caricamento della posta:", e);
        }
    }

    // Apre una vecchia strillettera in silenzio
    function openReadAsh(letter) {
        document.getElementById('ash-sender').innerText = letter.mittente;
        document.getElementById('ash-text').innerText = letter.testo;
        ashModal.classList.remove('hidden');
    }

    // Apre una nuova strillettera
    function openUnreadHowler(letter) {
        howlerSender.innerText = letter.mittente;
        howlerEnvelope.classList.remove('hidden');
        howlerAshes.classList.add('hidden');
        howlerModal.classList.remove('hidden');
        
        // Segnala come letta nel database 
        fetch('php/mark_read.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: letter.id })
        });

        howlerEnvelope.style.transform = 'scale(2)';
        howlerEnvelope.style.opacity = '0';
        howlerEnvelope.style.transition = '0.2s';
        
        setTimeout(() => {
            howlerEnvelope.classList.add('hidden');
            unleashHowler(letter.testo);
        }, 200);
    }

    // La funzione audio
    function unleashHowler(text) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(50, audioCtx.currentTime); 
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();

        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            
            utterance.lang = 'it-IT';
            utterance.pitch = 0.1; 
            utterance.rate = 1.3;  
            utterance.volume = 1.0; 

            utterance.onend = () => {
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
                setTimeout(() => oscillator.stop(), 500);

                howlerAshes.classList.remove('hidden');
                
                setTimeout(() => {
                    howlerModal.classList.add('hidden');
                    howlerEnvelope.style.opacity = '1';
                    howlerEnvelope.style.transform = 'scale(1)';
                    loadMailbox(); // Ricarica la griglia e quindi la busta diventa grigia
                }, 3000);
            };

            synth.speak(utterance);
        }
    }

    loadMailbox();
});
