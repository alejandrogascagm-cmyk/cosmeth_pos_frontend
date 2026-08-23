<?php
// [VALIDADO CON TU BD / ESTRUCTURA LOCAL]
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['codigo']) && !empty($data['nombre']) && !empty($data['precio'])) {
    
    $codigo = $conn->real_escape_string($data['codigo']);
    $nombre = $conn->real_escape_string($data['nombre']);
    $precio = floatval($data['precio']);
    $stock = isset($data['stock']) ? intval($data['stock']) : 0;
    
    // Asignamos la categoría 1 por defecto para cumplir con la Foreign Key de MySQL
    $id_categoria = 1;

    // Inserción incluyendo la columna id_categoria requerida por la BD
    $sql = "INSERT INTO productos (codigo_barras, nombre, precio_venta, stock_actual, id_categoria) 
            VALUES ('$codigo', '$nombre', $precio, $stock, $id_categoria)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Producto guardado correctamente en la base de datos."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al guardar: " . $conn->error]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Campos obligatorios incompletos."]);
}

$conn->close();
?>