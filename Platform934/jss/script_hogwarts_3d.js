// === 1. IMPORTAZIONI E COSTANTI DI BASE ===
// Importa la libreria principale e i moduli per muovere la telecamera e caricare i file .glb
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ASSET_BASE = "Hogwarts Castle/"; // Cartella di origine per tutti i modelli 3D
const CASTLE_FILE = "hogwarts_colorato_vivo_omogeneo.glb"; // Nome del file del castello principale

// === 2. DATABASE DELLE ZONE VISITABILI ===
// Un array di oggetti. Ogni oggetto definisce un marker sul castello e i dettagli della stanza interna associata.
const VISITABLE_ZONES = [
  {
    id: "potions",
    name: "Sala delle Pozioni",
    file: "potions_classroom.glb",
    position: [-13, -31, 67], // Dove appare il pallino luminoso sul modello del castello
    camera: [32, 25.04, 7.6], // Dove viene posizionata la telecamera una volta entrati
    target: [0, 30, 0],       // Il punto esatto che la telecamera guarda
    rotation: [0.6, 1.2, -0.0645],
    scaleTo: 1700,            // Fattore per ingrandire/rimpicciolire il modello per renderlo proporzionato
    description: "Vuoi scendere nei sotterranei e visitare la Sala delle Pozioni?"
  },
  {
    id: "great-hall",
    name: "Sala Grande",
    file: "harry_potter_-_hogwarts_great_hall.glb",
    position: [58, -166, 110],
    camera: [0, 50, 150],
    target: [0, 35, 0],
    scaleTo: 300,
    description: "Vuoi entrare nella Sala Grande?"
  },
  {
    id: "grand-hall",
    name: "Atrio di Hogwarts",
    file: "hogwarts_grand_hall.glb",
    position: [120, 99, 91],
    camera: [-660.37, 98.80, 29.87],
    target: [-156.17, 16.25, 15.42],
    rotation: [-1.3975, -1.40589, -1.3952],
    scaleTo: 1200,
    description: "Vuoi esplorare l'Atrio di Hogwarts?"
  },
  {
    id: "dumbledore",
    name: "Ufficio di Silente",
    file: "dumbledores_officee_fixed.glb",
    position: [128, 26, 119],
    camera: [65.41, 33.98, 0.22],
    target: [0, 35, 0],
    rotation: [1.3558, 1.5548, -1.3558],
    scaleTo: 120,
    description: "Vuoi salire nell'Ufficio di Silente?"
  },
  {
    id: "gryffindor",
    name: "Sala Comune Grifondoro",
    file: "gryffindor_common_room.glb",
    position: [121, 26, 149],
    camera: [0, 55, 130],
    target: [0, 35, 0],
    scaleTo: 400,
    description: "Vuoi entrare nella Sala Comune di Grifondoro?"
  },
  {
    id: "corridor",
    name: "Corridoio di Hogwarts",
    file: "hogwarts_corridor.glb",
    position: [-15, -69, 125],
    camera: [61.28, 45.22, 473.90],
    target: [-26.62, 32.38, 7.49],
    rotation: [-0.0275, 0.1858, 0.0051],
    scaleTo: 500,
    description: "Vuoi percorrere il corridoio di Hogwarts?"
  },
  {
    id: "transfiguration",
    name: "Aula di Trasfigurazione",
    file: "transfiguration_class_fixed.glb",
    position: [31, 30, 97],
    camera: [56.06, 9.23, -1.64],
    target: [17.90, 16.82, 7.82],
    rotation: [2.4655, 1.2632, -2.4889],
    scaleTo: 115,
    description: "Vuoi entrare nell'Aula di Trasfigurazione?"
  },
];

// === 3. SETUP DEL MOTORE 3D (SCENA, CAMERA, RENDERER) ===
const scene = new THREE.Scene();
// Aggiunge nebbia per sfumare i confini del mondo 3D e creare un'atmosfera notturna
scene.fog = new THREE.Fog(0x070912, 85, 430);

