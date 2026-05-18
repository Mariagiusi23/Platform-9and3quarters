// Aggiunta massiva di voci al database per migliorare la copertura.
// Queste voci sono esempi: aggiungi o modifica liberamente per adattare alla collezione reale.
// Ogni oggetto ha: name, type (personaggio/creatura/oggetto), optional image, tags array.

const EXTRA_DATABASE = [
  { name: "Nearly Headless Nick", type: "personaggio", image: "images/nick_senza_testa.jpg", tags: ["secondario","grifondoro","maschio","fantasma","misterioso","azkaban","vivo_falso"] },
  { name: "Alastor Moody", type: "personaggio", image: "images/AListair_Moody.webp", tags: ["importante","ordine_fenice","maschio","professore","auror","maggiore","occhio_magico"] },
  { name: "Gilderoy Lockhart", type: "personaggio", image: "images/Gilderoy_Lockhart_promotional_image_COSF.webp", tags: ["secondario","professore","grifondoro","maschio","narcisista","autore","maledizione"] },
  { name: "Percy Weasley", type: "personaggio", image: "images/percy.jpeg", tags: ["secondario","weasley","maschio"," burocrate","ministero","ambizioso","vivo"] },
  { name: "Grawp", type: "creatura", image: "images/Grawp_%28Harry_Potter%29.webp", tags: ["creatura","mezzogigante","grande","hagrid","maschio","rumoroso","vivo"] },
  { name: "Firenze", type: "personaggio", image: "images/Firenze.webp", tags: ["professore","centauro","saggezza","ordine_fenice","vivo"] },
  { name: "Basilisco", type: "creatura", image: "images/Basilisco.webp", tags: ["creatura","serpente_gigante","pericoloso","camera_dei_segreti","maledizione","vivo"] },
  { name: "Thestral", type: "creatura", image: "images/thestral.png", tags: ["creatura","ali","visibile_ai_morti","transporto","vivo"] },
  { name: "Dragone Norvegese a punta d'osso", type: "creatura", image: "images/dragone_norveges.jpg", tags: ["creatura","drago","pericoloso","competizione","tremaghi","vivo"] },
  { name: "Pietra Filosofale", type: "oggetto", image: "images/pietra_filosofale.jpg", tags: ["potente","pietra","alchimia","dono_morte","oggetto_magico"] },
  { name: "Specchio delle Brame", type: "oggetto", image: "images/sfera_cristallo.jpg", tags: ["specchio","desiderio","magico","riflessione"] },
  { name: "Horcrux (anello di Gaunt)", type: "oggetto", image: "images/Horcrux_-_Anello_di_Orvoloson_Gaunt.webp", tags: ["horcrux","oggetto_magico","malvagio","voldemort"] },
  { name: "Cappa di Manto", type: "oggetto", image: "images/cappa_di_manto.jpg", tags: ["mantello","invisibilita","oggetto_magico"] },
  { name: "Niffler", type: "creatura", image: "images/niffler_1_1800x1248.png", tags: ["creatura","tesori","curioso","piccolo","vivo"] },
  { name: "Bowtruckle", type: "creatura", image: "images/Bowtruckle.webp", tags: ["creatura","albero","protettivo","piccolo","magico"] },
  { name: "Newt Scamander", type: "personaggio", image: "images/NewtonScamander-Profile-crop.webp", tags: ["magizoologo","maschio","autore","esploratore","vivo"] },
  { name: "Credence Barebone", type: "personaggio", image: "images/credence_1_1800x1248.png", tags: ["oscuro","hidalgo","vago","vivo","fantasma"] },
  { name: "Hedwig", type: "creatura", image: "images/hedwige.jpg", tags: ["gufo","animale_domestico","fedelta","bianco","maschio","vivo"] },
  { name: "Scabbers (Peter Pettigrew)", type: "personaggio", image: "images/Pettigrew_DH1.webp", tags: ["rattone","traditore","weasley","maledizione","vivo_falso"] },
  { name: "Pensieve", type: "oggetto", image: "images/pensieve.jpg", tags: ["pensatoio","memoria","magico","archivio"] },
  { name: "Dolores Umbridge's Plate", type: "oggetto", image: "images/Normal_HP7_Official_%2835%29.webp", tags: ["porcellana","ministero","malvagio","rosa"] },
  { name: "Mappa del Malandrino", type: "oggetto", image: "images/Mappa-del-Malandrino.webp", tags: ["mappa","magico","seguire","scherzo","occhio"] },
  { name: "Boggart", type: "creatura", image: "images/the-boggart-banishing-charm_1_1800x1248.png", tags: ["creatura","paura","mutazione","difesa"] },
  { name: "Errol (gufo Weasley)", type: "creatura", image: "images/Errol_PM.webp", tags: ["gufo","weasley","trasporto","vecchio"] },
  { name: "Sfera di Cristallo (Divinazione)", type: "oggetto", image: "images/sfera_cristallo.jpg", tags: ["divinazione","oggetto_magico","previsione"] },
  { name: "Professor Slughorn", type: "personaggio", image: "images/Slughorn.webp", tags: ["professore","pozioni","maschio","importante","vivo"] },
  { name: "Kreacher", type: "personaggio", image: "https://placehold.co/400x600/png?text=Kreacher", tags: ["elfo_domestico","servitore","malvagio","dark","maledizione"] },
  { name: "Regulus Black", type: "personaggio", image: "images/Regulus_Black.webp", tags: ["black","fratello","morto","eroico"] },
  { name: "Inferi (Inferius)", type: "creatura", image: "images/Inferius.webp", tags: ["creatura","morto_risuscitato","pericoloso","maledizione"] },
  { name: "Occhio di Sauron (metafora)", type: "oggetto", image: "images/sauron.jpg.webp", tags: ["metafora","fantasia"] }
];

