<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../contact.html");
    exit;
}


/* =========================
   GET FORM DATA
========================= */

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");


/* =========================
   VALIDATION
========================= */

if ($name === "" || $email === "" || $message === "") {
    die("Please fill in all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}


/* =========================
   COMPANY EMAIL
========================= */

$company_email = "toxiclaptop172@gmail.com";


/* =========================
   EMAIL SUBJECT
========================= */

$subject = "New Contact Request - KJ Dispatch Services";


/* =========================
   EMAIL CONTENT
========================= */

$email_body = "

New Contact Request
==============================

Name:
$name

Email:
$email

Phone Number:
$phone

Message:
$message

==============================
KJ Dispatch Services
";


/* =========================
   EMAIL HEADERS
========================= */

$headers = "From: KJ Dispatch Website <toxiclaptop172@gmail.com>\r\n";

$headers .= "Reply-To: " . $email . "\r\n";

$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


/* =========================
   SEND EMAIL
========================= */

if (mail($company_email, $subject, $email_body, $headers)) {

    echo "
    <!DOCTYPE html>
    <html>
    <head>
        <title>Message Sent</title>

        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
            }

            .success-box {
                background: white;
                padding: 50px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }

            h1 {
                color: #d97800;
            }

            p {
                color: #555;
            }

            a {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 25px;
                background: #29272e;
                color: white;
                text-decoration: none;
                border-radius: 7px;
            }

            a:hover {
                background: #d97800;
                color: black;
            }
        </style>
    </head>

    <body>

        <div class="success-box">

            <h1>Message Sent!</h1>

            <p>
                Thank you for contacting KJ Dispatch Services.
                We will get back to you soon.
            </p>

            <a href="../contact.html">
                Back to Contact
            </a>

        </div>

    </body>
    </html>
    ";

} else {

    echo "
    <h1>Unable to send message</h1>

    <p>
        There was a problem sending your message.
        Please try again later.
    </p>

    ";

}

?>