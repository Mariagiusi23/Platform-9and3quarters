<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(["success" => false]); 
    exit;
}

function generateVaultNumber($pdo) {
    do {
        $vault = (string) random_int(100, 9999);
        $check = $pdo->prepare("SELECT id FROM users WHERE numero_caveau = ?");
        $check->execute([$vault]);
    } while ($check->fetch());

    return $vault;
}

function getOptionalUserColumn($pdo, $columns) {
    $placeholders = implode(',', array_fill(0, count($columns), '?'));
    $stmt = $pdo->prepare("
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'users'
          AND COLUMN_NAME IN ($placeholders)
        ORDER BY FIELD(COLUMN_NAME, $placeholders)
        LIMIT 1
    ");
    $stmt->execute(array_merge($columns, $columns));
    return $stmt->fetchColumn();
}

$houseColumn = getOptionalUserColumn($pdo, ['house', 'casata']);
$wandColumn = getOptionalUserColumn($pdo, ['wand', 'bacchetta']);
$selectColumns = "id, username, email, avatar_url, numero_caveau, soldi_caveau";

if ($houseColumn) {
    $selectColumns .= ", `$houseColumn` AS house";
}

if ($wandColumn) {
    $selectColumns .= ", `$wandColumn` AS wand";
}

// Prende username, email, avatar 3D, dati del caveau, casata e bacchetta
$stmt = $pdo->prepare("SELECT $selectColumns FROM users WHERE username = ?");
$stmt->execute([$_SESSION['activeWizard']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && empty($user['numero_caveau'])) {
    $user['numero_caveau'] = generateVaultNumber($pdo);
    $updateVault = $pdo->prepare("UPDATE users SET numero_caveau = ? WHERE id = ?");
    $updateVault->execute([$user['numero_caveau'], $user['id']]);
}

if ($user && $user['soldi_caveau'] === null) {
    $user['soldi_caveau'] = 0;
}

if ($user && !isset($user['house'])) {
    $user['house'] = null;
}

if ($user && !isset($user['wand'])) {
    $user['wand'] = null;
}

unset($user['id']);

echo json_encode(["success" => true, "user" => $user]);
?>
