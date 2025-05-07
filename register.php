<?php
$host = "localhost";
$db = "moodmate_db";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // secure

$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    echo "<script>alert('Registration successful! Please log in.'); window.location.href = 'login.html';</script>";
} else {
    echo "<script>alert('Error: Username or email may already exist.'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>
