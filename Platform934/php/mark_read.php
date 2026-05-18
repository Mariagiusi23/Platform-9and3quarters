<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    try {
        $stmt = $pdo->prepare("UPDATE strillettere SET letta = TRUE WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false]);
    }
}
?>