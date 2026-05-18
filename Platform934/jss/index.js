// Selezione degli elementi del DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const goToRegisterBtn = document.getElementById('go-to-register');
const goToLoginBtn = document.getElementById('go-to-login');
const PASSWORD_MIN_LENGTH = 8;
let latestRegisterRequestId = 0;

function getPasswordValidationError(password) {
    if (password.length < PASSWORD_MIN_LENGTH) {
        return `La parola d'ordine deve avere almeno ${PASSWORD_MIN_LENGTH} caratteri.`;
    }

    if (!/[A-Z]/.test(password)) {
        return "La parola d'ordine deve contenere almeno una lettera maiuscola.";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return "La parola d'ordine deve contenere almeno un carattere speciale.";
    }

    return "";
}

function playLocalAuthUnlock() {
    return new Promise((resolve) => {
        const styleId = 'auth-unlock-style';

        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .auth-unlock-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 2147483647;
                    display: grid;
                    place-items: center;
                    overflow: hidden;
                    background:
                        radial-gradient(circle at center, rgba(255, 220, 130, .28), transparent 24%),
                        radial-gradient(circle at 50% 58%, rgba(139, 92, 246, .32), transparent 40%),
                        rgba(2, 1, 8, .92);
                    backdrop-filter: blur(10px);
                    pointer-events: none;
                }

                .auth-unlock-ring {
                    position: absolute;
                    width: min(420px, 72vw);
                    aspect-ratio: 1;
                    border: 2px solid rgba(255, 218, 112, .72);
                    border-radius: 50%;
                    box-shadow: 0 0 34px rgba(255, 218, 112, .5), inset 0 0 34px rgba(139, 92, 246, .3);
                    animation: authRing 2.45s ease both;
                }

                .auth-unlock-wand {
                    position: absolute;
                    width: min(330px, 70vw);
                    height: 13px;
                    border-radius: 999px;
                    background: linear-gradient(90deg, #1b0903, #6b3512 42%, #f1cf83);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, .65), 0 0 24px rgba(255, 218, 112, .45);
                    transform-origin: 92% 50%;
                    animation: authWand 2.25s cubic-bezier(.16, .84, .22, 1) both;
                }

                .auth-unlock-wand::after {
                    content: "";
                    position: absolute;
                    right: -12px;
                    top: 50%;
                    width: 24px;
                    height: 24px;
                    transform: translateY(-50%);
                    border-radius: 50%;
                    background: #fff8c7;
                    box-shadow: 0 0 22px #fff, 0 0 54px #ffd76f, 0 0 96px #8b5cf6;
                }

                .auth-unlock-slash {
                    position: absolute;
                    width: min(560px, 84vw);
                    height: 5px;
                    border-radius: 999px;
                    background: linear-gradient(90deg, transparent, #fff8c7, #ffd76f, #8b5cf6, transparent);
                    box-shadow: 0 0 22px rgba(255, 215, 111, .95), 0 0 54px rgba(139, 92, 246, .7);
                    transform: rotate(-18deg) scaleX(0);
                    animation: authSlash 1.55s .42s ease both;
                }

                .auth-unlock-title {
                    position: absolute;
                    left: 50%;
                    top: calc(50% + 118px);
                    transform: translateX(-50%);
                    width: min(92vw, 900px);
                    color: #ffd76f;
                    font-family: Georgia, "Times New Roman", serif;
                    font-size: clamp(2.2rem, 7vw, 5.4rem);
                    font-weight: 900;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    text-align: center;
                    text-shadow: 0 0 18px rgba(255, 215, 111, .8), 0 0 48px rgba(139, 92, 246, .55), 0 8px 24px #000;
                    opacity: 0;
                    animation: authTitle 1.35s .75s ease both;
                }

                .auth-unlock-spark {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #ffd76f;
                    box-shadow: 0 0 14px #ffd76f, 0 0 30px rgba(139, 92, 246, .7);
                    animation: authSpark 1.55s ease-out both;
                }

                .auth-unlock-overlay.closing {
                    animation: authClose .45s ease forwards;
                }

                @keyframes authRing {
                    from { opacity: 0; transform: scale(.25) rotate(0deg); }
                    45% { opacity: 1; }
                    to { opacity: .75; transform: scale(1.08) rotate(180deg); }
                }

                @keyframes authWand {
                    0% { opacity: 0; transform: translate(-46vw, 22vh) rotate(-38deg) scale(.72); }
                    18% { opacity: 1; }
                    52% { transform: translate(-2vw, -2vh) rotate(-18deg) scale(1.05); }
                    82% { opacity: 1; transform: translate(12vw, 1vh) rotate(-10deg) scale(1); }
                    100% { opacity: 0; transform: translate(44vw, -20vh) rotate(18deg) scale(.9); }
                }

                @keyframes authSlash {
                    0% { opacity: 0; transform: rotate(-18deg) scaleX(0); }
                    35% { opacity: 1; transform: rotate(-18deg) scaleX(1); }
                    100% { opacity: 0; transform: rotate(-18deg) scaleX(1.2); }
                }

                @keyframes authTitle {
                    from { opacity: 0; transform: translate(-50%, 24px) scale(.92); filter: blur(10px); }
                    to { opacity: 1; transform: translate(-50%, 0) scale(1); filter: blur(0); }
                }

                @keyframes authSpark {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(.3); }
                    20% { opacity: 1; }
                    100% { opacity: 0; transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(.1); }
                }

                @keyframes authClose {
                    to { opacity: 0; transform: scale(1.05); filter: blur(16px); }
                }
            `;
            document.head.appendChild(style);
        }

        const overlay = document.createElement('div');
        overlay.className = 'auth-unlock-overlay';

        const ring = document.createElement('div');
        ring.className = 'auth-unlock-ring';

        const slash = document.createElement('div');
        slash.className = 'auth-unlock-slash';

        const wand = document.createElement('div');
        wand.className = 'auth-unlock-wand';

        const title = document.createElement('div');
        title.className = 'auth-unlock-title';
        title.textContent = 'Alohomora';

        overlay.appendChild(ring);
        overlay.appendChild(slash);
        overlay.appendChild(wand);
        overlay.appendChild(title);

        for (let i = 0; i < 34; i++) {
            const spark = document.createElement('span');
            const angle = Math.random() * Math.PI * 2;
            const distance = 110 + Math.random() * 260;

            spark.className = 'auth-unlock-spark';
            spark.style.setProperty('--x', Math.cos(angle) * distance + 'px');
            spark.style.setProperty('--y', Math.sin(angle) * distance + 'px');
            spark.style.animationDelay = Math.random() * 550 + 'ms';
            overlay.appendChild(spark);
        }

        document.body.appendChild(overlay);

        setTimeout(() => overlay.classList.add('closing'), 2750);
        setTimeout(() => {
            overlay.remove();
            resolve();
        }, 3300);
    });
}

async function playAuthUnlock() {
    await playLocalAuthUnlock();
}

// --- TRANSIZIONI TRA LOGIN E REGISTRAZIONE ---
goToRegisterBtn.addEventListener('click', () => {
    loginForm.classList.remove('active');
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    registerForm.classList.add('active');
});

goToLoginBtn.addEventListener('click', () => {
    registerForm.classList.remove('active');
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    loginForm.classList.add('active');
});

// --- LOGICA DI REGISTRAZIONE COLLEGATA AL PHP ---
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const username = document.getElementById('reg-username').value.trim();
    // ECCO LA MODIFICA: Catturiamo anche l'email dal form!
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const passwordError = getPasswordValidationError(password);

    if (passwordError) {
        window.pfAlertMessage(passwordError, { min: PASSWORD_MIN_LENGTH });
        return;
    }

    const requestId = ++latestRegisterRequestId;
    const submitButton = registerForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    
    try {
        // Invia i dati al file register.php
        const response = await fetch('php/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // ECCO LA MODIFICA: Inseriamo anche l'email nel pacchetto JSON
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        if (requestId !== latestRegisterRequestId) return;
        
        if(data.success) {
            registerForm.reset();
            window.pfAlertMessage(data.message);
            goToLoginBtn.click(); // Torna automaticamente alla schermata di login
        } else {
            window.pfAlertMessage(data.message);
        }
    } catch (error) {
        if (requestId !== latestRegisterRequestId) return;
        window.pfAlert("communication_error");
        console.error(error);
    } finally {
        if (requestId === latestRegisterRequestId && submitButton) {
            submitButton.disabled = false;
        }
    }
});

// --- LOGICA DI LOGIN COLLEGATA AL PHP ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    try {
        // Invia i dati al file login.php
        const response = await fetch('php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if(data.success) {
            // Salva comunque un piccolo dato per il JS (es. per mostrare il nome nella navbar)
            sessionStorage.setItem('activeWizard', username);
            await playAuthUnlock();
            window.location.href = 'homepage.html';
        } else {
            window.pfAlertMessage(data.message);
        }
    } catch (error) {
        window.pfAlert("communication_error");
        console.error(error);
    }
});
