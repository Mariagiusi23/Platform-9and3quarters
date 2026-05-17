const PF_ALERT_MESSAGES = {
  it: {
    cart_empty: "Il baule e' vuoto! La bacchetta sceglie il mago, ma tu devi prima sceglierne una.",
    checkout_success_owl: "Transazione di {total} Galleoni approvata dal caveau {vault}!\nTi rimangono {balance} Galleoni.\n\nI tuoi acquisti sono stati affidati a un Gufo Reale.",
    checkout_success_pickup: "Transazione di {total} Galleoni approvata dal caveau {vault}!\nTi rimangono {balance} Galleoni.\n\nI tuoi acquisti ti aspettano ad Hogwarts.",
    gringott_error: "ERRORE GRINGOTT: {message}",
    gringott_unreachable: "Impossibile raggiungere la Gringott in questo momento.",
    communication_error: "Errore di comunicazione con il Ministero della Magia.",
    password_min: "La parola d'ordine deve avere almeno {min} caratteri.",
    password_uppercase: "La parola d'ordine deve contenere almeno una lettera maiuscola.",
    password_special: "La parola d'ordine deve contenere almeno un carattere speciale.",
    avatar_saved: "Avatar salvato con successo: {message}",
    avatar_saved_server: "Avatar 3D salvato magicamente!",
    avatar_error: "Errore nel salvataggio del Magumagotipo.",
    login_failed: "Nox! Parola d'ordine errata o mago sconosciuto.",
    register_success: "Lettera di ammissione accettata! Ora puoi fare il login.",
    duplicate_user: "Questo mago o questa email e' gia registrato ad Hogwarts!",
    username_used: "Questo nome da mago e' gia stato usato. Scegline un altro!",
    email_used: "Questa email e' gia registrata ad Hogwarts!",
    missing_data: "Dati mancanti. Compila tutti i campi!",
    profile_updated: "Dati aggiornati!",
    nickname_taken: "Nickname gia in uso.",
    password_updated: "Parola d'ordine aggiornata con successo!",
    old_password_wrong: "La vecchia parola d'ordine e' errata.",
    pensieve_login_required: "Devi essere loggato per usare il Pensatoio!",
    checkout_login_required: "Devi effettuare l'accesso per comprare!",
    incomplete_form: "Dati del modulo incompleti.",
    wizard_not_found: "Mago non trovato nel database!",
    wrong_vault_key: "Chiave magica errata! Accesso al caveau negato.",
    insufficient_funds: "Non ci sono abbastanza soldi nel caveau!",
    gringott_internal: "Errore interno della Gringott.",
    howler_voice_unsupported: "Il tuo browser non supporta le Strillettere vocali: {text}",
    map_missing_zone_file: "Non trovo il file: {file}\nControlla che il nome sia identico e che sia nella cartella Hogwarts Castle.",
    map_missing_castle_file: "Non trovo il file: {file}",
    map_debug_coordinates: "Nuove coordinate perfette:\n\n[ {x}, {y}, {z} ]\n\nCopia questi numeri per la stanza!",
    wand_purchased: "Hai acquistato la bacchetta di {wand}!"
  },
  en: {
    cart_empty: "Your trunk is empty! The wand chooses the wizard, but you need to choose one first.",
    checkout_success_owl: "Transaction of {total} Galleons approved from vault {vault}!\nYou have {balance} Galleons left.\n\nYour purchases were entrusted to a Royal Owl.",
    checkout_success_pickup: "Transaction of {total} Galleons approved from vault {vault}!\nYou have {balance} Galleons left.\n\nYour purchases are waiting for you at Hogwarts.",
    gringott_error: "GRINGOTTS ERROR: {message}",
    gringott_unreachable: "Gringotts cannot be reached right now.",
    communication_error: "Communication error with the Ministry of Magic.",
    password_min: "The password must be at least {min} characters long.",
    password_uppercase: "The password must contain at least one uppercase letter.",
    password_special: "The password must contain at least one special character.",
    avatar_saved: "Avatar saved successfully: {message}",
    avatar_saved_server: "3D avatar saved magically!",
    avatar_error: "Error while saving the avatar.",
    login_failed: "Nox! Wrong password or unknown wizard.",
    register_success: "Admission letter accepted! You can now log in.",
    duplicate_user: "This wizard or email is already registered at Hogwarts!",
    username_used: "This wizard name has already been used. Choose another one!",
    email_used: "This email is already registered at Hogwarts!",
    missing_data: "Missing data. Fill in all fields!",
    profile_updated: "Profile updated!",
    nickname_taken: "Nickname already in use.",
    password_updated: "Password updated successfully!",
    old_password_wrong: "The old password is incorrect.",
    pensieve_login_required: "You must be logged in to use the Pensieve!",
    checkout_login_required: "You must log in to buy!",
    incomplete_form: "The form data is incomplete.",
    wizard_not_found: "Wizard not found in the database!",
    wrong_vault_key: "Wrong magic key! Vault access denied.",
    insufficient_funds: "There is not enough money in the vault!",
    gringott_internal: "Internal Gringotts error.",
    howler_voice_unsupported: "Your browser does not support voice Howlers: {text}",
    map_missing_zone_file: "I cannot find the file: {file}\nCheck that the name is identical and that it is inside the Hogwarts Castle folder.",
    map_missing_castle_file: "I cannot find the file: {file}",
    map_debug_coordinates: "New perfect coordinates:\n\n[ {x}, {y}, {z} ]\n\nCopy these numbers for the room!",
    wand_purchased: "You bought {wand}'s wand!"
  },
  fr: {
    cart_empty: "Ton coffre est vide ! La baguette choisit le sorcier, mais tu dois d'abord en choisir une.",
    gringott_error: "ERREUR GRINGOTTS : {message}",
    gringott_unreachable: "Impossible de joindre Gringotts pour le moment.",
    communication_error: "Erreur de communication avec le Ministere de la Magie.",
    password_min: "Le mot de passe doit contenir au moins {min} caracteres.",
    password_uppercase: "Le mot de passe doit contenir au moins une majuscule.",
    password_special: "Le mot de passe doit contenir au moins un caractere special.",
    avatar_saved: "Avatar enregistre avec succes : {message}",
    avatar_error: "Erreur lors de l'enregistrement de l'avatar.",
    wand_purchased: "Tu as achete la baguette de {wand} !"
  },
  es: {
    cart_empty: "Tu baul esta vacio. La varita elige al mago, pero primero debes elegir una.",
    gringott_error: "ERROR DE GRINGOTTS: {message}",
    gringott_unreachable: "No se puede contactar con Gringotts ahora mismo.",
    communication_error: "Error de comunicacion con el Ministerio de Magia.",
    password_min: "La contrasena debe tener al menos {min} caracteres.",
    password_uppercase: "La contrasena debe contener al menos una mayuscula.",
    password_special: "La contrasena debe contener al menos un caracter especial.",
    avatar_saved: "Avatar guardado correctamente: {message}",
    avatar_error: "Error al guardar el avatar.",
    wand_purchased: "Has comprado la varita de {wand}."
  },
  de: {
    cart_empty: "Deine Truhe ist leer! Der Zauberstab wahlt den Zauberer, aber du musst zuerst einen auswahlen.",
    gringott_error: "GRINGOTTS-FEHLER: {message}",
    gringott_unreachable: "Gringotts ist im Moment nicht erreichbar.",
    communication_error: "Kommunikationsfehler mit dem Zaubereiministerium.",
    password_min: "Das Passwort muss mindestens {min} Zeichen lang sein.",
    password_uppercase: "Das Passwort muss mindestens einen Grossbuchstaben enthalten.",
    password_special: "Das Passwort muss mindestens ein Sonderzeichen enthalten.",
    avatar_saved: "Avatar erfolgreich gespeichert: {message}",
    avatar_error: "Fehler beim Speichern des Avatars.",
    wand_purchased: "Du hast den Zauberstab von {wand} gekauft!"
  },
  pt: {
    cart_empty: "Seu bau esta vazio! A varinha escolhe o bruxo, mas voce precisa escolher uma primeiro.",
    gringott_error: "ERRO GRINGOTTS: {message}",
    gringott_unreachable: "Nao foi possivel acessar Gringotts agora.",
    communication_error: "Erro de comunicacao com o Ministerio da Magia.",
    password_min: "A senha deve ter pelo menos {min} caracteres.",
    password_uppercase: "A senha deve conter pelo menos uma letra maiuscula.",
    password_special: "A senha deve conter pelo menos um caractere especial.",
    avatar_saved: "Avatar salvo com sucesso: {message}",
    avatar_error: "Erro ao salvar o avatar.",
    wand_purchased: "Voce comprou a varinha de {wand}!"
  },
  ru: {
    cart_empty: "Ваш сундук пуст! Палочка выбирает волшебника, но сначала нужно выбрать палочку.",
    gringott_error: "ОШИБКА ГРИНГОТТС: {message}",
    gringott_unreachable: "Сейчас невозможно связаться с Гринготтсом.",
    communication_error: "Ошибка связи с Министерством магии.",
    password_min: "Пароль должен содержать не менее {min} символов.",
    password_uppercase: "Пароль должен содержать хотя бы одну заглавную букву.",
    password_special: "Пароль должен содержать хотя бы один специальный символ.",
    avatar_saved: "Аватар успешно сохранен: {message}",
    avatar_error: "Ошибка при сохранении аватара.",
    wand_purchased: "Вы купили палочку {wand}!"
  },
  "zh-CN": {
    cart_empty: "你的行李箱是空的！魔杖会选择巫师，但你得先选择一根。",
    gringott_error: "古灵阁错误：{message}",
    gringott_unreachable: "目前无法连接古灵阁。",
    communication_error: "与魔法部通信失败。",
    password_min: "密码至少需要 {min} 个字符。",
    password_uppercase: "密码必须包含至少一个大写字母。",
    password_special: "密码必须包含至少一个特殊字符。",
    avatar_saved: "头像保存成功：{message}",
    avatar_error: "保存头像时出错。",
    wand_purchased: "你购买了 {wand} 的魔杖！"
  },
  ja: {
    cart_empty: "トランクは空です。杖は魔法使いを選びますが、まず一本選んでください。",
    gringott_error: "グリンゴッツエラー: {message}",
    gringott_unreachable: "現在グリンゴッツに接続できません。",
    communication_error: "魔法省との通信エラーです。",
    password_min: "パスワードは{min}文字以上である必要があります。",
    password_uppercase: "パスワードには大文字を1文字以上含めてください。",
    password_special: "パスワードには特殊文字を1文字以上含めてください。",
    avatar_saved: "アバターを保存しました: {message}",
    avatar_error: "アバターの保存中にエラーが発生しました。",
    wand_purchased: "{wand}の杖を購入しました！"
  },
  ar: {
    cart_empty: "صندوقك فارغ! العصا تختار الساحر، لكن عليك اختيار واحدة اولا.",
    gringott_error: "خطأ غرينغوتس: {message}",
    gringott_unreachable: "لا يمكن الوصول إلى غرينغوتس الآن.",
    communication_error: "خطأ في الاتصال بوزارة السحر.",
    password_min: "يجب أن تتكون كلمة المرور من {min} أحرف على الأقل.",
    password_uppercase: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.",
    password_special: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل.",
    avatar_saved: "تم حفظ الصورة الرمزية بنجاح: {message}",
    avatar_error: "حدث خطأ أثناء حفظ الصورة الرمزية.",
    wand_purchased: "لقد اشتريت عصا {wand}!"
  }
};