// Crea la telecamera prospettica (Campo visivo 60°, proporzioni dello schermo, distanza minima/massima)
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 5000);
camera.position.set(-70, 127, -227.87); // Posizione iniziale della telecamera per guardare il castello

// Configura il Renderer (il motore che disegna effettivamente i pixel sul canvas)
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true, // Smussa i bordi seghettati dei modelli 3D
  alpha: true      // Sfondo trasparente per far vedere il CSS dietro
});

renderer.setClearColor(0x000000, 0); // Colore di sfondo vuoto
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); // Ottimizza per schermi Retina

function getSceneViewportSize() {
  const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navbar-height")) || 64;
  return {
    width: Math.max(1, Math.round(innerWidth)),
    height: Math.max(1, Math.round(innerHeight - navHeight))
  };
}

function syncRendererSize() {
  const { width, height } = getSceneViewportSize();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

syncRendererSize(); // Occupa l'area reale sotto la navbar, senza deformare il raycasting
// Setup dei colori per rendere le luci e i modelli molto più fotorealistici e vibranti
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

// Configurazione dei controlli del mouse/touch (OrbitControls)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Rende il movimento "scivoloso" e fluido
controls.dampingFactor = 0.06;
controls.minDistance = 25;  // Zoom massimo
controls.maxDistance = 520; // Zoom minimo (allontanamento massimo)

// Creazione dei "Gruppi" per gestire facilmente interi blocchi di elementi
const root = new THREE.Group();
scene.add(root);

const castleGroup = new THREE.Group();   // Conterrà il modello del castello e i marker
const interiorGroup = new THREE.Group(); // Conterrà le stanze interne
root.add(castleGroup, interiorGroup);

// === 4. STRUMENTI E SELEZIONATORI HTML ===
const loader = new GLTFLoader(); // Strumento per caricare file .glb
const raycaster = new THREE.Raycaster(); // "Raggio laser" invisibile dal mouse per cliccare gli oggetti 3D
const pointer = new THREE.Vector2(); // Coordinate X,Y del mouse
const markerObjects = []; // Conterrà le hitbox cliccabili dei pallini luminosi creati

// Collegamenti diretti a tutti gli elementi HTML della UI
const loading = document.getElementById("loading");
const loadingText = document.getElementById("loadingText");
const barFill = document.getElementById("barFill");
const visitToggle = document.getElementById("visitToggle");
const visitMenu = document.getElementById("visitMenu");
const tooltip = document.getElementById("zoneTooltip");
const modal = document.getElementById("confirmModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const cancelExplore = document.getElementById("cancelExplore");
const confirmExplore = document.getElementById("confirmExplore");
const backCastleBtn = document.getElementById("backCastleBtn");
const currentZoneLabel = document.getElementById("currentZoneLabel");

// Variabili di stato globale per capire "dove" siamo e cosa stiamo facendo
let selectedZone = null;
let currentInterior = null; // Il modello della stanza attualmente caricata
let currentMode = "castle"; // Può essere "castle" (fuori) o "interior" (dentro)
let targetRotationY = 0;    // Utilizzato per le rotazioni morbide del castello con i pulsanti UI
let targetRotationX = -Math.PI / 2;

// Traccia lo stato dei tasti premuti sulla tastiera per il movimento
const keys = {
  w: false, a: false, s: false, d: false,
  q: false, e: false,
  arrowup: false, arrowdown: false, arrowleft: false, arrowright: false
};

// Listeners per la tastiera: quando premi/rilasci, aggiorna l'oggetto "keys"
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key in keys) {
    keys[key] = true;
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key in keys) {
    keys[key] = false;
    event.preventDefault();
  }
});

// Velocità dei controlli da tastiera
const keyboardMoveSpeed = 2.2;
const keyboardRotateSpeed = 0.035;
const keyboardZoomSpeed = 3.2;

// === 5. ILLUMINAZIONE DELLA SCENA ===
// Luce ambientale generale (cielo giallastro caldo, terreno bluastro scuro)
const ambient = new THREE.HemisphereLight(0xfff0d0, 0x1b2238, 1.8);
scene.add(ambient);

