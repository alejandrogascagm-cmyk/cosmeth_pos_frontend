<?php
// [VALIDADO CON TU BD / ESTRUCTURA LOCAL]
// Columnas exactas de phpMyAdmin: id_producto, codigo_barras, nombre, precio_venta, stock_actual

header("Content-Type: application/json; charset=UTF-8");
require_once "db.php";

// Mapeamos los nombres de la BD para que coincidan con la vista
$sql = "SELECT id_producto AS id, codigo_barras AS codigo, nombre, precio_venta AS precio, stock_actual AS stock FROM productos";
$result = $conn->query($sql);

$productos = array();

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['precio'] = floatval($row['precio']);
        $row['stock'] = intval($row['stock']);
        $productos[] = $row;
    }
}

echo json_encode($productos, JSON_UNESCAPED_UNICODE);
$conn->close();
?>