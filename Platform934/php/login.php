<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$username = trim($data->username);
$password = trim($data->password);

// Cerca l'utente nel database
$stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Verifica se l'utente esiste e se la password inserita corrisponde a quella criptata
if($user && password_verify($password, $user['password'])) {
    $_SESSION['activeWizard'] = $username; // Salva la sessione in PHP
    echo json_encode(["success" => true, "message" => "Bentornato, $username! I mattoni si stanno aprendo..."]);
} else {
    echo json_encode(["success" => false, "message" => "Nox! Parola d'ordine errata o mago sconosciuto."]);
}
?>