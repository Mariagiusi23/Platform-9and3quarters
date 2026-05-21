<?php
$host = 'localhost';
$db   = 'platform934';
$user = 'root'; 
$pass = '';     

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    // Imposta la modalità di errore per lanciare eccezioni
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["success" => false, "message" => "Errore di connessione al Ministero: " . $e->getMessage()]));
}
?>