const PF_SERVER_MESSAGE_KEYS = {
  "La parola d'ordine deve avere almeno 8 caratteri.": "password_min",
  "La parola d'ordine deve contenere almeno una lettera maiuscola.": "password_uppercase",
  "La parola d'ordine deve contenere almeno un carattere speciale.": "password_special",
  "Nox! Parola d'ordine errata o mago sconosciuto.": "login_failed",
  "Lettera di ammissione accettata! Ora puoi fare il login.": "register_success",
  "Questo mago (o questa email) è già registrato ad Hogwarts!": "duplicate_user",
  "Questo nome da mago è già stato usato. Scegline un altro!": "username_used",
  "Questa email è già registrata ad Hogwarts!": "email_used",
  "Dati mancanti. Compila tutti i campi!": "missing_data",
  "Dati aggiornati!": "profile_updated",
  "Nickname già in uso.": "nickname_taken",
  "Parola d'ordine aggiornata con successo!": "password_updated",
  "La vecchia parola d'ordine è errata.": "old_password_wrong",
  "Devi essere loggato per usare il Pensatoio!": "pensieve_login_required",
  "Devi effettuare l'accesso per comprare!": "checkout_login_required",
  "Dati del modulo incompleti.": "incomplete_form",
  "Mago non trovato nel database!": "wizard_not_found",
  "Chiave magica errata! Accesso al caveau negato.": "wrong_vault_key",
  "Non ci sono abbastanza soldi nel caveau!": "insufficient_funds",
  "Errore interno della Gringott.": "gringott_internal",
  "Avatar 3D salvato magicamente!": "avatar_saved_server"
};

function getPfAlertLanguage() {
  return localStorage.getItem("pf_google_lang") || localStorage.getItem("pf_lang") || "it";
}

function formatPfAlert(template, params = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => params[key] ?? "");
}

function pfAlert(key, params = {}) {
  const lang = getPfAlertLanguage();
  const map = PF_ALERT_MESSAGES[lang] || PF_ALERT_MESSAGES.it;
  const fallback = (lang !== "it" && PF_ALERT_MESSAGES.en[key]) || PF_ALERT_MESSAGES.it[key] || key;
  alert(formatPfAlert(map[key] || fallback, params));
}

