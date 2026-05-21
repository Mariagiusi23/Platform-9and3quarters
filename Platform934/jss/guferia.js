document.addEventListener("DOMContentLoaded", () => {
    const formHowler = document.getElementById('form-howler');
    const statusMsg = document.getElementById('howler-status');
    const btnSend = document.getElementById('btn-send-howler');

    formHowler.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const destinatario = document.getElementById('howler-to').value;
        const testo = document.getElementById('howler-text').value;

        btnSend.innerText = "Il gufo sta partendo...";
        btnSend.disabled = true;
        statusMsg.classList.add('hidden');

        try {
            const res = await fetch('php/send_howler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destinatario, testo })
            });

            const data = await res.json();

            statusMsg.classList.remove('hidden', 'success', 'error');
            if (data.success) {
                statusMsg.innerText = "Gufo inviato con successo! Il destinatario riceverà a breve la Strillettera.";
                statusMsg.classList.add('success');
                formHowler.reset();
                setTimeout(() => {
                    if (typeof window.PF_CHECK_HOWLER === 'function') {
                        window.PF_CHECK_HOWLER();
                    }
                }, 300);
            } else {
                statusMsg.innerText = "Errore: " + data.message;
                statusMsg.classList.add('error');
            }
        } catch (error) {
            statusMsg.innerText = "Impossibile raggiungere la Voliera. Riprova più tardi.";
            statusMsg.classList.remove('hidden');
            statusMsg.classList.add('error');
        } finally {
            btnSend.innerHTML = "🦉 Affida al Gufo";
            btnSend.disabled = false;
        }
    });
});
