<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(["success" => false, "message" => "Devi accedere prima."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$wand = trim($data->wand ?? '');
$username = $_SESSION['activeWizard'];
$allowedWands = [
    "Bacchetta di Harry Potter",
    "Bacchetta di Hermione Granger",
    "Bacchetta di Ron Weasley",
    "La Bacchetta di Sambuco",
    "Bacchetta di Draco Malfoy",
    "Bacchetta di Lord Voldemort"
];

if (!in_array($wand, $allowedWands, true)) {
    echo json_encode(["success" => false, "message" => "Bacchetta non valida."]);
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
          AND COLUMN_NAME IN ('wand', 'bacchetta')
        ORDER BY FIELD(COLUMN_NAME, 'wand', 'bacchetta')
        LIMIT 1
    ");
    $columnStmt->execute();
    $wandColumn = $columnStmt->fetchColumn();

    if (!$wandColumn) {
        $pdo->exec("ALTER TABLE users ADD COLUMN wand VARCHAR(120) DEFAULT NULL");
        $wandColumn = 'wand';
    }

    $stmt = $pdo->prepare("UPDATE users SET `$wandColumn` = ? WHERE id = ?");
    $stmt->execute([$wand, $user['id']]);

    echo json_encode([
        "success" => true,
        "message" => "Bacchetta salvata nel database.",
        "wand" => $wand,
        "column" => $wandColumn
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Errore nel salvataggio della bacchetta: " . $e->getMessage()
    ]);
}
?>
