<?php
// php/register.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'platform934'; 
$db_user = 'root';
$db_pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Connessione al database fallita."]);
    exit;
}

// Decodifica il pacchetto JSON inviato da JavaScript
$data = json_decode(file_get_contents("php://input"));

$username = trim($data->username ?? '');
$email = trim($data->email ?? '');
$password = $data->password ?? '';

function sendRegistrationThanksEmail($email, $username) {
    $mail = new PHPMailer(true);
    $safeUsername = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'aurorawattpad1981@gmail.com';
        $mail->Password   = 'ezbzlbmpdlmkmyks';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom('aurorawattpad1981@gmail.com', 'Platform 9 3/4');
        $mail->addAddress($email, $username);

        $mail->isHTML(true);
        $mail->Subject = "Grazie per esserti registrato su Platform 9 3/4";
        $mail->Body = "
            <div style='background-color:#180f2e; padding:30px; color:white; font-family:serif; text-align:center; border:2px solid gold; border-radius:10px;'>
                <h1 style='color:gold; font-size:26px; margin-top:0;'>Platform 9 ¾</h1>
                <p style='font-size:16px;'>Caro/a <strong style='color:gold;'>$safeUsername</strong>,</p>
                <p style='font-size:16px;'>grazie per esserti registrato/a su Platform 9 ¾.</p>
                <p style='font-size:16px;'>La tua lettera di ammissione è stata accettata: ora puoi accedere e iniziare il tuo viaggio.</p>
                <p style='font-size:13px; color:#d8c6ff; margin-top:30px;'>Ci vediamo oltre il muro del binario.</p>
            </div>
        ";
        $mail->AltBody = "Ciao $username, grazie per esserti registrato/a su Platform 9 3/4. Ora puoi accedere e iniziare il tuo viaggio.";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function allowRepeatedEmails(PDO $pdo) {
    $stmt = $pdo->prepare("
        SELECT INDEX_NAME
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'users'
          AND NON_UNIQUE = 0
          AND INDEX_NAME <> 'PRIMARY'
        GROUP BY INDEX_NAME
        HAVING GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) = 'email'
    ");
    $stmt->execute();

    foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $indexName) {
        $safeIndexName = str_replace('`', '``', $indexName);
        $pdo->exec("ALTER TABLE users DROP INDEX `$safeIndexName`");
    }
}

function usernameAlreadyExists(PDO $pdo, $username) {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(?)) LIMIT 1");
    $stmt->execute([$username]);

    return (bool) $stmt->fetch();
}

function isDuplicateEmailError(PDOException $e) {
    $message = implode(' ', $e->errorInfo ?? []) . ' ' . $e->getMessage();

    return stripos($message, 'email') !== false;
}

// Controlla che non manchi nulla
if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Dati mancanti. Compila tutti i campi!"]);
    exit;
}

// Requisiti validi solo per le nuove registrazioni.
if (strlen($password) < 8) {
    echo json_encode(["success" => false, "message" => "La parola d'ordine deve avere almeno 8 caratteri."]);
    exit;
}

if (!preg_match('/[A-Z]/', $password)) {
    echo json_encode(["success" => false, "message" => "La parola d'ordine deve contenere almeno una lettera maiuscola."]);
    exit;
}

if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
    echo json_encode(["success" => false, "message" => "La parola d'ordine deve contenere almeno un carattere speciale."]);
    exit;
}

// Controlla se il nome scelto è già stato usato
if (usernameAlreadyExists($pdo, $username)) {
    echo json_encode(["success" => false, "message" => "Questo nome da mago è già stato usato. Scegline un altro!"]);
    exit;
}

// L'email puo' essere riusata da piu' profili: l'unico vincolo di registrazione e' lo username.
allowRepeatedEmails($pdo);

// Cripta la password per la sicurezza
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Inserisci il nuovo mago nel database
$insertStmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");

try {
    if ($insertStmt->execute([$username, $email, $hashedPassword])) {
        $mailSent = sendRegistrationThanksEmail($email, $username);
        echo json_encode([
            "success" => true,
            "message" => "Lettera di ammissione accettata! Ora puoi fare il login.",
            "mail_sent" => $mailSent
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore durante la creazione del profilo."]);
    }
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        if (isDuplicateEmailError($e)) {
            allowRepeatedEmails($pdo);

            try {
                if ($insertStmt->execute([$username, $email, $hashedPassword])) {
                    $mailSent = sendRegistrationThanksEmail($email, $username);
                    echo json_encode([
                        "success" => true,
                        "message" => "Lettera di ammissione accettata! Ora puoi fare il login.",
                        "mail_sent" => $mailSent
                    ]);
                    exit;
                }
            } catch (PDOException $retryException) {
                echo json_encode(["success" => false, "message" => "La mail puo' essere riusata, ma il database ha ancora un indice unico su email. Rimuovilo dalla tabella users."]);
                exit;
            }
        }

        echo json_encode(["success" => false, "message" => "Il database sta bloccando un valore duplicato diverso dallo username. Controlla gli indici unici della tabella users."]);
        exit;
    }

    echo json_encode(["success" => false, "message" => "Errore durante la creazione del profilo."]);
}
?>