// Luce direzionale principale (simula il sole o la luna piena)
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(120, 220, 160);
scene.add(sun);

// Luce puntiforme calda (simula il riverbero magico o di fiaccole)
const warm = new THREE.PointLight(0xffb45c, 2.4, 520);
warm.position.set(0, 90, 80);
scene.add(warm);

// Luce azzurra di riempimento per schiarire le ombre troppo nere
const fill = new THREE.PointLight(0x8fb6ff, 1.2, 420);
fill.position.set(-120, 80, -120);
scene.add(fill);

// Luce "rim" (di contorno) da dietro per staccare il castello dallo sfondo
const rim = new THREE.DirectionalLight(0x9fb7ff, 0.8);
rim.position.set(-180, 90, -110);
scene.add(rim);

// === 6. FUNZIONI DI CARICAMENTO E GESTIONE MODELLI ===

// Funzione base per caricare un GLB. Usa le Promise per poter usare async/await.
// Calcola anche la percentuale di caricamento per muovere la barra di caricamento HTML.
function loadGLB(filename) {
  return new Promise((resolve, reject) => {
    loader.load(
      ASSET_BASE + filename,
      (gltf) => resolve(gltf.scene), // Se ha successo, restituisce la geometria
      (xhr) => {
        if (xhr.total) { // Aggiorna la barra progresso
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          barFill.style.width = `${percent}%`;
        }
      },
      reject // Se fallisce
    );
  });
}

// Ottimizza i materiali del modello appena caricato (ombre, calcolo facce, spazi colore corretti)
function prepareModel(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.geometry) {
        child.geometry.computeVertexNormals(); // Risolve a volte problemi d'ombra
      }

      if (child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((mat) => {
          mat.needsUpdate = true;
          // Assicura che le texture di colore o emissive usino lo standard sRGB
          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace;
            mat.map.needsUpdate = true;
          }
          if (mat.emissiveMap) {
            mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            mat.emissiveMap.needsUpdate = true;
          }
          mat.side = THREE.DoubleSide; // Rende visibili i poligoni da entrambi i lati (evita muri invisibili)
        });
      }
    }
  });
}

// Prende un modello di qualsiasi dimensione nativa, calcola la sua "bounding box" (scatola d'ingombro)
// e lo scala a una dimensione standard passata nel parametro "scaleTo", centrandolo nello spazio.
function normalizeObject(object, scaleTo = 145) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  object.position.sub(center); // Centra il modello all'origine (0,0,0)

  // Calcola il fattore di scala
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? scaleTo / maxDim : 1;
  object.scale.setScalar(scale);

  // Assicura che la base del modello sia esattamente a y=0 (appoggiato sul "pavimento")
  const finalBox = new THREE.Box3().setFromObject(object);
  object.position.y -= finalBox.min.y;
}

/*
// centerInterior was used to auto-position the camera based on the model's bounding box.
// It's commented out per request but left here for reference/possible re-enable.
function centerInterior(model, opts = {}) { ... }
*/

// Small helper to position the camera inside a model (useful for small interiors like Hagrid's Hut)
// centerCameraInside has been removed per request.

// === 7. GENERAZIONE DEI MARKER (PALLINI LUMINOSI) ===
// Disegna da codice un'immagine circolare sfumata da usare per i marker.
function createMarkerTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Crea un gradiente circolare bianco-oro-trasparente
  const gradient = ctx.createRadialGradient(64, 64, 6, 64, 64, 58);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,226,142,1)");
  gradient.addColorStop(0.45, "rgba(241,199,106,.65)");
  gradient.addColorStop(1, "rgba(241,199,106,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(64, 64, 58, 0, Math.PI * 2);
  ctx.fill();

  // Disegna un bordino dorato netto
  ctx.strokeStyle = "rgba(255,232,174,.9)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(64, 64, 25, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas); // Converte il canvas HTML in texture Three.js
}

const markerTexture = createMarkerTexture();

