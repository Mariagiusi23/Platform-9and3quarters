<?php
header('Content-Type: application/json');

//PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Colleghiamo i file della libreria
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

require 'db.php';

// Lettura di nome da mago ed email inseriti nella pagina recupero.html
$data = json_decode(file_get_contents("php://input"));
$username = trim($data->username ?? '');
$email = trim($data->email ?? '');

if ($username === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Fornisci nome da mago ed email validi per il gufo."]);
    exit;
}

//  Cerchiamo il profilo esatto: la stessa email puo' appartenere a piu' maghi
$stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE username = ? AND LOWER(TRIM(email)) = LOWER(?) LIMIT 1");
$stmt->execute([$username, $email]);
$user = $stmt->fetch();

if ($user) {
    // Generiamo il token di recupero
    $token = bin2hex(random_bytes(32)); 
    $expires = date("Y-m-d H:i:s", strtotime('+1 hour'));

    // Salviamo il token solo sul profilo selezionato, non su tutti quelli con la stessa email
    $updateStmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?");
    $updateStmt->execute([$token, $expires, $user['id']]);

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $hostName = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $basePath = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/Platform934/php/forgot_password.php')), '/\\');
    $resetLink = $scheme . '://' . $hostName . $basePath . '/reset.html?token=' . urlencode($token);
    $safeUsername = htmlspecialchars($user['username'], ENT_QUOTES, 'UTF-8');

    // PRreparazione invio email
    $mail = new PHPMailer(true);

    try {
        // Impostazioni del Server SMTP di Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        

        // Mail che manda le mail
        $mail->Username   = 'aurorawattpad1981@gmail.com'; 
        
        //  LA PASSWORD PER LE APP DI GOOGLE DI 16 CARATTERI 
        $mail->Password   = 'ezbzlbmpdlmkmyks'; 
        
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('aurorawattpad1981@gmail.com', 'Platform 9 3/4');
        
        // =========================================================================

        // Destinatario: l'email verificata sul profilo trovato
        $mail->addAddress($user['email'], $user['username']);

        // Contenuto della mail
        $mail->isHTML(true);
        $mail->Subject = "Il tuo Gufo di Recupero - Platform 9 3/4";
        $mail->Body    = "
            <div style='background-color:#180f2e; padding:30px; color:white; font-family:serif; text-align:center; border: 2px solid gold; border-radius: 10px;'>
                <h1 style='color:gold; font-size: 24px;'>Platform 9 ¾</h1>
                <p style='font-size: 16px;'>Caro/a " . $safeUsername . ",</p>
                <p style='font-size: 16px;'>Abbiamo ricevuto una richiesta per ripristinare la tua parola d'ordine.</p>
                <p style='font-size: 16px; margin-bottom: 30px;'>Clicca sul bottone magico qui sotto per sbloccare il tuo baule:</p>
                
                <a href='$resetLink' style='background-color:gold; color:black; padding:12px 25px; text-decoration:none; font-weight:bold; font-size: 16px; border-radius:5px; display: inline-block;'>Resetta Parola d'Ordine</a>
                
                <p style='font-size:12px; color:#aaa; margin-top: 40px;'>Se non hai richiesto tu questo gufo, ignora pure la lettera e la tua cassaforte alla Gringott rimarrà al sicuro.</p>
            </div>
        ";

        // Spedisci l'email
        $mail->send();
        
        // Messaggio di successo che appare sulla pagina recupero.html
        echo json_encode([
            "success" => true, 
            "message" => "Un gufo è partito verso la tua casella di posta!"
        ]);

    } catch (Exception $e) {
        // Se c'è un errore nella spedizione
        echo json_encode([
            "success" => false, 
            "message" => "Il gufo si è perso a causa di un'interferenza babbana."
        ]);
    }

} else {
    // Se l'utente non è nel DB
    echo json_encode([
        "success" => false, 
        "message" => "Nessun mago trovato con questa combinazione di nome ed email."
    ]);
}
?>
