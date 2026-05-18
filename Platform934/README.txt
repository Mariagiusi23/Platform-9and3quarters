# Platform 9 ¾

Platform 9 ¾ e' un sito web interattivo ispirato al mondo di Harry Potter. Il progetto contiene pagine HTML, fogli CSS, script JavaScript, file PHP, immagini, modelli 3D e minigiochi.

## Requisiti

Per avviare correttamente il progetto servono:

- XAMPP installato sul computer;
- browser web aggiornato, ad esempio Google Chrome;
- cartella del progetto chiamata `Platform934`;
- cartella del progetto inserita dentro `htdocs`.

## Dove mettere la cartella

La cartella del progetto deve trovarsi dentro la cartella `htdocs` di XAMPP.

Su macOS il percorso tipico e':

```text
/Applications/XAMPP/xamppfiles/htdocs/Platform934
```

Su Windows il percorso tipico e':

```text
C:\xampp\htdocs\Platform934
```

## Come avviare il sito

1. Aprire XAMPP.
2. Avviare il servizio **Apache**.
3. Se si usano funzioni collegate al database, avviare anche **MySQL**.
4. Controllare che la cartella `Platform934` sia dentro `htdocs`.
5. Aprire Google Chrome o un altro browser.
6. Scrivere nella barra degli indirizzi:

```text
http://localhost/Platform934/
```

In alternativa si puo' aprire direttamente una pagina specifica, ad esempio:

```text
http://localhost/Platform934/homepage.html
```

## Configurazione del database

Per usare registrazione, login, profilo, posta, guferia, pensatoio, salvataggio della casata e salvataggio della bacchetta serve il database MySQL del progetto.

Il file del database si trova nella cartella principale del progetto:

```text
Platform934/platform934.sql
```

Il database deve chiamarsi esattamente:

```text
platform934
```

Il codice PHP e' gia' configurato per usare questo nome nel file:

```text
Platform934/php/db.php
```

### Come importare il database con phpMyAdmin

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

Dopo l'importazione, nel database `platform934` devono comparire le tabelle principali:

```text
users
strillettere
ricordi
```

## Note importanti

- Il sito deve essere aperto tramite `localhost`, non facendo doppio click sui file HTML.
- Apache serve per far funzionare correttamente i file del progetto.
- MySQL e il database `platform934` servono per login, registrazione, profilo, posta, guferia, pensatoio e salvataggi dell'utente.
- Se il browser mostra errore 404, controllare che il nome della cartella sia esattamente `Platform934` e che si trovi dentro `htdocs`.

## Pagina principale consigliata

Per presentare il progetto si consiglia di partire da:

```text
http://localhost/Platform934/homepage.html
```