// Posiziona fisicamente i marker (Sprite 2D sempre rivolti verso la telecamera) sul modello del castello
function createMarkers() {
  // Pulisce prima eventuali marker vecchi
  markerObjects.forEach((m) => {
    castleGroup.remove(m);
    if (m.userData.visualMarker) {
      castleGroup.remove(m.userData.visualMarker);
    }
  });
  markerObjects.length = 0;

  VISITABLE_ZONES.forEach((zone) => {
    const material = new THREE.SpriteMaterial({
      map: markerTexture,
      transparent: true,
      depthWrite: false, // Per non coprirsi tra loro in modo anomalo
      blending: THREE.AdditiveBlending // Effetto "luce magica" se sovrapposti a sfondi scuri
    });

    const sprite = new THREE.Sprite(material);
    sprite.position.set(...zone.position);

    const hitboxMaterial = new THREE.SpriteMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.001,
      colorWrite: false,
      depthWrite: false
    });
    const hitbox = new THREE.Sprite(hitboxMaterial);
    hitbox.position.copy(sprite.position);

    // Scala i marker per renderli proporzionati al castello
    const invScale = 1 / castleGroup.scale.x;
    sprite.scale.set(4 * invScale, 4 * invScale, 1);
    hitbox.scale.set(11 * invScale, 11 * invScale, 1);

    sprite.userData.zone = zone; // Salva nel marker i dati della stanza per usarli al click!
    hitbox.userData.zone = zone;
    hitbox.userData.visualMarker = sprite;

    castleGroup.add(sprite);
    castleGroup.add(hitbox);
    markerObjects.push(hitbox);
  });
}

// === 8. GESTIONE DELL'INTERFACCIA E DEGLI STATI (CASTELLO <-> STANZE) ===
// Costruisce dinamicamente i bottoni nel menu "Aree Visitabili" leggendo VISITABLE_ZONES
function buildVisitMenu() {
  visitMenu.innerHTML = "";
  VISITABLE_ZONES.forEach((zone) => {
    const button = document.createElement("button");
    button.className = "visit-item";
    button.textContent = zone.name;
    button.addEventListener("click", () => {
      visitMenu.classList.remove("open"); // Chiude il menu
      openConfirm(zone);                  // Apre il popup di conferma ingresso
    });
    visitMenu.appendChild(button);
  });
}

