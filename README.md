# 🚂 Platform 9¾

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)
![Git LFS](https://img.shields.io/badge/Git%20LFS-F05032?style=for-the-badge&logo=git&logoColor=white)
![University Project](https://img.shields.io/badge/University%20Project-Yes-8A2BE2?style=for-the-badge)
![Non Commercial](https://img.shields.io/badge/Use-Non--Commercial-red?style=for-the-badge)

**Platform 9¾** è una piattaforma web interattiva ispirata al mondo magico di Harry Potter, progettata per offrire un'esperienza digitale immersiva, narrativa e ricca di contenuti esplorabili.

Il progetto permette all'utente di entrare in un ambiente ispirato a Hogwarts, navigando tra pagine tematiche, ambientazioni 3D, personaggi, oggetti magici, giochi e funzionalità interattive.

---

## ✨ Descrizione del progetto

**Platform 9¾** nasce come progetto creativo che unisce sviluppo web, storytelling e contenuti multimediali.

La piattaforma include diverse sezioni dedicate al mondo magico, come il profilo utente, lo smistamento nella casa, la scelta della bacchetta, la posta, la guferia, il pensatoio, le pozioni, il quidditch e molte altre aree esplorabili.

L'obiettivo è ricreare una piccola esperienza digitale magica, in cui ogni pagina rappresenta una tappa del viaggio dell'utente all'interno dell'universo di Hogwarts.

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
- Asset multimediali: immagini, video e modelli `.glb`

---

## 📁 Struttura del progetto

```text
Platform934/
  css/               Fogli di stile
  images/            Immagini e asset grafici
  jss/               Script JavaScript
  php/               File backend PHP
  models/            Modelli 3D
  personaggi/        Personaggi e oggetti magici 3D
  Hogwarts Castle/   Ambientazioni 3D
  node_modules/      Dipendenze locali
  platform934.sql    Database MySQL del progetto
  index.html         Pagina principale
  README.md          Documentazione del progetto
```

---

## 🛠️ Tecnologie utilizzate

- HTML
- CSS
- JavaScript
- PHP
- MySQL / MariaDB
- Three.js
- Modelli 3D
- Git
- Git LFS
- XAMPP

---

## ⚙️ Setup del progetto

Per eseguire correttamente il progetto in locale è consigliato utilizzare **XAMPP**, poichè alcune funzionalità dipendono da file PHP e da un database MySQL.

XAMPP può essere scaricato dal sito ufficiale Apache Friends:

```text
https://www.apachefriends.org/download.html
```

---

### 📥 1. Clonare la repository nel modo corretto

Il progetto contiene file multimediali e modelli 3D di grandi dimensioni gestiti con **Git LFS**.

Per questo motivo è sconsigliato scaricare la repository da GitHub usando il pulsante **Code > Download ZIP**: alcuni file grandi potrebbero essere scaricati come semplici puntatori Git LFS invece che come file reali.

Se un file `.glb`, `.stl` o `.mp4` pesa solo pochi byte, ad esempio circa 130 byte, non è il file vero: è un puntatore Git LFS.

Il metodo consigliato è scaricare il progetto da terminale:

```bash
git clone https://github.com/Mariagiusi23/Platform-9and3quarters.git
cd Platform-9and3quarters
git lfs install
git lfs pull
```

Se Git LFS non è installato, installarlo prima di eseguire `git lfs pull`.

---

### 📂 2. Spostare il progetto nella cartella di XAMPP

Dopo aver clonato la repository, spostare la cartella del progetto all'interno della cartella `htdocs` di XAMPP.

#### 🍎 Su macOS

La cartella consigliata è:

```text
/Applications/XAMPP/xamppfiles/htdocs/
```

La struttura finale dovrebbe essere simile a questa:

```text
/Applications/XAMPP/xamppfiles/htdocs/Platform-9and3quarters/Platform934
```

#### 🪟 Su Windows

La cartella consigliata è:

```text
C:\xampp\htdocs\
```

La struttura finale dovrebbe essere simile a questa:

```text
C:\xampp\htdocs\Platform-9and3quarters\Platform934
```

---

### ▶️ 3. Avviare XAMPP

Aprire XAMPP e avviare:

- Apache
- MySQL

MySQL è necessario per le funzionalità che utilizzano il database, come registrazione, login, profilo utente, posta, guferia, pensatoio, salvataggio della casata e salvataggio della bacchetta.

---

### 🌐 4. Aprire il progetto nel browser

Dopo aver avviato Apache, aprire il browser e visitare:

```text
http://localhost/Platform-9and3quarters/Platform934/
```

oppure direttamente:

```text
http://localhost/Platform-9and3quarters/Platform934/homepage.html
```

Se la cartella `Platform934` viene inserita direttamente dentro `htdocs`, l'indirizzo diventa:

```text
http://localhost/Platform934/
```

oppure:

```text
http://localhost/Platform934/homepage.html
```

---

## 🗄️ Configurazione del database

Alcune funzionalità del progetto utilizzano PHP e MySQL.

Il database del progetto è contenuto nel file:

```text
Platform934/platform934.sql
```

Il file `platform934.sql` deve rimanere nella cartella principale del progetto, cioè dentro `Platform934/`.

Non va copiato manualmente nelle cartelle interne di MySQL: deve essere importato tramite phpMyAdmin o tramite terminale.

Il database deve chiamarsi esattamente:

```text
platform934
```

Il file di configurazione del database si trova in:

```text
Platform934/php/db.php
```

All'interno di questo file è possibile modificare i dati di connessione in base al proprio ambiente locale.

Esempio di configurazione tipica con XAMPP:

```php
$host = "localhost";
$user = "root";
$password = "";
$database = "platform934";
```

Prima di utilizzare le funzionalità collegate agli utenti, assicurarsi che il database sia stato creato correttamente e che il nome corrisponda a quello indicato nel file `db.php`.

---

### 🧭 Importare il database con phpMyAdmin

1. Aprire XAMPP.
2. Avviare **Apache** e **MySQL**.
3. Aprire il browser e andare su:

```text
http://localhost/phpmyadmin
```

4. Creare un nuovo database chiamato `platform934`.
5. Cliccare sul database `platform934`.
6. Aprire la scheda **Importa**.
7. Selezionare il file:

```text
Platform934/platform934.sql
```

8. Premere **Esegui**.

Dopo l'importazione, nel database `platform934` devono comparire le tabelle principali del progetto, tra cui:

```text
users
strillettere
ricordi
```

---

### 💻 Importare il database da terminale

In alternativa a phpMyAdmin, è possibile importare il database da terminale.

#### 🍎 macOS con XAMPP

```bash
/Applications/XAMPP/xamppfiles/bin/mysqladmin -u root -p create platform934
/Applications/XAMPP/xamppfiles/bin/mysql -u root -p platform934 < /Applications/XAMPP/xamppfiles/htdocs/Platform-9and3quarters/Platform934/platform934.sql
```

#### 🪟 Windows con XAMPP

```bash
C:\xampp\mysql\bin\mysqladmin.exe -u root -p create platform934
C:\xampp\mysql\bin\mysql.exe -u root -p platform934 < C:\xampp\htdocs\Platform-9and3quarters\Platform934\platform934.sql
```

Se l'utente `root` non ha password, quando viene richiesta la password premere semplicemente Invio.

---

## 📦 Dipendenze

La repository include anche la cartella `node_modules`.

Se fosse necessario reinstallare le dipendenze, eseguire:

```bash
cd Platform934
npm install
```

---

## 🧩 File grandi e Git LFS

Il progetto contiene file multimediali e modelli 3D di grandi dimensioni, come:

- file `.glb`
- file `.stl`
- file `.mp4`

Per questo motivo la repository utilizza **Git LFS**.

Dopo aver clonato il progetto, se alcuni file grandi non vengono scaricati correttamente, installare Git LFS ed eseguire:

```bash
git lfs install
git lfs pull
```

Scaricare la repository come file ZIP da GitHub non è il metodo consigliato, perchè i file grandi potrebbero rimanere come puntatori Git LFS e quindi non funzionare nel sito.

In alternativa, i file grandi possono essere scaricati anche dalla cartella Google Drive del progetto:

```text
https://drive.google.com/drive/folders/1DQBzInUF_MqJJ4IxN21uCSkhfYI1B2vL?usp=share_link
```

Dopo averli scaricati, bisogna copiarli nelle rispettive cartelle del progetto mantenendo gli stessi nomi e percorsi.

---

## ⚠️ Note importanti

- Il sito deve essere aperto tramite `localhost`, non facendo doppio click sui file HTML.
- Apache serve per far funzionare correttamente i file PHP e il caricamento del progetto in locale.
- MySQL e il database `platform934` servono per login, registrazione, profilo, posta, guferia, pensatoio e salvataggi dell'utente.
- Il file `platform934.sql` è il database del progetto e deve essere importato in MySQL.
- I modelli 3D `.glb` e i video devono essere scaricati con Git LFS, altrimenti alcune pagine 3D possono non caricare gli asset.
- Se il browser mostra errore 404, controllare che il percorso della cartella corrisponda all'URL usato nel browser.

---

## 🌌 Obiettivo del progetto

L'obiettivo di **Platform 9¾** è creare un'esperienza web magica, immersiva e interattiva, in cui l'utente possa esplorare ambientazioni, contenuti e funzionalità ispirate al mondo di Hogwarts.

Il progetto combina sviluppo web, creatività, storytelling e contenuti 3D in un'unica piattaforma digitale.

---

## ©️ Copyright e note sui contenuti

Questo progetto è stato realizzato esclusivamente a **scopo universitario, didattico e non commerciale**.

**Platform 9¾** è un progetto ispirato al mondo di Harry Potter, ma non è affiliato, associato, autorizzato, approvato o sponsorizzato da J.K. Rowling, Warner Bros., Wizarding World o da altri titolari ufficiali dei relativi diritti.

Tutti i marchi, nomi, personaggi, ambientazioni, riferimenti narrativi e contenuti riconducibili all'universo di Harry Potter appartengono ai rispettivi proprietari.

Gli asset, i modelli 3D, le immagini, i file audio, i video, le texture, i font e qualsiasi altro contenuto di terze parti eventualmente utilizzato all'interno del progetto appartengono ai rispettivi autori e proprietari.

Il progetto non ha finalità commerciali e viene presentato unicamente come elaborato creativo e accademico.

---

## 👩‍💻 Autrici

Progetto realizzato da **Aurora Di Giovanna** e **Mariagiusi Nicodemo**.


