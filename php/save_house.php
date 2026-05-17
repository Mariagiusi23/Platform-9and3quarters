<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(["success" => false, "message" => "Devi accedere prima."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$house = trim($data->house ?? '');
$username = $_SESSION['activeWizard'];
$allowedHouses = ['Grifondoro', 'Corvonero', 'Tassorosso', 'Serpeverde'];

if (!in_array($house, $allowedHouses, true)) {
    echo json_encode(["success" => false, "message" => "Casata non valida."]);
    exit;
}

try {
    $userStmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $userStmt->execute([$username]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "message" => "Utente non trovato."]);
        exit;
    }

    $columnStmt = $pdo->prepare("
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'users'
          AND COLUMN_NAME IN ('house', 'casata')
        ORDER BY FIELD(COLUMN_NAME, 'house', 'casata')
        LIMIT 1
    ");
    $columnStmt->execute();
    $houseColumn = $columnStmt->fetchColumn();

    if (!$houseColumn) {
        $pdo->exec("ALTER TABLE users ADD COLUMN house VARCHAR(30) DEFAULT NULL");
        $houseColumn = 'house';
    }

    $stmt = $pdo->prepare("UPDATE users SET `$houseColumn` = ? WHERE id = ?");
    $stmt->execute([$house, $user['id']]);

    echo json_encode([
        "success" => true,
        "message" => "Casata salvata nel database.",
        "house" => $house,
        "column" => $houseColumn
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Errore nel salvataggio della casata: " . $e->getMessage()
    ]);
}
?>