// Voci aggiuntive: oggetti, luoghi, incantesimi, creature, ruoli
EXTRA_DATABASE.push(
  { name: "Cappello Parlante", type: "oggetto", image: "images/cappello.jpg", tags: ["cappello","smistamento","hogwarts","oggetto_magico"] },
  { name: "Boccino d'oro", type: "oggetto", image: "images/boccino-d-oro-harry-potter-1pz.jpg.webp", tags: ["boccino","quidditch","oggetto","piccolo","volo"] },
  { name: "Saetta di Fuoco (Firebolt)", type: "oggetto", image: "images/boccino-d-oro-harry-potter-1pz.jpg.webp", tags: ["bacchetta","scopa","quidditch","scopa_veloce","oggetto"] },
  { name: "Gufo", type: "creatura", image: "images/gufo.webp", tags: ["gufo","animale_domestico","posta","creatura"] },
  { name: "Luna Park di Diagon Alley", type: "luogo", image: "images/lunapark_diagonaalley.jpg", tags: ["diagon_alley","negozio","luogo","mercato"] },
  { name: "Uccello da posta (Lettere)", type: "oggetto", image: "images/gufo.webp", tags: ["posta","gufo","servizio"] },
  { name: "Mantello dell'Invisibilità (altro nome)", type: "oggetto", image: "images/harry-potter-mantello-invisibile-1.jpg.webp", tags: ["mantello","invisibilita","dono_morte","oggetto_magico"] },
  { name: "Deluminatore", type: "oggetto", image: "images/Deluminatore.jpg", tags: ["deluminatore","oggetto","luce","oggetto_magico"] },
  { name: "Sala Grande (Hogwarts)", type: "luogo", image: "images/Sala_Grande.webp", tags: ["hogwarts","sala_grande","luogo"] },
  { name: "Binario 9 e 3/4", type: "luogo", image: "images/platform.avif", tags: ["stazione","king_cross","viaggio","luogo"] },
  { name: "Diagon Alley (Strada Diagon Alley)", type: "luogo", image: "images/diagon_alley.jpg", tags: ["diagon_alley","negozi","luogo"] },
  { name: "Borgo dei Maghi (Hogsmeade)", type: "luogo", image: "images/hogsmeade.avif", tags: ["hogsmeade","villaggio","luogo"] },
  { name: "Ministero della Magia", type: "luogo", image: "images/Ministero_della_Magia_Hall.jpg", tags: ["ministero","istituzione","luogo"] },
  { name: "Azkaban", type: "luogo", image: "images/azkaban_1_1800x1248.png", tags: ["azkaban","prigione","luogo"] },
  { name: "Sala Comune di Grifondoro", type: "luogo", image: "images/Casa_comune_grifondoro.webp", tags: ["grifondoro","sala_comune","luogo"] },
  { name: "Sala Comune di Serpeverde", type: "luogo", image: "images/Casa_comune_serpeverde.webp", tags: ["serpeverde","sala_comune","luogo"] },
  { name: "Expecto Patronum", type: "incantesimo", image: "images/patronum1.jpg", tags: ["incantesimo","protettivo","patronus"] },
  { name: "Avada Kedavra", type: "incantesimo", image: "images/avada_kedavra.png.webp", tags: ["incantesimo","uccisione","avada_kedavra","maledizione"] },
  { name: "Expelliarmus", type: "incantesimo", image: "images/expelli_armus.png", tags: ["incantesimo","disarmo","expelliarmus"] },
  { name: "Lacarnum Inflamarae", type: "incantesimo", image: "images/avada_kedavra.png.webp", tags: ["incantesimo","fuoco","difesa"] },
  { name: "Riddikulus", type: "incantesimo", image: "images/the-boggart-banishing-charm_1_1800x1248.png", tags: ["incantesimo","boggart","umorismo"] },
  { name: "Felix Felicis", type: "pozione", image: "images/Felix_Felicis.webp", tags: ["pozione","fortuna","pozioni"] },
  { name: "Polynectar (Pozione Polisucco)", type: "pozione", image: "images/polisucco.jpg", tags: ["pozione","trasformazione","pozioni"] },
  { name: "Pozione Veritaserum", type: "pozione", image: "images/polisucco.jpg", tags: ["pozione","verita","pozioni"] },
  { name: "Fiendfyre (fuoco demoniaco)", type: "incantesimo", image: "images/avada_kedavra.png.webp", tags: ["incantesimo","fuoco","pericoloso"] },
  { name: "Mappa del Malandrino (variante)", type: "oggetto", image: "images/Mappa-del-Malandrino.webp", tags: ["mappa","malandrino","seguire","oggetto_magico"] },
  { name: "Tassorosso - Sala Comune", type: "luogo", image: "images/Sala_comune_di_tassorosso.webp", tags: ["tassorosso","sala_comune","luogo"] },
  { name: "Corvonero - Sala Comune", type: "luogo", image: "images/Sala_comune_Corvonero_.webp", tags: ["corvonero","sala_comune","luogo"] },
  { name: "Pozione di Mandragola", type: "pozione", image: "images/mandragola.jpg", tags: ["mandragola","pozione","pozioni"] },
  { name: "Elfo domestico (generico)", type: "creatura", image: "images/Dobby.jpg", tags: ["elfo_domestico","servitore","creatura"] },
  { name: "Ragno gigante (Aragog)", type: "creatura", image: "images/Inferi.png", tags: ["ragno","creatura","pericoloso"] },
  { name: "Ghirigoro (strumento magico)", type: "oggetto", image: "images/sfera_cristallo.jpg", tags: ["strumento","oggetto_magico"] },
  { name: "Banco degli Gnomi (giardino)", type: "luogo", image: "images/Casa_comune_grifondoro.webp", tags: ["giardino","gnomi","luogo"] },
  { name: "Sfera di cristallo (variante)", type: "oggetto", image: "images/sfera_cristallo.jpg", tags: ["divinazione","sfera","oggetto_magico"] },
  { name: "Telescopio di Divinazione", type: "oggetto", image: "images/sfera_cristallo.jpg", tags: ["strumento","divinazione","oggetto"] },
  { name: "Edvige (Gufo personale)", type: "creatura", image: "images/hedwige.jpg", tags: ["gufo","animale_domestico","hedwig","fedelta"] },
  { name: "Zonko's Joke Shop (Negozio scherzi)", type: "luogo", image: "images/lunapark_diagonaalley.jpg", tags: ["negozio","scherzi","weasley","luogo"] },
  { name: "Weasleys' Wizard Wheezes", type: "luogo", image: "images/lunapark_diagonaalley.jpg", tags: ["weasley","negozio","scherzi","luogo"] }
);

