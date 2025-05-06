<?php
session_start();

// Database connection
$host = "localhost";
$user = "root"; // default for XAMPP
$pass = "";     // default is empty
$db = "moodmate_db";


$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch submitted credentials
$username = $_POST['username'];
$password = $_POST['password'];

// Find user in database
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Validate user
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: home.html"); // Redirect on success
        exit();
    } else {
        echo "<script>alert('Incorrect password.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('User not found.'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>