function pfAlertMessage(message, params = {}) {
  const key = PF_SERVER_MESSAGE_KEYS[message];
  if (key) {
    pfAlert(key, params);
    return;
  }

  alert(message);
}

function pfTranslateMessage(message, params = {}) {
  const key = PF_SERVER_MESSAGE_KEYS[message];
  if (!key) return message;

  const lang = getPfAlertLanguage();
  const map = PF_ALERT_MESSAGES[lang] || PF_ALERT_MESSAGES.it;
  const fallback = (lang !== "it" && PF_ALERT_MESSAGES.en[key]) || PF_ALERT_MESSAGES.it[key] || message;
  return formatPfAlert(map[key] || fallback, params);
}

window.pfAlert = pfAlert;
window.pfAlertMessage = pfAlertMessage;
window.pfTranslateMessage = pfTranslateMessage;

function openArticle(text) {
  pfAlertMessage(text);
}

function playAudio(id) {
  const audio = document.getElementById(id);
  if (audio) audio.play();
}

/* CLICK SPARK GENERALE */
document.addEventListener("click", (e) => {
  const spark = document.createElement("div");
  spark.className = "spark";
  spark.style.left = e.pageX + "px";
  spark.style.top = e.pageY + "px";
  document.body.appendChild(spark);

  setTimeout(() => spark.remove(), 500);
});

/* NAVBAR FISSA */
const NAVBAR_HEIGHT_DESKTOP = 78;
const NAVBAR_HEIGHT_TABLET = 122;
const NAVBAR_HEIGHT_MOBILE = 98;

/* NAVBAR HEIGHT */
function updateNavbarHeight() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  nav.classList.remove("hidden");
  nav.style.transform = "none";
  nav.style.opacity = "1";
  nav.style.pointerEvents = "auto";
  nav.setAttribute("aria-hidden", "false");

  const h = window.matchMedia("(max-width: 520px)").matches
    ? NAVBAR_HEIGHT_MOBILE
    : window.matchMedia("(max-width: 980px)").matches
      ? NAVBAR_HEIGHT_TABLET
      : NAVBAR_HEIGHT_DESKTOP;
  document.documentElement.style.setProperty("--navbar-height", h + "px");
}

function initNavbarLogoMark() {
  const brand = document.querySelector(".navbar .logo");
  if (!brand) return;

  let logo = brand.querySelector(".navbar-logo-mark");
  if (!logo) {
    logo = document.createElement("span");
    logo.className = "navbar-logo-mark";
    logo.innerHTML = '<img src="logo.jpg" alt="" loading="eager">';
    brand.prepend(logo);
  }

  if (logo.dataset.logoLightboxReady === "1") return;
  logo.dataset.logoLightboxReady = "1";
  logo.setAttribute("role", "button");
  logo.setAttribute("aria-label", "Mostra logo ingrandito");
  logo.setAttribute("tabindex", "0");
  logo.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openLogoLightbox();
  });
  logo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLogoLightbox();
    }
  });
}

function openLogoLightbox() {
  const existing = document.querySelector(".logo-lightbox");
  if (existing) {
    existing.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "logo-lightbox";
  overlay.innerHTML = `
    <button class="logo-lightbox-close" type="button" aria-label="Chiudi logo ingrandito">×</button>
    <img src="logo.jpg" alt="Logo Platform 9 3/4">
  `;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest(".logo-lightbox-close")) {
      overlay.remove();
    }
  });

  document.addEventListener("keydown", function closeOnEscape(event) {
    if (event.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", closeOnEscape);
    }
  });

  document.body.appendChild(overlay);
}

window.addEventListener("load", updateNavbarHeight);
window.addEventListener("resize", updateNavbarHeight);

/* NAVBAR SEMPRE VISIBILE */
function initRevealNavbar() {
  const nav = document.querySelector(".navbar");
  const handle = document.getElementById("nav-handle");

  if (handle) {
    handle.remove();
  }

  if (!nav) return;

  initNavbarLogoMark();

  nav.classList.remove("hidden");
  nav.style.transform = "none";
  nav.style.opacity = "1";
  nav.style.pointerEvents = "auto";
  nav.setAttribute("aria-hidden", "false");

  updateNavbarHeight();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRevealNavbar);
} else {
  initRevealNavbar();
}

