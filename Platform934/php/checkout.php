<?php
session_start();
require 'db.php'; 
header('Content-Type: application/json');

// Verifica se l'utente è loggato usando la mia sessione
if (!isset($_SESSION['activeWizard'])) {
    echo json_encode(['success' => false, 'message' => 'Devi effettuare l\'accesso per comprare!']);
    exit;
}

// Recuperiamo i dati inviati da Js
$username = $_SESSION['activeWizard']; 
$data = json_decode(file_get_contents("php://input"), true);

// Protezione base contro dati mancanti
if (!$data || !isset($data['password']) || !isset($data['vault_number']) || !isset($data['total'])) {
    echo json_encode(['success' => false, 'message' => 'Dati del modulo incompleti.']);
    exit;
}

$password = trim($data['password']);
$inputVault = trim($data['vault_number']);
$totalPrice = (int)$data['total'];

try {
    // Recuperiamo l'utente dal db
    $stmt = $pdo->prepare("SELECT id, password, numero_caveau, soldi_caveau FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Mago non trovato nel database!']);
        exit;
    }

    // Verifica la Password cioè chiave del caveu
    if (!password_verify($password, $user['password'])) {
        echo json_encode(['success' => false, 'message' => 'Chiave magica errata! Accesso al caveau negato.']);
        exit;
    }

    $finalVault = $user['numero_caveau'];
    if (empty($user['numero_caveau'])) {
        $finalVault = $inputVault;
        $updateVault = $pdo->prepare("UPDATE users SET numero_caveau = ? WHERE id = ?");
        $updateVault->execute([$finalVault, $user['id']]);
    } else {
        // Non è la prima volta: verifichiamo che il numero inserito corrisponda al database
        if ($user['numero_caveau'] !== $inputVault) {
             echo json_encode(['success' => false, 'message' => "Questo non è il tuo caveau! Il tuo numero è: " . $user['numero_caveau']]);
             exit;
        }
    }

    // Verifica i Fondi
    if ($user['soldi_caveau'] < $totalPrice) {
        echo json_encode(['success' => false, 'message' => 'Non ci sono abbastanza soldi nel caveau!']);
        exit;
    }

    // Scala i soldi
    $newBalance = $user['soldi_caveau'] - $totalPrice;
    $payStmt = $pdo->prepare("UPDATE users SET soldi_caveau = ? WHERE id = ?");
    $payStmt->execute([$newBalance, $user['id']]);

    // Risposta di successo
    echo json_encode([
        'success' => true, 
        'message' => 'Pagamento accettato!',
        'remaining_balance' => $newBalance,
        'vault' => $finalVault
    ]);

} catch (PDOException $e) {
    // Gestione errori del database
    echo json_encode(['success' => false, 'message' => 'Errore interno della Gringott.']);
}
?>