# 🚂 Platform 9¾

**Platform 9¾** è una piattaforma web interattiva ispirata al mondo magico di Harry Potter, progettata per offrire un’esperienza digitale immersiva, narrativa e ricca di contenuti esplorabili.

Il progetto permette all’utente di entrare in un ambiente ispirato a Hogwarts, navigando tra pagine tematiche, ambientazioni 3D, personaggi, oggetti magici, giochi e funzionalità interattive.

---

## ✨ Descrizione del progetto

**Platform 9¾** nasce come progetto creativo che unisce sviluppo web, storytelling e contenuti multimediali.

La piattaforma include diverse sezioni dedicate al mondo magico, come il profilo utente, lo smistamento nella casa, la scelta della bacchetta, la posta, la guferia, il pensatoio, le pozioni, il quidditch e molte altre aree esplorabili.

L’obiettivo è ricreare una piccola esperienza digitale magica, in cui ogni pagina rappresenta una tappa del viaggio dell’utente all’interno dell’universo di Hogwarts.

---

## 🪄 Funzionalità principali

- Homepage interattiva
- Registrazione e login utente
- Profilo personale
- Smistamento nella casa di Hogwarts
- Scelta della bacchetta
- Sistema di posta
- Guferia
- Pensatoio
- Pozioni
- Club dei duellanti
- Archivio
- Gazzetta
- Quidditch
- Personaggi e oggetti 3D
- Ambientazioni ispirate a Hogwarts
- Asset multimediali: immagini, audio, video e modelli `.glb`

---

## 📁 Struttura del progetto

    Platform934/
      audio/             File audio
      css/               Fogli di stile
      images/            Immagini e asset grafici
      jss/               Script JavaScript
      php/               File backend PHP
      models/            Modelli 3D
      personaggi/        Personaggi e oggetti magici 3D
      Hogwarts Castle/   Ambientazioni 3D
      node_modules/      Dipendenze locali
      index.html         Pagina principale
      README.md          Documentazione del progetto

---

## 🛠️ Tecnologie utilizzate

- HTML
- CSS
- JavaScript
- PHP
- MySQL
- Three.js
- Modelli 3D
- Git
- Git LFS

---

## ⚙️ Setup del progetto

Per eseguire correttamente il progetto in locale è consigliato utilizzare **XAMPP**, poiché alcune funzionalità dipendono da file PHP e da un database MySQL.

---

### 1. Clonare la repository

Aprire il terminale o il prompt dei comandi ed eseguire:

    git clone https://github.com/Mariagiusi23/Platform-9and3quarters.git

---

### 2. Spostare il progetto nella cartella di XAMPP

Dopo aver clonato la repository, spostare la cartella del progetto all’interno della cartella `htdocs` di XAMPP.

#### Su macOS

La cartella consigliata è:

    /Applications/XAMPP/xamppfiles/htdocs/

La struttura finale dovrebbe essere simile a questa:

    /Applications/XAMPP/xamppfiles/htdocs/Platform-9and3quarters/Platform934

#### Su Windows

La cartella consigliata è:

    C:\xampp\htdocs\

La struttura finale dovrebbe essere simile a questa:

    C:\xampp\htdocs\Platform-9and3quarters\Platform934

---

### 3. Avviare XAMPP

Aprire XAMPP e avviare:

- Apache
- MySQL

MySQL è necessario per le funzionalità che utilizzano il database, come registrazione, login, profilo utente e posta.

---

### 4. Aprire il progetto nel browser

Dopo aver avviato Apache, aprire il browser e visitare:

    http://localhost/Platform-9and3quarters/Platform934/

oppure direttamente:

    http://localhost/Platform-9and3quarters/Platform934/homepage.html

---

## 🗄️ Configurazione del database

Alcune funzionalità del progetto utilizzano PHP e MySQL.

Il file di configurazione del database si trova in:

    Platform934/php/db.php

All’interno di questo file è possibile modificare i dati di connessione in base al proprio ambiente locale.

Esempio di configurazione tipica con XAMPP:

    $host = "localhost";
    $user = "root";
    $password = "";
    $database = "nome_database";

Prima di utilizzare le funzionalità collegate agli utenti, assicurarsi che il database sia stato creato correttamente e che il nome corrisponda a quello indicato nel file `db.php`.

---

## 📦 Dipendenze

La repository include anche la cartella `node_modules`.

Se fosse necessario reinstallare le dipendenze, eseguire:

    cd Platform934
    npm install

---

## 🧩 File grandi e Git LFS

Il progetto contiene file multimediali e modelli 3D di grandi dimensioni, come:

- file `.glb`
- file `.stl`
- file `.mp4`

Per questo motivo la repository utilizza **Git LFS**.

Dopo aver clonato il progetto, se alcuni file grandi non vengono scaricati correttamente, installare Git LFS ed eseguire:

    git lfs install
    git lfs pull

---

## 🌌 Obiettivo del progetto

L’obiettivo di **Platform 9¾** è creare un’esperienza web magica, immersiva e interattiva, in cui l’utente possa esplorare ambientazioni, contenuti e funzionalità ispirate al mondo di Hogwarts.

Il progetto combina sviluppo web, creatività, storytelling e contenuti 3D in un’unica piattaforma digitale.

---

## ©️ Copyright e note sui contenuti

Questo progetto è stato realizzato esclusivamente a **scopo universitario, didattico e non commerciale**.

**Platform 9¾** è un progetto ispirato al mondo di Harry Potter, ma non è affiliato, associato, autorizzato, approvato o sponsorizzato da J.K. Rowling, Warner Bros., Wizarding World o da altri titolari ufficiali dei relativi diritti.

Tutti i marchi, nomi, personaggi, ambientazioni, riferimenti narrativi e contenuti riconducibili all’universo di Harry Potter appartengono ai rispettivi proprietari.

Gli asset, i modelli 3D, le immagini, i file audio, i video, le texture, i font e qualsiasi altro contenuto di terze parti eventualmente utilizzato all’interno del progetto appartengono ai rispettivi autori e proprietari.

Il progetto non ha finalità commerciali e viene presentato unicamente come elaborato creativo e accademico.

---

## 👩‍💻 Autrici

Progetto realizzato da **Aurora Di Giovanna** e **Mariagiusi Nicodemo**.

