import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener("DOMContentLoaded", async () => {
    
    // ==========================================
    // 1. IMPOSTAZIONI MOTORE 3D (THREE.JS)
    // ==========================================
    const container = document.getElementById('3d-canvas-container');
    const loadingText = document.getElementById('loading-spell');
    const selectAvatar = document.getElementById('select-avatar');
    
    // Creazione della scena
    const scene = new THREE.Scene();
    
    // Impostazione telecamera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 4); // Posizione iniziale: guarda verso il centro
    
    // Renderizzatore magico
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Controlli del mouse (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false; // Disabilitiamo il pan col mouse per dare precedenza ai nostri bottoni
    controls.minDistance = 1.5; // Zoom massimo
    controls.maxDistance = 6;   // Zoom minimo
    controls.target.set(0, 1, 0); // Punta all'altezza del petto del modello
    controls.update();

    // Luci (Luce ambientale + Luce direzionale per dare profondità)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd700, 0.8); 
    dirLight.position.set(2, 5, 5);
    scene.add(dirLight);

    // Adatta la telecamera se la finestra del browser cambia grandezza
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Motore di animazione continuo (Loop)
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // ==========================================
    // 2. CARICAMENTO DELL'AVATAR SCELTO
    // ==========================================
    const loader = new GLTFLoader();
    let currentModel = null; // Memoria per il modello attualmente a schermo

    function loadAvatar(filename) {
        loadingText.style.display = 'block';
        loadingText.innerText = 'Evocazione in corso...';
        
        const path = `models/${filename}`;
        
        loader.load(path, (gltf) => {
            // Rimuove il vecchio avatar prima di caricare il nuovo
            if (currentModel) {
                scene.remove(currentModel);
            }
            
            currentModel = gltf.scene;
            currentModel.position.set(0, 0, 0); // Centra il modello
            scene.add(currentModel);
            
            loadingText.style.display = 'none'; // Nasconde il testo di caricamento
        }, undefined, (error) => {
            console.warn(`Errore magico: Impossibile trovare il file ${path}.`);
            loadingText.innerText = `Errore: File ${filename} non trovato.`;
        });
    }

    // Cambia modello in tempo reale appena si fa una scelta dalla tendina
    selectAvatar.addEventListener('change', () => loadAvatar(selectAvatar.value));

    // ==========================================
    // 3. CONTROLLI A SCHERMO (PULSANTI ZOOM E SPOSTAMENTO)
    // ==========================================
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnMoveUp = document.getElementById('btn-move-up');
    const btnMoveDown = document.getElementById('btn-move-down');
    const btnReset = document.getElementById('btn-reset');

    const panSpeed = 0.2;  // Sensibilità dello spostamento verticale
    const zoomSpeed = 0.5; // Sensibilità dello zoom

    btnZoomIn.addEventListener('click', () => {
        camera.translateZ(-zoomSpeed); 
        controls.update();
    });

    btnZoomOut.addEventListener('click', () => {
        camera.translateZ(zoomSpeed); 
        controls.update();
    });

    btnMoveUp.addEventListener('click', () => {
        camera.position.y += panSpeed;
        controls.target.y += panSpeed;
        controls.update();
    });

    btnMoveDown.addEventListener('click', () => {
        camera.position.y -= panSpeed;
        controls.target.y -= panSpeed;
        controls.update();
    });

    btnReset.addEventListener('click', () => {
        camera.position.set(0, 1.5, 4);
        controls.target.set(0, 1, 0);
        controls.update();
    });

// ==========================================
    // 4. DATABASE, INTERFACCIA E PROFILO
    // ==========================================
    
    // Elementi dell'interfaccia Avatar
    const viewModeContainer = document.getElementById('view-mode-container');
    const editModeContainer = document.getElementById('edit-mode-container');
    const editAvatarBtn = document.getElementById('edit-avatar-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    
    // Variabile per ricordare quale avatar aveva l'utente prima di iniziare a modificare
    let savedAvatarUrl = "mago_grifondoro.glb";

    // Funzione magica per cambiare la vista dell'interfaccia
    function toggleEditMode(showEdit) {
        if (showEdit) {
            viewModeContainer.classList.add('hidden');
            editModeContainer.classList.remove('hidden');
        } else {
            editModeContainer.classList.add('hidden');
            viewModeContainer.classList.remove('hidden');
        }
    }

    // A. Carica i dati all'apertura della pagina
    try {
        const res = await fetch('php/get_profile.php');
        const data = await res.json();
        
        if (data.success) {
            document.getElementById('prof-username').value = data.user.username;
            document.getElementById('prof-email').value = data.user.email || "";
            document.getElementById('nav-username').innerText = data.user.username;
            document.getElementById('profile-vault-number').innerText = data.user.numero_caveau || "Non assegnato";
            document.getElementById('profile-vault-balance').innerText = data.user.soldi_caveau ?? 0;

            // Se l'utente ha un avatar salvato
            if (data.user.avatar_url && data.user.avatar_url.includes('.glb')) {
                savedAvatarUrl = data.user.avatar_url;
                selectAvatar.value = savedAvatarUrl;
                toggleEditMode(false); // Mostra la modalità "Visualizzazione"
            } else {
                // Se NON ha un avatar salvato (nuovo utente), mostriamo subito l'editor
                toggleEditMode(true);
            }
            
            // Renderizza il modello 3D
            loadAvatar(selectAvatar.value);
        }
    } catch (e) {
        console.error("Errore di connessione al database:", e);
    }

    // B. Gestione dei Pulsanti dell'Interfaccia Avatar
    
    // Clicca "Modifica"
    editAvatarBtn.addEventListener('click', () => {
        toggleEditMode(true);
    });

    // Clicca "Annulla" (Rimette l'avatar precedente)
    cancelEditBtn.addEventListener('click', () => {
        selectAvatar.value = savedAvatarUrl; // Torna al valore salvato
        loadAvatar(savedAvatarUrl);          // Ricarica il modello vecchio in 3D
        toggleEditMode(false);               // Torna alla vista chiusa
    });

    // Clicca "Conferma questo Avatar"
    document.getElementById('save-avatar-btn').addEventListener('click', async () => {
        const newAvatar = selectAvatar.value;
        
        const res = await fetch('php/update_profile.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'avatar3d', avatar_url: newAvatar })
        });
        
        const data = await res.json();
        
        // Se il salvataggio va a buon fine, aggiorniamo la variabile e chiudiamo l'editor
        if(data.success) {
            savedAvatarUrl = newAvatar;
            toggleEditMode(false);
            window.pfAlert("avatar_saved", { message: window.pfTranslateMessage(data.message) });
        } else {
            window.pfAlert("avatar_error");
        }
    });

    // C. Aggiorna Dati Account (Nickname ed Email)
    document.getElementById('update-profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
            action: 'profile',
            username: document.getElementById('prof-username').value,
            email: document.getElementById('prof-email').value
        };
        const res = await fetch('php/update_profile.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        window.pfAlertMessage(data.message);
        
        if(data.success) {
            sessionStorage.setItem('activeWizard', data.new_username);
            document.getElementById('nav-username').innerText = data.new_username;
        }
    });

    // D. Cambio Password Diretto
    document.getElementById('change-password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const oldPass = document.getElementById('old-pass').value;
        const newPass = document.getElementById('new-pass').value;

        const res = await fetch('php/update_profile.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'change_password', oldPass, newPass })
        });
        const data = await res.json();
        window.pfAlertMessage(data.message);
        if(data.success) {
            document.getElementById('change-password-form').reset();
        }
    });

    document.getElementById('logout-btn')?.addEventListener('click', async () => {
        try {
            await fetch('php/logout.php', { method: 'POST' });
        } catch (error) {
            console.warn("Logout PHP non completato:", error);
        } finally {
            sessionStorage.removeItem('activeWizard');
            sessionStorage.removeItem('alohomora_shown');
            sessionStorage.removeItem('show_wand_unlock_after_auth');
            window.location.href = 'index.html';
        }
    });
});
