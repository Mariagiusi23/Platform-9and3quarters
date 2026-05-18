<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(["success" => false, "message" => "Devi essere loggato per ricevere galeoni."]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$game = $data['game'] ?? '';

$rewards = [
    'quidditch' => 15,
    'club_duellanti' => 20,
    'pozioni' => 12,
    'legilimanzia' => 10
];

if (!isset($rewards[$game])) {
    echo json_encode(["success" => false, "message" => "Minigioco non valido."]);
    exit;
}

$reward = $rewards[$game];

try {
    $stmt = $pdo->prepare("SELECT id, soldi_caveau FROM users WHERE username = ?");
    $stmt->execute([$_SESSION['activeWizard']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "message" => "Mago non trovato."]);
        exit;
    }

    $newBalance = (int)($user['soldi_caveau'] ?? 0) + $reward;
    $update = $pdo->prepare("UPDATE users SET soldi_caveau = ? WHERE id = ?");
    $update->execute([$newBalance, $user['id']]);

    echo json_encode([
        "success" => true,
        "reward" => $reward,
        "balance" => $newBalance
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Errore Gringott: " . $e->getMessage()]);
}
?>