// Apre la finestra HTML centrale per confermare l'ingresso in una stanza
function openConfirm(zone) {
  selectedZone = zone;
  modalTitle.textContent = `Vuoi esplorare ${zone.name}?`;
  modalText.textContent = zone.description || "Potrai tornare al castello quando vuoi.";
  cancelExplore.textContent = "No, resta qui";
  confirmExplore.textContent = "Entra";
  confirmExplore.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeConfirm() {
  selectedZone = null;
  modal.classList.add("hidden");
  confirmExplore.classList.remove("hidden");
  confirmExplore.textContent = "Entra";
  cancelExplore.textContent = "No, resta qui";
}

// Il cuore della transizione: nasconde il castello e carica/mostra la stanza
async function enterZone(zone) {
  closeConfirm();
  currentMode = "interior";
  
  // Mostra la schermata di caricamento
  loading.style.display = "flex";
  loadingText.textContent = `Apertura: ${zone.name}...`;
  barFill.style.width = "10%";

  // SCAMBIO GRUPPI: Nasconde il castello intero e mostra il gruppo degli interni
  castleGroup.visible = false;
  interiorGroup.visible = true;
  backCastleBtn.classList.remove("hidden");
  currentZoneLabel.textContent = zone.name;

  // Se c'è già una stanza vecchia caricata, la cancella per liberare RAM
  if (currentInterior) {
    interiorGroup.remove(currentInterior);
    currentInterior = null;
  }

  try {
    const model = await loadGLB(zone.file); // Attende il download della stanza

    model.name = zone.name;
    prepareModel(model);
    normalizeObject(model, zone.scaleTo || 120);
    model.rotation.set(0, 0, 0);

    interiorGroup.add(model);
    currentInterior = model;

    // Riposiziona la telecamera basandosi sui dati scelti per quella specifica stanza
    camera.position.set(...(zone.camera || [0, 60, 140]));
    controls.target.set(...(zone.target || [0, 35, 0]));
    controls.update();

  } catch (error) {
    console.warn("Errore caricamento interno:", zone.file, error);
    window.pfAlert("map_missing_zone_file", { file: ASSET_BASE + zone.file });
    backToCastle(); // Se c'è un errore, torna fuori in automatico
  } finally {
    loading.style.display = "none"; // Nasconde sempre il caricamento alla fine, in ogni caso
  }
}

// Processo inverso a enterZone(): distrugge la stanza visibile e riaccende il castello
function backToCastle() {
  currentMode = "castle";

  castleGroup.visible = true;
  interiorGroup.visible = false;

  backCastleBtn.classList.add("hidden");
  currentZoneLabel.textContent = "Mappa 3D Interattiva";

  // Ripristina la visuale standard dall'alto sul castello
  camera.position.set(-70, 127, -227.87);
  controls.target.set(0, 40, -20);
  controls.update();

  selectedZone = null;
  modal.classList.add("hidden");
  visitMenu.classList.remove("open");
  confirmExplore.classList.remove("hidden"); 
  confirmExplore.textContent = "Entra";
  cancelExplore.textContent = "No, resta qui";
}

// Prima funzione in assoluto ad essere chiamata: scarica la mappa intera di Hogwarts
async function loadCastle() {
  loadingText.textContent = "Caricamento castello...";
  try {
    const model = await loadGLB(CASTLE_FILE);
    model.name = CASTLE_FILE;
    prepareModel(model);

    castleGroup.add(model);
    normalizeObject(castleGroup, 145); // Scala il castello alla dimensione ideale per la vista

    castleGroup.rotation.x = targetRotationX;
    castleGroup.rotation.y = targetRotationY;

    createMarkers(); // Appena caricato, attacca subito i marker delle stanze
    buildVisitMenu();

    camera.position.set(-70, 127, -227.87);
    controls.target.set(0, 40, -20);
    controls.update();

  } catch (error) {
    console.warn("Errore caricamento castello:", error);
    window.pfAlert("map_missing_castle_file", { file: ASSET_BASE + CASTLE_FILE });
  } finally {
    loading.style.display = "none";
  }
}

// === 9. INTERAZIONE DEL MOUSE (RAYCASTING E CLICK) ===
// Converte la posizione X,Y dei pixel dello schermo in coordinate da -1 a +1 usabili da Three.js
function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

// Spara un raggio invisibile dalla telecamera alla posizione del mouse. 
// Restituisce il primo marker colpito, se esiste.
function getIntersectedMarker(event) {
  if (currentMode !== "castle") return null; // Disattiva il clic sui marker se siamo dentro una stanza

  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(markerObjects, false);
  return hits.length ? hits[0].object : null;
}

// Se clicchi sul canvas 3D e becchi un marker, apre la finestra per entrarci
renderer.domElement.addEventListener("click", (event) => {
  const marker = getIntersectedMarker(event);
  if (marker?.userData?.zone) {
    openConfirm(marker.userData.zone);
  }
});

// Quando il mouse si muove: mostra/nasconde l'etichetta (tooltip) col nome della stanza se sopra a un marker
renderer.domElement.addEventListener("mousemove", (event) => {
  const marker = getIntersectedMarker(event);
  if (marker?.userData?.zone) {
    tooltip.textContent = marker.userData.zone.name;
    tooltip.style.left = `${event.clientX + 16}px`; // Si posiziona vicino al cursore
    tooltip.style.top = `${event.clientY + 16}px`;
    tooltip.classList.add("visible");
    renderer.domElement.style.cursor = "pointer"; // Cambia icona del mouse a manina
  } else {
    tooltip.classList.remove("visible");
    renderer.domElement.style.cursor = "grab";
  }
});

// === DEBUG COORDINATE MARKER CASTELLO ===
// STRUMENTO PER TE SVILUPPATORE: Fai doppio clic sul castello.
// Calcola le coordinate esatte relative per posizionare nuovi marker nelle tue espansioni!
renderer.domElement.addEventListener("dblclick", (event) => {
  if (currentMode !== "castle") return;

  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObject(castleGroup, true);

  if (intersects.length > 0) {
    const worldPoint = intersects[0].point.clone();
    castleGroup.updateMatrixWorld();
    
    // Converte coordinate del mondo in coordinate rispetto al castello
    const localPoint = castleGroup.worldToLocal(worldPoint);

    const x = Math.round(localPoint.x);
    const y = Math.round(localPoint.y);
    const z = Math.round(localPoint.z);

    window.pfAlert("map_debug_coordinates", { x, y, z });
    console.log(`[${x}, ${y}, ${z}]`);
  }
});
// ======================================

// === 10. LISTENER PER BOTTONI UI E CONTROLLI ===
visitToggle.addEventListener("click", () => {
  visitMenu.classList.toggle("open");
});

cancelExplore.addEventListener("click", closeConfirm);
confirmExplore.addEventListener("click", () => {
  if (selectedZone) enterZone(selectedZone);
});
backCastleBtn.addEventListener("click", backToCastle);

// Chiude la modale cliccando sullo sfondo oscurato
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeConfirm();
});

