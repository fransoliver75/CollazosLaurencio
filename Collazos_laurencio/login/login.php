<?php
// Datos de conexión
$servername = "localhost";
$username_db = "root";  // Cambia si tienes otro usuario
$password_db = "";      // Cambia si tienes contraseña
$dbname = "sistema_login"; // Cambia por el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$user = $_POST['username'];
$pass = $_POST['password'];

// Consulta segura con prepared statements para evitar SQL Injection
$stmt = $conn->prepare("SELECT password FROM usuarios WHERE username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    // Verificar contraseña (asumiendo que está hasheada con password_hash)
    if (password_verify($pass, $hashed_password)) {
        echo "Login exitoso. ¡Bienvenido, " . htmlspecialchars($user) . "!";
        // Aquí puedes iniciar sesión, redirigir, etc.
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}

$stmt->close();
$conn->close();
?>
