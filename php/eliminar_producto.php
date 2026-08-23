<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id_producto'] ?? 0;

if ($id > 0) {
    $sql = "DELETE FROM productos WHERE id_producto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "mensaje" => "Producto eliminado exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Error al eliminar en MySQL"]);
    }
} else {
    echo json_encode(["status" => "error", "mensaje" => "ID no válido"]);
}
$conn->close();
?>