// --- Controlli D-pad per touch ---
const rotStep = Math.PI / 8; // Gradi di rotazione ad ogni click
const touchMoveStep = 18;

function moveCameraRelative(direction) {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(forward, camera.up).normalize();

  const move = new THREE.Vector3();
  if (direction === "forward") move.copy(forward);
  if (direction === "backward") move.copy(forward).multiplyScalar(-1);
  if (direction === "right") move.copy(right);
  if (direction === "left") move.copy(right).multiplyScalar(-1);

  if (move.lengthSq() === 0) return;

  move.multiplyScalar(touchMoveStep);
  camera.position.add(move);
  controls.target.add(move);
  controls.update();
}

function handleDirectionalControl(direction) {
  if (currentMode === "castle") {
    if (direction === "left") targetRotationY -= rotStep;
    if (direction === "right") targetRotationY += rotStep;
    if (direction === "forward") targetRotationX -= rotStep;
    if (direction === "backward") targetRotationX += rotStep;
    return;
  }

  moveCameraRelative(direction);
}

document.getElementById("rotateLeft")?.addEventListener("click", () => { handleDirectionalControl("left"); });
document.getElementById("rotateRight")?.addEventListener("click", () => { handleDirectionalControl("right"); });
document.getElementById("rotateUp")?.addEventListener("click", () => { handleDirectionalControl("forward"); });
document.getElementById("rotateDown")?.addEventListener("click", () => { handleDirectionalControl("backward"); });

// --- Controlli Zoom per touch ---
const zoomStep = 40;
function handleZoom(direction) {
  // Calcola il vettore di direzione verso cui la telecamera sta guardando
  const dir = new THREE.Vector3()
    .subVectors(controls.target, camera.position)
    .normalize();
  // Sposta la telecamera lungo quella linea avanti o indietro
  camera.position.add(dir.multiplyScalar(direction * zoomStep));
  controls.update();
}

document.getElementById("zoomIn")?.addEventListener("click", () => { handleZoom(1); });
document.getElementById("zoomOut")?.addEventListener("click", () => { handleZoom(-1); });

// --- Bottone Fullscreen ---
document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Assicura che il canvas non si rompa quando allarghi o stringi la finestra del browser
addEventListener("load", syncRendererSize);
addEventListener("resize", () => {
  syncRendererSize();
});

