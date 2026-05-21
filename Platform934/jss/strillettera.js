(function () {
    if (window.PF_HOWLER_INITIALIZED) return;
    window.PF_HOWLER_INITIALIZED = true;

    function initHowlerListener() {
    
    let currentHowlerText = "";
    const howlerModal = document.getElementById('howler-modal');
    const howlerEnvelope = document.getElementById('howler-envelope');
    const howlerSender = document.getElementById('howler-sender');
    const howlerAshes = document.getElementById('howler-ashes');

    if (!howlerModal || !howlerEnvelope || !howlerSender || !howlerAshes) return;

    // Controlla ogni 10 secondi se ci sono gufi in arrivo
    setInterval(checkPigeonPost, 10000);
    window.PF_CHECK_HOWLER = checkPigeonPost;
    // Controlla anche subito al caricamento della pagina
    checkPigeonPost();

    async function checkPigeonPost() {
        try {
            const res = await fetch('php/check_howler.php');
            const data = await res.json();

            if (data.success && data.howler) {
                // Strillettera ricevuta
                currentHowlerText = data.howler.testo;
                howlerSender.innerText = data.howler.mittente;
                
                // Resett UI
                howlerEnvelope.classList.remove('hidden');
                howlerAshes.classList.add('hidden');
                howlerModal.classList.remove('hidden');
            }
        } catch (e) {
            console.error("Errore nella Voliera:", e);
        }
    }

    // Dopo il click dell'utente (apertuta lettera) 
    howlerEnvelope.addEventListener('click', () => {
        howlerEnvelope.style.animation = 'none'; // Smette di tremare
        howlerEnvelope.style.transform = 'scale(2)';
        howlerEnvelope.style.opacity = '0'; // Scompare
        howlerEnvelope.style.transition = '0.2s';
        
        setTimeout(() => {
            howlerEnvelope.classList.add('hidden');
            unleashHowler(currentHowlerText);
        }, 200);
    });

function unleashHowler(text) {
        // Web audio API
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Usiamo un oscillatore di tipo triangle 
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(50, audioCtx.currentTime); 
        
        // Abbassiamo il volume di partenza
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();

        // Web Speech API
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            
            utterance.lang = 'it-IT';
            utterance.pitch = 0.1; 
            utterance.rate = 1.3;  
            utterance.volume = 1.0; 

            // Cosa fa quando smette di parlare
            utterance.onend = () => {
                
                // Spegne l'oscillatore 
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
                setTimeout(() => {
                    oscillator.stop();
                }, 500);

                howlerAshes.classList.remove('hidden');
                
                // Chiude tutto dopo 3 secondi
                setTimeout(() => {
                    howlerModal.classList.add('hidden');
                    // Riporta la busta allo stato iniziale
                    howlerEnvelope.style.opacity = '1';
                    howlerEnvelope.style.transform = 'scale(1)';
                }, 3000);
            };

            // Parte la voce
            synth.speak(utterance);
        } else {
            window.pfAlert("howler_voice_unsupported", { text });
        }
    }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHowlerListener, { once: true });
    } else {
        initHowlerListener();
    }
})();
