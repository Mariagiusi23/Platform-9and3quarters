<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(['success' => false, 'message' => 'Devi essere loggato per usare il Pensatoio!']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$username = $_SESSION['activeWizard'];
$titolo = trim($data['titolo']);
$testo = trim($data['testo']);
$gif_url = trim($data['gif_url']); // Può essere vuoto

try {
    $stmt = $pdo->prepare("INSERT INTO ricordi (username, titolo, testo, gif_url) VALUES (?, ?, ?, ?)");
    $stmt->execute([$username, $titolo, $testo, $gif_url]);
    
    echo json_encode(["success" => true, "message" => "Ricordo versato nel Pensatoio."]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Il filo del ricordo si è spezzato."]);
}
?>