// ================= DEBUG CAMERA LIVE =================
// DEBUG DISATTIVATO:
// Questo blocco creava un riquadro HTML in basso a sinistra con camera/target/rotation.
// Lascialo commentato in produzione; riattivalo solo quando devi trovare nuove coordinate camera.
/*
const cameraDebug = document.createElement("div");

cameraDebug.style.position = "fixed";
cameraDebug.style.left = "20px";
cameraDebug.style.bottom = "90px";
cameraDebug.style.zIndex = "9999";
cameraDebug.style.padding = "12px 16px";
cameraDebug.style.borderRadius = "12px";
cameraDebug.style.background = "rgba(20, 18, 14, 0.85)";
cameraDebug.style.color = "#ffd76a";
cameraDebug.style.fontFamily = "monospace";
cameraDebug.style.fontSize = "13px";
cameraDebug.style.lineHeight = "1.5";
cameraDebug.style.pointerEvents = "none";
cameraDebug.style.display = "block";

document.body.appendChild(cameraDebug);

function updateCameraDebug() {
  cameraDebug.innerHTML = `
<b>CAMERA DEBUG</b><br>
mode: ${currentMode}<br><br>
camera: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]<br>
target: [${controls.target.x.toFixed(2)}, ${controls.target.y.toFixed(2)}, ${controls.target.z.toFixed(2)}]<br>
rotation: [${camera.rotation.x.toFixed(4)}, ${camera.rotation.y.toFixed(4)}, ${camera.rotation.z.toFixed(4)}]
  `;
}
*/

// Funzione chiamata in tempo reale per muoversi fluidamente stile videogioco con WASD
function updateKeyboardControls() {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0; // Impedisce di "volare" o andare sottoterra
  forward.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(forward, camera.up).normalize();

  const move = new THREE.Vector3();

  if (keys.w || keys.arrowup) move.add(forward);
  if (keys.s || keys.arrowdown) move.sub(forward);
  if (keys.d) move.add(right);
  if (keys.a) move.sub(right);

  // Applica il movimento sommato di tutti i tasti
  if (move.lengthSq() > 0) {
    move.normalize().multiplyScalar(keyboardMoveSpeed);
    camera.position.add(move);
    controls.target.add(move);
  }

  // Rotazioni
  if (keys.q) targetRotationY -= keyboardRotateSpeed;
  if (keys.e) targetRotationY += keyboardRotateSpeed;
  if (keys.arrowleft) targetRotationY -= keyboardRotateSpeed;
  if (keys.arrowright) targetRotationY += keyboardRotateSpeed;
}
// ================= FINE DEBUG =================

// === 11. IL CICLO DI RENDER ANIMATO PRINCIPALE ===
// Questa è la funzione che fa battere il cuore al motore grafico. Gira 60 volte al secondo.
function animate() {
  requestAnimationFrame(animate); // Si auto-richiama per il frame successivo
  updateKeyboardControls();       // Controlla la tastiera

  if (currentMode === "castle") {
    // Il fattore 0.065 crea il "Damping" (l'effetto per cui la rotazione non scatta, ma accelera e decelera dolcemente)
    castleGroup.rotation.y += (targetRotationY - castleGroup.rotation.y) * 0.065;
    castleGroup.rotation.x += (targetRotationX - castleGroup.rotation.x) * 0.065;

    const invScale = 1 / castleGroup.scale.x;

    // Crea l'effetto "Pulsante" sui marker luminosi del castello usando il tempo (performance.now)
    markerObjects.forEach((marker, index) => {
      const pulse = 1 + Math.sin(performance.now() * 0.004 + index) * 0.08;
      marker.scale.set(11 * invScale * pulse, 11 * invScale * pulse, 1);
      marker.userData.visualMarker?.scale.set(4 * invScale * pulse, 4 * invScale * pulse, 1);
    });
  }

  // updateCameraDebug(); // Debug camera disattivato: vedi blocco commentato sopra.
  controls.update(); // Aggiorna la telecamera fisica in base agli input mouse
  renderer.render(scene, camera); // "Fotografa" la scena e la sputa sul canvas HTML
}

interiorGroup.visible = false; // All'avvio nascondiamo tutto ciò che non è il castello

// === 12. GESTIONE DI HOGSMEADE (Aree aggiuntive fuori mappa) ===
const openHogsmeade = document.getElementById("openHogsmeade");

