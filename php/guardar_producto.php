<?php
// [VALIDADO CON TU BD / ESTRUCTURA LOCAL]
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['codigo']) && !empty($data['nombre']) && isset($data['precio'])) {
    
    $codigo = $conn->real_escape_string($data['codigo']);
    $nombre = $conn->real_escape_string($data['nombre']);
    $precio = floatval($data['precio']);
    $stock = isset($data['stock']) ? intval($data['stock']) : 0;
    $id_producto = isset($data['id_producto']) ? intval($data['id_producto']) : 0;
    $id_categoria = 1;

    // Si viene el ID del producto, actualizamos
    if ($id_producto > 0) {
        $sql = "UPDATE productos 
                SET codigo_barras = '$codigo', nombre = '$nombre', precio_venta = $precio, stock_actual = $stock 
                WHERE id_producto = $id_producto";
    } else {
        // Si no viene ID pero el código ya existe en MySQL, también actualizamos
        $check = $conn->query("SELECT id_producto FROM productos WHERE codigo_barras = '$codigo'");
        
        if ($check && $check->num_rows > 0) {
            $sql = "UPDATE productos 
                    SET nombre = '$nombre', precio_venta = $precio, stock_actual = $stock 
                    WHERE codigo_barras = '$codigo'";
        } else {
            // Si es un código nuevo, insertamos
            $sql = "INSERT INTO productos (codigo_barras, nombre, precio_venta, stock_actual, id_categoria) 
                    VALUES ('$codigo', '$nombre', $precio, $stock, $id_categoria)";
        }
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Producto guardado o actualizado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al guardar: " . $conn->error]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Campos obligatorios incompletos."]);
}

$conn->close();
?>