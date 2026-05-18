<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(['success' => false, 'message' => 'Devi effettuare l\'accesso!']);
    exit;
}

$destinatario = $_SESSION['activeWizard'];

try {
    // Peschiamo tutte le lettere, dalle più recenti alle più vecchie
    $stmt = $pdo->prepare("SELECT * FROM strillettere WHERE destinatario = ? ORDER BY data_invio DESC");
    $stmt->execute([$destinatario]);
    $lettere = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'lettere' => $lettere]);
} catch (PDOException $e) {
    echo json_encode(['success' => false]);
}
?>