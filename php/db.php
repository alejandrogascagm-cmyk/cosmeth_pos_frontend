<?php
// 1 Datos para acceder a la base de datos de XAMPP
$host = "localhost";          // Servidor local donde corre XAMPP
$user = "root";               // Usuario por defecto de MySQL en XAMPP
$password = "";               // XAMPP viene sin contraseña por defecto
$database = "cosmeth_stylos_pos"; // Nombre exacto de tu base de datos creada en phpMyAdmin

// 2. Se crea la conexión a la base de datos aplicando la clase nativa 'mysqli' (Programación Orientada a Objetos)
$conn = new mysqli($host, $user, $password, $database);

// 3. Se verifica si hubo un error al intentar conectar
if ($conn->connect_error) {
    // Si hay un fallo, se detiene la ejecución y se muestra el mensaje de error
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// 4. Se asegura de que los datos recibidos respeten tildes y caracteres especiales en español
$conn->set_charset("utf8mb4");

// Mensaje de confirmación temporal (sirve para probar la conexión en el navegador)
// echo "Conexión exitosa a cosmeth_stylos_pos";
?>