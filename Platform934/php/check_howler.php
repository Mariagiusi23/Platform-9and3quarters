<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(["success" => false]);
    exit;
}

$destinatario = $_SESSION['activeWizard'];

try {
    // Cerchiamo l'ultima strillettera non letta
    $stmt = $pdo->prepare("SELECT id, mittente, testo FROM strillettere WHERE destinatario = ? AND letta = FALSE ORDER BY id ASC LIMIT 1");
    $stmt->execute([$destinatario]);
    $howler = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($howler) {
        // La marchiamo subito come letta per non farla urlare all'infinito
        $update = $pdo->prepare("UPDATE strillettere SET letta = TRUE WHERE id = ?");
        $update->execute([$howler['id']]);
        
        echo json_encode(["success" => true, "howler" => $howler]);
    } else {
        echo json_encode(["success" => false]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false]);
}
?>