/* THEME + GOOGLE TRANSLATE + SETTINGS */
(function () {
  const LS_THEME_KEY = "pf_theme";
  const LS_LANG_KEY = "pf_lang";
  const LS_GOOGLE_LANG_KEY = "pf_google_lang";

  /* ===============================
     CSS RUNTIME FIX
  =============================== */

  function injectRuntimeStyle() {
    const STYLE_ID = "pf-runtime-style";
    const existing = document.getElementById(STYLE_ID);

    const css = `
/* ===============================
   NAVBAR SEMPRE VISIBILE
================================ */

.navbar,
.navbar.hidden,
html.translated-ltr .navbar,
html.translated-rtl .navbar,
body.translated-ltr .navbar,
body.translated-rtl .navbar {
  transform: none !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  display: block !important;
  visibility: visible !important;
}

#nav-handle {
  display: none !important;
}

body {
  top: 0 !important;
}

/* Nasconde elementi brutti di Google Translate */
.goog-te-banner-frame,
.skiptranslate iframe {
  display: none !important;
}

.goog-te-gadget {
  font-size: 0 !important;
}

.goog-logo-link {
  display: none !important;
}

#google_translate_element {
  position: fixed !important;
  left: -9999px !important;
  top: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}

.pf-cookie-banner {
  position: fixed;
  right: clamp(14px, 3vw, 30px);
  bottom: clamp(14px, 3vw, 30px);
  z-index: 999998;
  width: min(360px, calc(100vw - 28px));
  padding: 18px;
  border: 1px solid rgba(255,215,0,0.34);
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(20,12,38,0.96), rgba(7,8,20,0.96));
  color: #f3e3c2;
  box-shadow: 0 18px 45px rgba(0,0,0,0.42), 0 0 22px rgba(139,92,246,0.22);
  backdrop-filter: blur(12px);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .32s ease, transform .32s ease;
}

.pf-cookie-banner.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.pf-cookie-banner h3 {
  margin: 0 0 8px;
  color: #ffd700;
  font-family: Cinzel, Georgia, serif;
  font-size: 1.05rem;
  letter-spacing: 0;
}

.pf-cookie-banner p {
  margin: 0;
  color: #e5d8ff;
  font-size: .92rem;
  line-height: 1.45;
}

.pf-cookie-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
}

.pf-cookie-actions button {
  border: 1px solid rgba(255,215,0,0.34);
  border-radius: 8px;
  padding: 9px 12px;
  cursor: pointer;
  font-family: Cinzel, Georgia, serif;
  font-weight: 700;
}

.pf-cookie-accept {
  background: linear-gradient(145deg, #ffd700, #b8860b);
  color: #160d02 !important;
}

.pf-cookie-close {
  background: rgba(255,255,255,0.08);
  color: #f3e3c2 !important;
}

html[data-theme="light"] .pf-cookie-banner {
  background: linear-gradient(145deg, rgba(255,250,232,0.98), rgba(239,226,191,0.98));
  color: #241706;
  border-color: rgba(112,78,24,0.24);
  box-shadow: 0 18px 45px rgba(80,52,16,0.18);
}

html[data-theme="light"] .pf-cookie-banner p {
  color: #5b4630;
}

html[data-theme="light"] .pf-cookie-close {
  background: rgba(255,255,255,0.72);
  color: #241706 !important;
}

/* ===============================
   LUMOS / NOX
================================ */

html[data-theme="light"] {
  --bg: #f7f2df !important;
  --bg-2: #efe2bf !important;
  --panel: rgba(255,255,255,0.95) !important;
  --border: rgba(112,78,24,0.22) !important;
  --text: #241706 !important;
  --muted: #5b4630 !important;
  --gold: #9a6514 !important;
  --violet: #6b46c1 !important;
  --shadow: 0 24px 70px rgba(80,52,16,0.18) !important;
}

html[data-theme="light"] body,
html[data-theme="light"] .hero-section,
html[data-theme="light"] .feature-card,
html[data-theme="light"] .panel,
html[data-theme="light"] .news-banner,
html[data-theme="light"] .footer,
html[data-theme="light"] .container {
  background: radial-gradient(circle at top, rgba(255,248,218,0.95), rgba(239,221,179,0.9) 42%, #f7f2df 100%) !important;
  color: #241706 !important;
}

html[data-theme="light"] body[class$="-page"],
html[data-theme="light"] [class$="-page"] {
  background: radial-gradient(circle at top, rgba(255,248,218,0.95), rgba(239,221,179,0.9) 42%, #f7f2df 100%) !important;
  color: #241706 !important;
}

html[data-theme="light"] body::before {
  background-image: none !important;
  opacity: .12 !important;
}

html[data-theme="light"] .navbar {
  background: rgba(255,248,224,0.96) !important;
  border-bottom: 1px solid rgba(112,78,24,0.24) !important;
}

html[data-theme="light"] .logo,
html[data-theme="light"] .nav-links a,
html[data-theme="light"] .dropbtn {
  color: #2b1a08 !important;
  text-shadow: none !important;
}

html[data-theme="light"] .profile-btn,
html[data-theme="light"] .settings-btn,
html[data-theme="light"] .cart-btn {
  background: rgba(255,255,255,0.92) !important;
  color: #241706 !important;
  border: 1px solid rgba(112,78,24,0.22) !important;
}

html[data-theme="light"] .feature-card,
html[data-theme="light"] .panel,
html[data-theme="light"] .news-banner,
html[data-theme="light"] .hero-section,
html[data-theme="light"] .footer {
  background: rgba(255,250,232,0.97) !important;
  color: #241706 !important;
  border-color: rgba(112,78,24,0.24) !important;
  box-shadow: 0 18px 42px rgba(80,52,16,0.18) !important;
}

html[data-theme="light"] h1,
html[data-theme="light"] h2,
html[data-theme="light"] h3 {
  color: var(--gold) !important;
}

html[data-theme="light"] a,
html[data-theme="light"] .link-text {
  color: #9a6514 !important;
}

html[data-theme="light"] .magic-dust::before,
html[data-theme="light"] .magic-dust::after {
  opacity: 0.12 !important;
}

html[data-theme="dark"] {
  --bg: #151224 !important;
  --bg-2: #231a3d !important;
  --panel: rgba(255,255,255,0.11) !important;
  --border: rgba(244,216,143,0.26) !important;
  --text: #fbf4e8 !important;
  --muted: #ded2ba !important;
  --gold: #f0c866 !important;
  --violet: #a78bfa !important;
  --shadow: 0 12px 34px rgba(0,0,0,0.24) !important;
}

html[data-theme="dark"] body,
html[data-theme="dark"] .hero-section,
html[data-theme="dark"] .feature-card,
html[data-theme="dark"] .panel,
html[data-theme="dark"] .news-banner,
html[data-theme="dark"] .footer,
html[data-theme="dark"] .container {
  background: radial-gradient(circle at top, #34205b 0%, var(--bg-2) 38%, var(--bg) 100%) !important;
  color: var(--text) !important;
}

html[data-theme="dark"] body[class$="-page"],
html[data-theme="dark"] [class$="-page"] {
  background: radial-gradient(circle at top, #34205b 0%, var(--bg-2) 38%, var(--bg) 100%) !important;
  color: var(--text) !important;
}

html[data-theme="dark"] body.gazzetta-page {
  background: radial-gradient(circle at top, rgba(52, 32, 91, 0.94) 0%, rgba(35, 26, 61, 0.96) 38%, #151224 100%) !important;
}

html[data-theme="dark"] .navbar {
  background: rgba(24, 20, 39, 0.9) !important;
  border-bottom: 1px solid var(--border) !important;
}

html[data-theme="dark"] .logo,
html[data-theme="dark"] .nav-links a,
html[data-theme="dark"] .dropbtn {
  color: var(--gold) !important;
}

html[data-theme="light"] .btn-magic,
html[data-theme="light"] .btn-outline,
html[data-theme="light"] button {
  color: #241706 !important;
}

html[data-theme="dark"] .btn-magic,
html[data-theme="dark"] .btn-outline,
html[data-theme="dark"] button {
  color: #fff !important;
}

html[data-theme="light"] .pf-theme-toast {
  background: rgba(40,30,12,0.9) !important;
  color: #fff8e6 !important;
}

html[data-theme="dark"] .pf-theme-toast {
  background: rgba(6,6,12,0.9) !important;
  color: #fff !important;
}

html[data-theme="light"] .navbar {
  background: rgb(255, 248, 224) !important;
  border-bottom: 1px solid rgba(112, 78, 24, 0.24) !important;
  box-shadow: 0 12px 30px rgba(80, 52, 16, 0.14) !important;
  height: auto !important;
  min-height: var(--navbar-height, 78px) !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  transition: none !important;
  will-change: auto !important;
}

html[data-theme="dark"] .navbar {
  background: rgb(24, 20, 39) !important;
  border-bottom: 1px solid rgba(244, 216, 143, 0.28) !important;
  height: auto !important;
  min-height: var(--navbar-height, 78px) !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  transition: none !important;
  will-change: auto !important;
}

html[data-theme="light"] .nav-container,
html[data-theme="dark"] .nav-container {
  width: 100% !important;
  max-width: none !important;
  min-height: var(--navbar-height, 78px) !important;
  padding: 0.9rem 1.25rem !important;
  gap: 1rem !important;
}

html[data-theme="light"] .nav-actions,
html[data-theme="dark"] .nav-actions {
  gap: 2px !important;
}

html[data-theme="light"] .navbar.scrolled {
  background: rgb(255, 248, 224) !important;
  box-shadow: 0 12px 30px rgba(80, 52, 16, 0.14) !important;
}

html[data-theme="dark"] .navbar.scrolled {
  background: rgb(24, 20, 39) !important;
  box-shadow: none !important;
}

html[data-theme="light"] .logo,
html[data-theme="light"] .nav-links a,
html[data-theme="light"] .dropbtn {
  color: #2b1a08 !important;
  font-family: "Cinzel", Georgia, serif !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  text-shadow: none !important;
}

html[data-theme="dark"] .logo,
html[data-theme="dark"] .nav-links a,
html[data-theme="dark"] .dropbtn {
  color: var(--text, #f2e7d0) !important;
  font-family: "Cinzel", Georgia, serif !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  text-shadow: none !important;
}

html[data-theme="light"] .logo,
html[data-theme="dark"] .logo {
  font-size: 1.3rem !important;
}

html[data-theme="light"] .profile-btn,
html[data-theme="light"] .settings-btn,
html[data-theme="light"] .cart-btn,
html[data-theme="light"] .nav-icon-btn,
html[data-theme="light"] .mail-btn {
  color: #241706 !important;
  background: rgba(255, 255, 255, 0.72) !important;
  border: 1px solid rgba(112, 78, 24, 0.24) !important;
}

html[data-theme="dark"] .profile-btn,
html[data-theme="dark"] .settings-btn,
html[data-theme="dark"] .cart-btn,
html[data-theme="dark"] .nav-icon-btn {
  color: var(--text, #f2e7d0) !important;
  background: rgba(255, 255, 255, 0.11) !important;
  border: 1px solid rgba(244, 216, 143, 0.28) !important;
}

html[data-theme="light"] .profile-btn,
html[data-theme="dark"] .profile-btn {
  width: 52px !important;
  min-width: 52px !important;
  max-width: 52px !important;
  padding: 0 !important;
  border-radius: 50% !important;
}

.cart-placeholder {
  display: none !important;
}
    `;

    if (existing) {
      existing.textContent = css;
    } else {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  /* ===============================
     TEMA LUMOS / NOX
  =============================== */

  function setTheme(theme, persist = true) {
    const t = String(theme || "").toLowerCase();
    const norm = t === "light" || t === "lumos" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", norm);
    if (persist) {
      document.documentElement.setAttribute("data-theme-transition", "1");

      setTimeout(() => {
        document.documentElement.removeAttribute("data-theme-transition");
      }, 300);
    } else {
      document.documentElement.removeAttribute("data-theme-transition");
    }

    if (persist) {
      localStorage.setItem(LS_THEME_KEY, norm);
    }

    injectRuntimeStyle();
  }

  function getTheme() {
    const raw = localStorage.getItem(LS_THEME_KEY);

    if (raw) {
      const r = String(raw).toLowerCase();
      return r === "light" || r === "lumos" ? "light" : "dark";
    }

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function showThemeToast(theme) {
    const old = document.querySelector(".pf-theme-toast");
    if (old) old.remove();

    const toast = document.createElement("div");
    toast.className = "pf-theme-toast";
    toast.setAttribute("role", "status");
    toast.textContent = theme === "light"
      ? "Lumos — tema chiaro attivato"
      : "Nox — tema scuro attivato";

    toast.style.position = "fixed";
    toast.style.left = "50%";
    toast.style.bottom = "26px";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "999px";
    toast.style.zIndex = "999999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity .25s ease, transform .25s ease";
    toast.style.boxShadow = "0 12px 30px rgba(0,0,0,.35)";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 1400);
  }

  function initFakeCookieBanner() {
    const COOKIE_NOTICE_KEY = "pf_cookie_notice_v2_closed";

    if (localStorage.getItem(COOKIE_NOTICE_KEY) === "1") return;

    if (document.querySelector(".pf-cookie-banner")) return;

    const banner = document.createElement("aside");
    banner.className = "pf-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Avviso cookie");
    banner.innerHTML = `
      <h3>Preferenze cookie🍪</h3>
      <p>Usiamo cookie tecnici e preferenze locali per ricordare le impostazioni del sito, migliorare la navigazione e offrirti un'esperienza piu fluida.</p>
      <div class="pf-cookie-actions">
        <button class="pf-cookie-close" type="button">Solo necessari</button>
        <button class="pf-cookie-accept" type="button">Accetto</button>
      </div>
    `;

    const closeBanner = () => {
      localStorage.setItem(COOKIE_NOTICE_KEY, "1");
      localStorage.removeItem("pf_cookie_notice_v2_started_at");
      banner.classList.remove("is-visible");
      window.setTimeout(() => banner.remove(), 320);
    };

    banner.querySelector(".pf-cookie-close")?.addEventListener("click", closeBanner);
    banner.querySelector(".pf-cookie-accept")?.addEventListener("click", closeBanner);

    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add("is-visible"));
  }

  /* ===============================
     PICCOLO DIZIONARIO MANUALE
  =============================== */

  const DICT = {
    it: {
      nav_home: "Home",
      nav_gazzetta: "Gazzetta",
      nav_pensatoio: "Pensatoio",
      nav_olivander: "Olivander",
      nav_posta: "✉️ Posta",
      nav_guferia: "Guferia",
      nav_mappa: "🗺️ Mappa",
      nav_archivio: "Archivio",
      welcome: "Benvenuto su Platform 9 ¾",
      alohomora: "Platform 9 ¾",
      login_title: "Attraversa il Muro",
      login_subtitle: "Inserisci le tue credenziali per accedere a Diagon Alley.",
      username_label: "Nome da Mago",
      username_placeholder: "Es. HarryP90",
      password_label: "Parola d'Ordine",
      password_placeholder: "Es. Lumos!934",
      login_button: "Lumos (Accedi)",
      forgot_password: "Hai dimenticato la parola d'ordine?",
      register_prompt: "Non hai ancora la tua bacchetta?",
      register_link: "Registrati qui",
      register_title: "Lettera di Ammissione",
      register_subtitle: "Registra il tuo nome magico per entrare.",
      reg_username_label: "Scegli il tuo Nome",
      reg_username_placeholder: "Scegli un nome unico",
      reg_email_label: "Email per i Gufi",
      reg_email_placeholder: "mago@hogwarts.it",
      reg_password_label: "Crea Parola d'Ordine",
      reg_password_placeholder: "Inventa una password sicura",
      register_button: "Giuro Solennemente (Registrati)",
      have_letter: "Hai già ricevuto la lettera?",
      login_link: "Accedi qui"
    },
    en: {
      nav_home: "Home",
      nav_gazzetta: "Gazette",
      nav_pensatoio: "Pensieve",
      nav_olivander: "Olivander",
      nav_posta: "✉️ Mail",
      nav_guferia: "Owlery",
      nav_mappa: "🗺️ Map",
      nav_archivio: "Archive",
      welcome: "Welcome to Platform 9 ¾",
      alohomora: "Platform 9 ¾",
      login_title: "Pass Through the Wall",
      login_subtitle: "Enter your credentials to access Diagon Alley.",
      username_label: "Wizard Name",
      username_placeholder: "E.g. HarryP90",
      password_label: "Password",
      password_placeholder: "E.g. Lumos!934",
      login_button: "Lumos (Login)",
      forgot_password: "Forgot your password?",
      register_prompt: "Don't have your wand yet?",
      register_link: "Register here",
      register_title: "Letter of Admission",
      register_subtitle: "Register your wizard name to enter.",
      reg_username_label: "Choose your Name",
      reg_username_placeholder: "Choose a unique name",
      reg_email_label: "Owl-mail Email",
      reg_email_placeholder: "wizard@hogwarts.co",
      reg_password_label: "Create Password",
      reg_password_placeholder: "Invent a secure password",
      register_button: "I Solemnly Swear (Register)",
      have_letter: "Already got the letter?",
      login_link: "Login here"
    }
  };

  function applyTranslations(lang) {
    const map = DICT[lang] || DICT.it;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (map[key]) el.textContent = map[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (map[key]) el.placeholder = map[key];
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (map[key]) {
        el.title = map[key].replace(/^[^\p{L}\p{N}]+/u, "").trim();
        el.setAttribute("aria-label", el.title);
      }
    });
  }

  function setLanguage(lang, persist = true) {
    if (persist) {
      localStorage.setItem(LS_LANG_KEY, lang);
    }

    applyTranslations(lang);
  }

  function getLanguage() {
    return localStorage.getItem(LS_LANG_KEY) || "it";
  }

  /* ===============================
     NAVBAR CANONICA
  =============================== */

  function ensureCanonicalNavbar() {
    try {
      const canonical = `
<nav class="navbar">
  <div class="nav-container">
    <a href="homepage.html" class="logo"><span class="navbar-logo-mark" role="button" aria-label="Mostra logo ingrandito" tabindex="0"><img src="logo.jpg" alt="" loading="eager"></span>Platform 9 ¾</a>

    <ul class="nav-links">
      <li><a href="homepage.html" data-i18n="nav_home">Home</a></li>
      <li><a href="gazzetta.html" data-i18n="nav_gazzetta">Gazzetta</a></li>

      <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Test ▾</a>
        <ul class="dropdown-content">
          <li><a href="smistamento.html">Smistamento</a></li>
          <li><a href="test.html">Bacchetta</a></li>
        </ul>
      </li>

      <li><a href="pensatoio.html" data-i18n="nav_pensatoio">Pensatoio</a></li>
      <li><a href="olivander.html" data-i18n="nav_olivander">Olivander</a></li>
      <li><a href="guferia.html" data-i18n="nav_guferia">Guferia</a></li>

      <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Minigiochi ▾</a>
        <ul class="dropdown-content">
          <li><a href="index_legilimanzia.html">Legilimanzia</a></li>
          <li><a href="index_pozioni.html">Pozioni</a></li>
          <li><a href="index_club_duellanti.html">Club Duellanti</a></li>
          <li><a href="index_quidditch.html">Quidditch</a></li>
        </ul>
      </li>

      <li><a href="index_archivio.html" data-i18n="nav_archivio">Archivio</a></li>
    </ul>

    <div class="nav-actions">
      <div class="settings-wrapper">
        <button class="settings-btn" type="button" aria-label="Impostazioni" title="Impostazioni" aria-expanded="false">⚙️</button>
      </div>
      <a href="posta.html" class="nav-icon-btn nav-mail-btn" data-i18n-title="nav_posta" aria-label="Posta" title="Posta">✉️</a>
      <a href="profilo.html" class="profile-btn" aria-label="Profilo" title="Profilo">
        <span id="nav-username">🧙‍♂️</span>
      </a>
    </div>
  </div>
</nav>
      `;

      const existing = document.querySelector("nav.navbar");

      if (!existing) {
        document.body.insertAdjacentHTML("afterbegin", canonical);
      }

      const nav = document.querySelector("nav.navbar");
      if (nav) {
        nav.classList.remove("hidden");
        nav.style.transform = "none";
        nav.style.opacity = "1";
        nav.style.pointerEvents = "auto";
        nav.setAttribute("aria-hidden", "false");
      }

      updateNavbarHeight();
      ensureFloatingMapButton();
    } catch (e) {
      console.warn("[pf] ensureCanonicalNavbar failed", e);
    }
  }

  function ensureFloatingMapButton() {
    let button = document.querySelector(".floating-map-btn");

    if (!button) {
	      button = document.createElement("a");
	      button.className = "floating-map-btn";
	      button.href = "index_hogwarts_3d.html";
	      button.innerHTML = '<span class="floating-map-icon" aria-hidden="true">🏰</span>';
	      document.body.appendChild(button);
	    }

    button.setAttribute("aria-label", "Apri la mappa");
    button.setAttribute("title", "Mappa");
    button.setAttribute("data-i18n-title", "nav_mappa");
  }

  /* ===============================
     GOOGLE TRANSLATE STABILE
  =============================== */

  window.googleTranslateElementInit = function () {
    try {
      new google.translate.TranslateElement({
        pageLanguage: "it",
        includedLanguages: "en,fr,es,de,pt,ru,zh-CN,ja,ar",
        autoDisplay: false
      }, "google_translate_element");
    } catch (e) {
      console.warn("[pf] Google Translate init failed", e);
    }
  };

  function ensureGoogleTranslateWidget() {
    if (!document.getElementById("google_translate_element")) {
      const div = document.createElement("div");
      div.id = "google_translate_element";
      document.body.appendChild(div);
    }

    if (!document.getElementById("google_translate_script")) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(script);
    }
  }

  function clearGoogleTranslateCookies() {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
  }

  function setGoogleTranslateLang(lang) {
    if (!lang || lang === "it") {
      localStorage.removeItem(LS_GOOGLE_LANG_KEY);
      localStorage.setItem(LS_LANG_KEY, "it");

      clearGoogleTranslateCookies();

      location.reload();
      return;
    }

    localStorage.setItem(LS_GOOGLE_LANG_KEY, lang);
    localStorage.setItem(LS_LANG_KEY, lang);

    document.cookie = `googtrans=/it/${lang}; path=/`;
    document.cookie = `googtrans=/it/${lang}; path=/; domain=${location.hostname}`;

    ensureGoogleTranslateWidget();

    setTimeout(() => {
      location.reload();
    }, 500);
  }

  function restoreGoogleTranslateIfNeeded() {
    const lang = localStorage.getItem(LS_GOOGLE_LANG_KEY);

    if (lang && lang !== "it") {
      document.cookie = `googtrans=/it/${lang}; path=/`;
      ensureGoogleTranslateWidget();
    }
  }

  /* ===============================
     SETTINGS PANEL
  =============================== */

  function initSettings() {
    const actions = document.querySelector(".nav-actions");
    if (!actions) return;

    let wrapper = actions.querySelector(".settings-wrapper");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "settings-wrapper";
      actions.insertBefore(wrapper, actions.firstChild);
    }

    let btn = wrapper.querySelector(".settings-btn");
    let panel = wrapper.querySelector(".settings-panel");

    if (!btn) {
      btn = document.createElement("button");
      btn.className = "settings-btn";
      btn.type = "button";
      btn.innerHTML = "⚙️";
      btn.setAttribute("aria-label", "Impostazioni");
      btn.setAttribute("title", "Imostazioni");
      btn.setAttribute("aria-expanded", "false");
      wrapper.appendChild(btn);
    }

    if (!panel) {
      panel = document.createElement("div");
      panel.className = "settings-panel";
      panel.style.display = "none";
      wrapper.appendChild(panel);
    }

    panel.innerHTML = `
      <label for="theme-select">Tema</label>
      <select id="theme-select">
        <option value="dark">Nox — Scuro</option>
        <option value="light">Lumos — Chiaro</option>
      </select>

      <label for="lang-select" style="margin-top:.65rem;">Lingua</label>
      <select id="lang-select">
        <option value="it">Italiano</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="pt">Português</option>
        <option value="ru">Русский</option>
        <option value="zh-CN">中文</option>
        <option value="ja">日本語</option>
        <option value="ar">العربية</option>
      </select>

      <button id="translate-site-google" type="button" style="margin-top:.8rem; width:100%;">
        Traduci intero sito
      </button>
    `;

    const themeSelect = panel.querySelector("#theme-select");
    const langSelect = panel.querySelector("#lang-select");
    const translateBtn = panel.querySelector("#translate-site-google");

    themeSelect.value = getTheme();
    langSelect.value = localStorage.getItem(LS_GOOGLE_LANG_KEY) || getLanguage() || "it";

    themeSelect.addEventListener("change", () => {
      setTheme(themeSelect.value, true);
    });

    translateBtn.addEventListener("click", () => {
      setGoogleTranslateLang(langSelect.value);
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const open = panel.style.display === "block";
      panel.style.display = open ? "none" : "block";
      btn.setAttribute("aria-expanded", String(!open));
    });

    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      panel.style.display = "none";
      btn.setAttribute("aria-expanded", "false");
    });
  }

  /* ===============================
     ALOHOMORA EFFECT
  =============================== */

  function showAlohomora(opts = {}) {
    const force = opts && opts.force;

    if (!force && sessionStorage.getItem("alohomora_shown")) return Promise.resolve();
    if (!force) sessionStorage.setItem("alohomora_shown", "1");

    const overlay = document.createElement("div");
    overlay.className = "alohomora-overlay";

    const card = document.createElement("div");
    card.className = "alohomora-card";

    const text = document.createElement("div");
    text.className = "alohomora-text";
    text.textContent = DICT[getLanguage()]?.alohomora || "Platform 9 ¾";

    card.appendChild(text);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    for (let i = 0; i < 34; i++) {
      const s = document.createElement("div");
      s.className = "alohomora-spark";

      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 260;

      s.style.left = (50 + Math.cos(angle) * 6) + "%";
      s.style.top = (54 + Math.sin(angle) * 6) + "%";
      s.style.setProperty("--dx", Math.cos(angle) * distance);
      s.style.setProperty("--dy", Math.sin(angle) * distance);
      s.style.animationDelay = Math.random() * 420 + "ms";

      overlay.appendChild(s);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, 2400);
    });
  }

