<?php

header('Content-Type: application/json');

// Connessione al database protetta da try/catch per gestire errori di connessione
try {
    $pdo = new PDO('mysql:host=localhost;dbname=platform934;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Connessione al database fallita."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$token = $data->token ?? '';
$newPassword = $data->newPassword ?? '';

if (
    empty($token) ||
    empty($newPassword) ||
    strlen($newPassword) < 8 ||
    !preg_match('/[A-Z]/', $newPassword) ||
    !preg_match('/[^A-Za-z0-9]/', $newPassword)
) {
    echo json_encode(["success" => false, "message" => "La parola d'ordine deve avere almeno 8 caratteri, una maiuscola e un carattere speciale."]);
    exit;
}

// Cerca un utente con quel token che non sia scaduto
$stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_expires > NOW()");
$stmt->execute([$token]);
$user = $stmt->fetch();

if ($user) {
    // Cripta la nuova password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Aggiorna la password e svuota il token in modo che non sia riutilizzabile
    $stmt = $pdo->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?");
    $stmt->execute([$hashedPassword, $user['id']]);

    echo json_encode(["success" => true, "message" => "Parola d'ordine aggiornata con successo! Ritorno al binario..."]);
} else {
    echo json_encode(["success" => false, "message" => "La magia del token è svanita o è scaduta. Riprova."]);
}
?>
