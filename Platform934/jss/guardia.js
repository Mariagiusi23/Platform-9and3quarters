// Controlla se ce un mago attualmente loggato nella sessione
const activeWizard = sessionStorage.getItem('activeWizard');

const guardMessages = {
    it: "Alt la! Reparto ad accesso limitato. Devi fare l'accesso dal Binario 9 3/4 per visitare questa zona.",
    en: "Stop there! Restricted area. You must log in from Platform 9 3/4 to visit this section.",
    fr: "Halte la! Zone a acces limite. Vous devez vous connecter depuis la Voie 9 3/4 pour visiter cette zone.",
    es: "Alto ahi! Zona de acceso restringido. Debes iniciar sesion desde el Anden 9 3/4 para visitar esta seccion.",
    de: "Halt! Bereich mit eingeschranktem Zugang. Du musst dich an Gleis 9 3/4 anmelden, um diesen Bereich zu besuchen.",
    pt: "Alto ai! Area de acesso restrito. Voce precisa entrar pela Plataforma 9 3/4 para visitar esta secao.",
    ru: "Стойте! Зона с ограниченным доступом. Чтобы посетить этот раздел, войдите с Платформы 9 3/4.",
    "zh-CN": "止步！这里是限制访问区域。你必须先从9又3/4站台登录，才能进入此区域。",
    ja: "止まってください！ここは制限エリアです。この区域に入るには、9と3/4番線からログインしてください。",
    ar: "توقف! هذه منطقة محدودة الوصول. يجب تسجيل الدخول من الرصيف 9 3/4 لزيارة هذا القسم."
};

function getGuardLanguage() {
    return localStorage.getItem('pf_google_lang') || localStorage.getItem('pf_lang') || 'it';
}

// Se non ce nessuno, lancia l'incantesimo di respingimento
if (!activeWizard) {
    const lang = getGuardLanguage();
    alert(guardMessages[lang] || guardMessages.it);
    window.location.href = 'index.html'; // Lo rispedisce immediatamente alla home/login
}