function showWandUnlock(opts = {}) {
  return new Promise((resolve) => {
    try {
      console.log('[pf] showWandUnlock start', opts);
      const overlay = document.createElement("div");
      overlay.className = "wand-cinematic-overlay";
      // make it easy to find and ensure it's on top for diagnostics
      overlay.id = 'pf-wand-overlay';
      overlay.style.zIndex = '2147483647';

      const portal = document.createElement("div");
      portal.className = "wand-portal";

      const ring = document.createElement("div");
      ring.className = "wand-ring";

      const runeCircle = document.createElement("div");
      runeCircle.className = "wand-runes";
      runeCircle.textContent = "✦ ✧ ✦ ✧ ✦ ✧ ✦";

      const wand = document.createElement("div");
      wand.className = "cinematic-wand";

      const wandTip = document.createElement("div");
      wandTip.className = "cinematic-wand-tip";
      wand.appendChild(wandTip);

      const spellLine = document.createElement("div");
      spellLine.className = "spell-line";

      const title = document.createElement("div");
      title.className = "wand-cinematic-title";
      title.textContent = opts.label || "Platform 9 ¾";

      const subtitle = document.createElement("div");
      subtitle.className = "wand-cinematic-subtitle";
      subtitle.textContent = opts.subtitle || "";

      overlay.appendChild(portal);
      overlay.appendChild(ring);
      overlay.appendChild(runeCircle);
      overlay.appendChild(spellLine);
      overlay.appendChild(wand);
      overlay.appendChild(title);
      if (subtitle.textContent) overlay.appendChild(subtitle);

      for (let i = 0; i < 55; i++) {
        const particle = document.createElement("span");
        particle.className = "cinematic-particle";

        const angle = Math.random() * Math.PI * 2;
        const radius = 90 + Math.random() * 320;

        particle.style.setProperty("--x", Math.cos(angle) * radius + "px");
        particle.style.setProperty("--y", Math.sin(angle) * radius + "px");
        particle.style.setProperty("--delay", Math.random() * 900 + "ms");
        particle.style.setProperty("--size", 3 + Math.random() * 5 + "px");

        overlay.appendChild(particle);
      }

      for (let i = 0; i < 18; i++) {
        const star = document.createElement("span");
        star.className = "cinematic-star";
        star.textContent = Math.random() > 0.5 ? "✦" : "✧";
        star.style.left = 10 + Math.random() * 80 + "%";
        star.style.top = 12 + Math.random() * 70 + "%";
        star.style.animationDelay = Math.random() * 1200 + "ms";
        overlay.appendChild(star);
      }

  document.body.appendChild(overlay);
  console.log('[pf] showWandUnlock appended overlay', overlay);

      if (opts.lockUrl) {
        try {
          const audio = new Audio(opts.lockUrl);
          audio.volume = typeof opts.volume === "number" ? opts.volume : 0.42;
          audio.play().catch(() => {});

          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 2600);
        } catch (e) {}
      }

      // give a slightly longer visible window for diagnostics
      setTimeout(() => {
        overlay.classList.add("closing");
      }, 3200);

      setTimeout(() => {
        try { overlay.remove(); } catch (e) {}
        console.log('[pf] showWandUnlock removed overlay');
        resolve();
      }, 4200);
    } catch (e) {
      console.error("wand cinematic error", e);
      resolve();
    }
  });
}

  /* ===============================
     INIT
  =============================== */

  function initPreferences() {
    injectRuntimeStyle();
    ensureCanonicalNavbar();
    initRevealNavbar();
    initSettings();

    const theme = getTheme();
    setTheme(theme, false);

    const lang = getLanguage();
    applyTranslations(lang);

    restoreGoogleTranslateIfNeeded();
    initFakeCookieBanner();

    const nav = document.querySelector(".navbar");
    if (nav) {
      nav.classList.remove("hidden");
      nav.style.transform = "none";
      nav.style.opacity = "1";
      nav.style.pointerEvents = "auto";
      nav.setAttribute("aria-hidden", "false");
    }

    updateNavbarHeight();

    if (sessionStorage.getItem("show_wand_unlock_after_auth") === "1") {
      sessionStorage.removeItem("show_wand_unlock_after_auth");
      setTimeout(() => showWandUnlock({ label: "Alohomora" }), 250);
    }
  }

  window.pf = window.pf || {};
  window.pf.showAlohomora = showAlohomora;
  window.pf.showWandUnlock = showWandUnlock;
  window.pf.setTheme = setTheme;
  window.pf.setLanguage = setLanguage;
  window.pf.setGoogleTranslateLang = setGoogleTranslateLang;
  window.pf.ensureCanonicalNavbar = ensureCanonicalNavbar;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPreferences);
  } else {
    initPreferences();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => updateNavbarHeight()).catch(() => {});
  }
})();

