<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$old_username = $_SESSION['activeWizard'] ?? '';

// ==========================================
// 1. Azione: Salva Avatar 3D
// ==========================================
if (isset($data->action) && $data->action === 'avatar3d') {
    $stmt = $pdo->prepare("UPDATE users SET avatar_url = ? WHERE username = ?");
    $stmt->execute([$data->avatar_url, $old_username]);
    echo json_encode(["success" => true, "message" => "Avatar 3D salvato magicamente!"]);
    exit;
}

// ==========================================
// 2. Azione: Aggiorna Profilo (Nome/Email)
// ==========================================
if (isset($data->action) && $data->action === 'profile') {
    $new_username = trim($data->username);
    $email = trim($data->email);

    if ($new_username !== $old_username) {
        $check = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $check->execute([$new_username]);
        if ($check->rowCount() > 0) {
            echo json_encode(["success" => false, "message" => "Nickname già in uso."]);
            exit;
        }
    }

    $stmt = $pdo->prepare("UPDATE users SET username=?, email=? WHERE username=?");
    $stmt->execute([$new_username, $email, $old_username]);
    
    $_SESSION['activeWizard'] = $new_username;
    echo json_encode(["success" => true, "message" => "Dati aggiornati!", "new_username" => $new_username]);
    exit;
}

// ==========================================
// 3. Azione: Cambio Password Diretto dal Profilo
// ==========================================
if (isset($data->action) && $data->action === 'change_password') {
    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->execute([$old_username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (password_verify($data->oldPass, $user['password'])) {
        $newHash = password_hash($data->newPass, PASSWORD_BCRYPT);
        $update = $pdo->prepare("UPDATE users SET password = ? WHERE username = ?");
        $update->execute([$newHash, $old_username]);
        echo json_encode(["success" => true, "message" => "Parola d'ordine aggiornata con successo!"]);
    } else {
        echo json_encode(["success" => false, "message" => "La vecchia parola d'ordine è errata."]);
    }
    exit;
}
?>