// Definizione delle zone esterne separate dal file del castello.
const HOGSMEADE_PREVIEWS = {
  ollivander: {
    id: "ollivander",
    name: "Olivander",
    file: "ollivanders_wand_shop.glb",
    camera: [17, 185, 7],
    target: [0, 35, 0],
    rotation: [-1.5, 0.11, 1.16],
    scaleTo: 380
  },
  honeydukes: {
    id: "honeydukes",
    name: "Mielandia",
    file: "honey_dukes_shop.glb", 
    camera: [0, 55, 150],
    target: [0, 35, 0],
    scaleTo: 480
  },
  hagrid: {
    id: "hagrid",
    name: "Hagrid's Hut",
    file: "hagrids_hut.glb",
    camera: [0, 2, 5],
    target: [0, 1, 0],
    rotation: [-0.4957, 1.3407, 0.4846],
    scaleTo: 680
  }
};

// Cliccando sulla card di Hogsmeade in basso a destra, apre un popup speciale personalizzato
openHogsmeade?.addEventListener("click", () => {
  selectedZone = null;
  modalTitle.textContent = "Hogsmeade è in arrivo...";
  
  // Inietta nel popup due bottoni per le anteprime dei negozi di Hogsmeade
  modalText.innerHTML = `
  Il villaggio dei maghi è ancora in costruzione.<br><br>
  ✨ Presto potrai esplorarlo completamente.<br><br>

  <div class="hogsmeade-preview">
    <button class="preview-card" id="openOllivander">
      🪄 Olivander
      <span>Il negozio delle bacchette</span>
    </button>

    <button class="preview-card" id="openHoneydukes">
      🍬 Mielandia
      <span>Dolci, caramelle e magie zuccherate</span>
    </button>
  </div>
  `;

  confirmExplore.classList.add("hidden"); // nasconde il bottone Entra base
  cancelExplore.textContent = "Chiudi";   // usa solo questo per chiudere
  modal.classList.remove("hidden");

  // Attacca gli eventi ai bottoni appena iniettati dinamicamente nel DOM
  document.getElementById("openOllivander")?.addEventListener("click", () => {
    enterHogsmeadePreview(HOGSMEADE_PREVIEWS.ollivander);
  });

  document.getElementById("openHoneydukes")?.addEventListener("click", () => {
    enterHogsmeadePreview(HOGSMEADE_PREVIEWS.honeydukes);
  });
});

// Funzione gemella a 'enterZone()', ma specifica per gestire e scalare le anteprime isolate di Hogsmeade
async function enterHogsmeadePreview(place) {
  modal.classList.add("hidden");

  currentMode = "interior";
  loading.style.display = "flex";
  loadingText.textContent = `Apertura: ${place.name}...`;
  barFill.style.width = "10%";

  castleGroup.visible = false;
  interiorGroup.visible = true;
  backCastleBtn.classList.remove("hidden");
  currentZoneLabel.textContent = place.name;

  if (currentInterior) {
    interiorGroup.remove(currentInterior);
    currentInterior = null;
  }

  try {
    const model = await loadGLB(place.file);

    model.name = place.name;
    prepareModel(model);
    normalizeObject(model, place.scaleTo || 180);

    interiorGroup.add(model);
    currentInterior = model;
    
    // Riposiziona camera secondo le direttive del singolo modello
    camera.position.set(...place.camera);
    controls.target.set(...place.target);
    controls.update();

  } catch (error) {
    console.warn("Errore caricamento anteprima Hogsmeade:", place.file, error);
    window.pfAlert("map_missing_zone_file", { file: ASSET_BASE + place.file });
    backToCastle();
  } finally {
    loading.style.display = "none";
  }
}

// === 13. BOOT DELL'APPLICAZIONE ===
animate();      // Fa partire il ciclo che ridisegna lo schermo a ~60FPS
loadCastle();   // Scatena la richiesta HTTP per scaricare il modello pesante

// Questi log finali mostrano le posizioni esatte della telecamera allo stato zero
console.log("CAMERA:", camera.position);
console.log("TARGET:", controls.target);
console.log("ROTATION:", camera.rotation);