/* =========================
   PENSATOIO
========================= */

const vials = document.querySelectorAll(".vial");
const basin = document.getElementById("pensatoio");
const display = document.getElementById("memory-display");

const memories = {
  harry: {
    title: "Infanzia di Harry",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    text: "Un ricordo sfuocato della vita di Harry prima di Hogwarts, tra misteri, solitudine e magia ancora nascosta."
  },
  hogwarts: {
    title: "Hogwarts",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    text: "Il castello magico più celebre del mondo: torri, segreti, scale mobili e la promessa di una nuova casa."
  },
  battle: {
    title: "Battaglia Finale",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    text: "L'eco dell'ultimo scontro: coraggio, sacrificio e il destino del mondo magico sospeso in un istante."
  }
};

if (vials.length && basin && display) {
  vials.forEach((vial) => {
    vial.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("memory", vial.dataset.memory);
      vial.classList.add("dragging");
    });

    vial.addEventListener("dragend", () => {
      vial.classList.remove("dragging");
    });
  });

  basin.addEventListener("dragover", (e) => {
    e.preventDefault();
    basin.classList.add("dragover");
  });

  basin.addEventListener("dragleave", () => {
    basin.classList.remove("dragover");
  });

  basin.addEventListener("drop", (e) => {
    e.preventDefault();
    basin.classList.remove("dragover");

    const memory = e.dataTransfer.getData("memory");
    if (!memory) return;

    const rect = basin.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    createRipple(localX, localY);
    createSparks(e.clientX, e.clientY);
    playSound();
    animateBasin();
    showMemory(memory);
  });
}

