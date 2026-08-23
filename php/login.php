<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$usuario = isset($data['usuario']) ? trim($data['usuario']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if (!empty($usuario) && !empty($password)) {
    
    // Validamos credenciales estrictas de administrador
    if ($usuario === "admin" && $password === "123456") {
        echo json_encode([
            "status" => "success", 
            "mensaje" => "Autenticación exitosa", 
            "usuario" => ["nombre_usuario" => "admin"]
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "mensaje" => "Usuario o contraseña incorrectos."
        ]);
    }

} else {
    echo json_encode([
        "status" => "error", 
        "mensaje" => "Todos los campos son obligatorios."
    ]);
}

$conn->close();
?>