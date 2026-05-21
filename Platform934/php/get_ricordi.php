<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

$username = isset($_SESSION['activeWizard']) ? $_SESSION['activeWizard'] : '';

try {
    // Peschiamo i ricordi personali dell'utente loggato e di tutti
    $stmt = $pdo->prepare("SELECT * FROM ricordi WHERE username = ? OR username = 'tutti' ORDER BY id DESC");
    $stmt->execute([$username]);
    $ricordi = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(["success" => true, "memories" => $ricordi]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Errore nell'estrazione dei ricordi."]);
}
?>