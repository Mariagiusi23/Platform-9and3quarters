-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 10, 2026 alle 21:47
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `platform934`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `ricordi`
--

CREATE TABLE `ricordi` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `titolo` varchar(100) NOT NULL,
  `testo` text NOT NULL,
  `data_creazione` timestamp NOT NULL DEFAULT current_timestamp(),
  `gif_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ricordi`
--

INSERT INTO `ricordi` (`id`, `username`, `titolo`, `testo`, `data_creazione`, `gif_url`) VALUES
(1, 'tutti', 'L\'arrivo a Hogwarts', 'Il primo sguardo al castello illuminato attraverso il Lago Nero. Un\'emozione che non scorderò mai.', '2026-05-02 09:52:24', 'https://64.media.tumblr.com/90057590f4936dec676acfb6eb8b6070/tumblr_nad8lxEIwX1qetk8mo1_500.gifv'),
(2, 'tutti', 'Expecto Patronum!', 'La prima volta che ho visto una luce argentea prendere forma dalla punta della mia bacchetta.', '2026-05-02 09:52:24', 'https://i.pinimg.com/originals/79/b7/37/79b7374eb0ce5b15dc4988d035bfccac.gif'),
(3, 'Mariagiusi', 'Hogwarts a Natale', 'Per la prima volta ho visto hogwarts a natale, non ho mai visto così tante decorazioni.', '2026-05-02 10:02:33', 'https://media3.giphy.com/media/5SRPnFvRG918k/giphy.gif?cid=ecf05e47qovp4fcoexuj3fk7mnatzz8e7isk8hjc2mbm49qv&rid=giphy.gif&ct=g');

-- --------------------------------------------------------

--
-- Struttura della tabella `strillettere`
--

CREATE TABLE `strillettere` (
  `id` int(11) NOT NULL,
  `mittente` varchar(255) NOT NULL,
  `destinatario` varchar(255) NOT NULL,
  `testo` text NOT NULL,
  `letta` tinyint(1) DEFAULT 0,
  `data_invio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `strillettere`
--

INSERT INTO `strillettere` (`id`, `mittente`, `destinatario`, `testo`, `letta`, `data_invio`) VALUES
(1, 'Mariagiusi', 'Manuela', 'ciao ti vedo!!', 1, '2026-05-02 10:42:25'),
(2, 'Mariagiusi', 'Manuela', 'ccc', 1, '2026-05-02 10:42:47'),
(3, 'Mariagiusi', 'Manuela', 'ciaoo', 1, '2026-05-02 10:48:34'),
(4, 'Mariagiusi', 'Manuela', 'ciao', 1, '2026-05-02 10:51:25'),
(5, 'Mariagiusi', 'Manuela', 'ciao, sono arrabbiata con te', 1, '2026-05-02 10:52:21'),
(6, 'Mariagiusi', 'Manuela', 'ciao', 1, '2026-05-02 10:54:29'),
(7, 'Mariagiusi', 'Manuela', 'Ciao, sono venuta a sapere che mi hai rubato la macchina!! a casa faremo i conti!', 1, '2026-05-02 10:55:16');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `wand` varchar(100) DEFAULT NULL,
  `house` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `reset_token_hash` varchar(64) DEFAULT NULL,
  `reset_expires_at` datetime DEFAULT NULL,
  `numero_caveau` varchar(20) DEFAULT NULL,
  `soldi_caveau` int(11) DEFAULT 500
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `wand`, `house`, `email`, `avatar_url`, `reset_token`, `reset_expires`, `reset_token_hash`, `reset_expires_at`, `numero_caveau`, `soldi_caveau`) VALUES
(3, 'Aurora27', '$2y$10$5j/72Q.QhGrIar8XsIaFNOtWHApZ3/HyyBXYCD9NAyPRuslkc0zNW', NULL, NULL, 'auroradigiovanna@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 500),
(4, 'Mariagiusi', '$2y$10$2XPkzqWzKaNrLHko9MObJ.h5aYfSEa0vPvu8zzTXaOhND4PyX15CW', 'Bacchetta di Ron Weasley', 'Corvonero', 'mariagiusi@gmail.com', 'dementor.glb', NULL, NULL, NULL, NULL, '455', 179),
(5, 'Manuela', '$2y$10$jCCzTW.F4tIN5g3bDNMUm.1sJJg6t.fUAUEJp2UB8YnxscFagLKZK', NULL, NULL, 'manu@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 500);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `ricordi`
--
ALTER TABLE `ricordi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `strillettere`
--
ALTER TABLE `strillettere`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `ricordi`
--
ALTER TABLE `ricordi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `strillettere`
--
ALTER TABLE `strillettere`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
