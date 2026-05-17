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

    // 1. Controlla ogni 10 secondi se ci sono gufi in arrivo
    setInterval(checkPigeonPost, 10000);
    window.PF_CHECK_HOWLER = checkPigeonPost;
    // Controlla anche subito al caricamento della pagina
    checkPigeonPost();

    async function checkPigeonPost() {
        try {
            const res = await fetch('php/check_howler.php');
            const data = await res.json();

            if (data.success && data.howler) {
                // Abbiamo ricevuto una strillettera!
                currentHowlerText = data.howler.testo;
                howlerSender.innerText = data.howler.mittente;
                
                // Resetta la UI
                howlerEnvelope.classList.remove('hidden');
                howlerAshes.classList.add('hidden');
                howlerModal.classList.remove('hidden');
            }
        } catch (e) {
            console.error("Errore nella Voliera:", e);
        }
    }

    // 2. Apri e scatena l'audio (Richiede il Click dell'utente!)
    howlerEnvelope.addEventListener('click', () => {
        howlerEnvelope.style.animation = 'none'; // Smette di tremare
        howlerEnvelope.style.transform = 'scale(2)'; // Ti salta in faccia
        howlerEnvelope.style.opacity = '0'; // Scompare
        howlerEnvelope.style.transition = '0.2s';
        
        setTimeout(() => {
            howlerEnvelope.classList.add('hidden');
            unleashHowler(currentHowlerText);
        }, 200);
    });

function unleashHowler(text) {
        // --- WEB AUDIO API (Effetto ambiente minaccioso, ma controllato) ---
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Usiamo 'triangle' che è molto meno fastidiosa e gracchiante di 'sawtooth'
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(50, audioCtx.currentTime); 
        
        // Abbassiamo drasticamente il volume di partenza (0.2 invece di 1)
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();

        // --- WEB SPEECH API (La voce urlante) ---
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            
            utterance.lang = 'it-IT';
            utterance.pitch = 0.1; 
            utterance.rate = 1.3;  
            utterance.volume = 1.0; 

            // Cosa fare QUANDO FINISCE DI PARLARE
            utterance.onend = () => {
                
                // 1. Spegne l'oscillatore dolcemente in mezzo secondo
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
                setTimeout(() => {
                    oscillator.stop();
                }, 500);

                // 2. Mostra le ceneri
                howlerAshes.classList.remove('hidden');
                
                // 3. Chiudi tutto dopo 3 secondi
                setTimeout(() => {
                    howlerModal.classList.add('hidden');
                    // Riporta la busta allo stato originale per la prossima volta
                    howlerEnvelope.style.opacity = '1';
                    howlerEnvelope.style.transform = 'scale(1)';
                }, 3000);
            };

            // SCATENA LA VOCE
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