// Unione silenziosa con DATABASE principale (in modo da non sovrascrivere)
// Funzione di normalizzazione dei tag: trim, lowercase, spazi->underscore
function _normalizeTag(t){
  return String(t||"").trim().replace(/\s+/g, "_").toLowerCase();
}

function _normalizeItemTags(item){
  if(!item) return;
  if(Array.isArray(item.tags)){
    item.tags = item.tags.map(tt => _normalizeTag(tt));
  }else{
    item.tags = [];
  }
  if(item.type) item.type = _normalizeTag(item.type);
}

// Normalizzo EXTRA_DATABASE prima di unirlo
EXTRA_DATABASE.forEach(_normalizeItemTags);

if(typeof DATABASE !== 'undefined' && Array.isArray(DATABASE)){
  // Normalizzo anche il database principale per evitare mismatch
  DATABASE.forEach(_normalizeItemTags);
  // Evito duplicati basati sul nome (case-insensitive)
  const names = new Set(DATABASE.map(d=>String(d.name).toLowerCase()));
  EXTRA_DATABASE.forEach(e => {
    if(!names.has(String(e.name).toLowerCase())) DATABASE.push(e);
  });
} else {
  // Se DATABASE non esiste per qualche motivo, espone EXTRA_DATABASE per i moduli.
  globalThis.DATABASE = EXTRA_DATABASE;
}

// Mantiene il database aggiornato anche per script.js caricato come modulo.
if (typeof DATABASE !== "undefined") globalThis.DATABASE = DATABASE;