function showMemory(type) {
  const memory = memories[type];
  if (!memory || !display) return;

  display.classList.remove("show");
  display.classList.remove("hidden");

  display.innerHTML = `
    <h3>${memory.title}</h3>
    <img src="${memory.image}" alt="${memory.title}" class="memory-image">
    <p>${memory.text}</p>
  `;

  setTimeout(() => {
    display.classList.add("show");
  }, 30);
}

function animateBasin() {
  if (!basin) return;

  basin.classList.add("active");

  setTimeout(() => {
    basin.classList.remove("active");
  }, 500);
}

function createRipple(x, y) {
  if (!basin) return;

  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.style.width = "20px";
  ripple.style.height = "20px";

  basin.appendChild(ripple);

  setTimeout(() => ripple.remove(), 900);
}

function createSparks(x, y) {
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.className = "memory-spark";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 20;

    spark.style.left = x + "px";
    spark.style.top = y + "px";
    spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
    spark.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
  }
}

function playSound() {
  const audio = new Audio("https://www.soundjay.com/magic/sounds/magic-chime-01.mp3");
  audio.volume = 0.35;
  audio.play().catch(() => {});
}

/* =========================
   SHOP / QUIZ
========================= */

let wandScore = {
  light: 0,
  dark: 0,
  mind: 0
};

