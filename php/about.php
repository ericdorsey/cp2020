<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../css/cp2020.css">

</head>
<body>

<?php
$to = "dorseye@gmail.com";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$subject = "Cyberpunk 2020 Generator: " . $_POST["selection"];
$sendSubject = filter_var($subject, FILTER_SANITIZE_SPECIAL_CHARS);

$prependtext = "Feedback from <a href=\"https://www.ericdorsey.info/cp2020/index.html\">https://www.ericdorsey.info/cp2020/index.html</a><br><br>";

$message = $_POST["comments"];

$sendMessage = filter_var($message, FILTER_SANITIZE_SPECIAL_CHARS);
$sendMessage = trim($sendMessage);
#echo 'Message is: '.$sendMessage;

# Don't email an empty comment field 
if (empty($sendMessage)) {
    echo '<p class="informational">Comments field cannot be blank. Nothing submitted!</p>';
    echo '<p class="informational"><a href="../index.html" id="link">Click here to go back to the Cyberpunk 2020 Character Generator</a>.';
    exit();
}

$sendMessage = $prependtext . $sendMessage;
$email = $_POST["email"];
$sendEmail = filter_var($email, FILTER_VALIDATE_EMAIL);

# Add the email to the message body if included
if (!empty($sendEmail)) {
    $sendMessage = "Reply to: $sendEmail<br><br>" . $sendMessage;
}

try {
    mail($to, $sendSubject, $sendMessage, $headers);
    echo '<p class="informational">Thank you for your feedback!</p>';
    echo '<p class="informational"><a href="../index.html" id="link">Click here to go back to the Cyberpunk 2020 Character Generator</a>.';
    exit();
} catch (Exception $e) {
    echo "Error: " . $e;
}

?>

</body>
</html>
