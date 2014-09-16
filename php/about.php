<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../css/cp2020.css">

</head>
<body>

<?php
$to = "dorseye@gmail.com";

$subject = "Cyberpunk 2020 Generator: " . $_POST["selection"];
//$sendSubject = filter_var($subject, FILTER_SANITIZE_SPECIAL_CHARS);

$message = $_POST["comments"];
$sendMessage = filter_var($message, FILTER_SANITIZE_SPECIAL_CHARS);

$email = $_POST["email"];
$sendEmail = filter_var($email, FILTER_VALIDATE_EMAIL);

//echo $to . " " . $subject . " " . $message . " " $email;
//echo $sendMessage . " " . $sendEmail;


try {
    if (mail($to, $subject, $message)) {
        echo '<p class="informational">Thank you for your feedback!</p>';
        echo '<p class="informational"><a href="../index.html" id="link">Click here to go back to the Cyberpunk 2020 Character Generator</a>.
    </p>';
    }
} catch (Exception $e) {
    echo "Error: " . $e;
}

?>

</body>
</html>