function buy(wand) {
  pfAlert("wand_purchased", { wand });
}

window.score = function (type) {
  wandScore[type]++;

  const result = document.getElementById("result");
  if (!result) return;

  const best = Object.keys(wandScore).reduce((a, b) =>
    wandScore[a] > wandScore[b] ? a : b
  );

  let wand = "";

  if (best === "light") wand = "Bacchetta di Fenice";
  if (best === "dark") wand = "Bacchetta Oscura";
  if (best === "mind") wand = "Bacchetta della Mente";

  result.innerHTML = `✨ La tua bacchetta è: <b>${wand}</b>`;
  createMagicBurst();
};

function createMagicBurst() {
  for (let i = 0; i < 15; i++) {
    const spark = document.createElement("div");
    spark.className = "memory-spark";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 20;

    spark.style.left = window.innerWidth / 2 + "px";
    spark.style.top = window.innerHeight / 2 + "px";
    spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
    spark.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
  }
}

window.pfAwardGameWin = async function (game, options = {}) {
  try {
    const response = await fetch("php/award_game.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game })
    });
    const data = await response.json();

    if (data.success) {
      const message = `+${data.reward} Galeoni aggiunti al caveau. Saldo: ${data.balance} G.`;
      if (typeof options.onSuccess === "function") options.onSuccess(data, message);
      return data;
    }

    if (typeof options.onError === "function") options.onError(data);
    return data;
  } catch (error) {
    console.warn("Premio minigioco non assegnato:", error);
    if (typeof options.onError === "function") options.onError({ success: false, error });
    return { success: false, error };
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("howler-modal")) {
    const howlerModal = document.createElement("div");
    howlerModal.id = "howler-modal";
    howlerModal.className = "howler-overlay hidden";
    howlerModal.innerHTML = `
      <div id="howler-envelope" class="howler-envelope">
        <div class="howler-seal">M</div>
        <p>Aperta da <span id="howler-sender"></span>...</p>
        <p class="click-to-open">Clicca per aprirla prima che esploda!</p>
      </div>
      <div id="howler-ashes" class="hidden">🔥 La lettera si è incenerita... 🔥</div>
    `;
    document.body.appendChild(howlerModal);
  }

  if (window.PF_HOWLER_INITIALIZED || window.PF_HOWLER_SCRIPT_LOADING) return;

  window.PF_HOWLER_SCRIPT_LOADING = true;
  const script = document.createElement("script");
  script.src = "jss/strillettera.js?v=global-listener-1";
  script.defer = true;
  document.body.appendChild(script);
});
