<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$mittente = $_SESSION['activeWizard'] ?? 'Anonimo';
$destinatario = trim($data['destinatario']);
$testo = trim($data['testo']);

try {
    $stmt = $pdo->prepare("INSERT INTO strillettere (mittente, destinatario, testo) VALUES (?, ?, ?)");
    $stmt->execute([$mittente, $destinatario, $testo]);
    echo json_encode(["success" => true, "message" => "Gufo partito!"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Errore nell'invio."]);
}
?>