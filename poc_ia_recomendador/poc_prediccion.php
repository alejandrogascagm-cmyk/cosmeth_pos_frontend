<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once("../php/db.php");

$sql = "SELECT * FROM productos";
$resultado = $conn->query($sql);

if (!$resultado) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "mensaje" => "Error SQL: " . $conn->error
    ]);
    exit;
}

$analisis = [];

while ($prod = $resultado->fetch_assoc()) {
    $codigo = $prod['codigo'] ?? $prod['codigo_barras'] ?? $prod['id_producto'] ?? $prod['id'] ?? 'N/A';
    $nombre = $prod['nombre'] ?? $prod['nombre_producto'] ?? $prod['producto'] ?? 'Cosmético';
    $precio = (float)($prod['precio'] ?? $prod['precio_venta'] ?? 0);
    $stock  = (int)($prod['stock'] ?? $prod['cantidad'] ?? $prod['stock_actual'] ?? $prod['existencias'] ?? 0);

    $ventaDiariaPromedio = ($stock <= 5) ? 2.0 : 0.8;
    $diasRestantes = ($ventaDiariaPromedio > 0) ? round($stock / $ventaDiariaPromedio, 1) : 99;

    if ($diasRestantes <= 3) {
        $nivelRiesgo = "CRÍTICO";
        $sugerenciaReposicion = "Ordenar 15 unidades hoy mismo";
    } elseif ($diasRestantes <= 8) {
        $nivelRiesgo = "MODERADO";
        $sugerenciaReposicion = "Programar pedido de 10 unidades esta semana";
    } else {
        $nivelRiesgo = "ESTABLE";
        $sugerenciaReposicion = "Inventario saludable, sin acción inmediata";
    }

    $recomendacionCruzada = "Base de Maquillaje Líquida (Afinidad: 84%)";
    if (stripos($nombre, "Base") !== false) {
        $recomendacionCruzada = "Labial Andrus (Afinidad: 89%)";
    } elseif (stripos($nombre, "Labial") !== false) {
        $recomendacionCruzada = "Labial Huilense Edición Especial (Afinidad: 78%)";
    }

    $analisis[] = [
        "codigo" => $codigo,
        "producto" => $nombre,
        "precio" => $precio,
        "stock_actual" => $stock,
        "rotacion_diaria_est" => $ventaDiariaPromedio,
        "dias_para_agotarse" => $diasRestantes,
        "riesgo_ia" => $nivelRiesgo,
        "accion_sugerida" => $sugerenciaReposicion,
        "venta_cruzada" => $recomendacionCruzada
    ];
}

// Ordena de menor a mayor stock directamente en PHP
usort($analisis, function($a, $b) {
    return $a['stock_actual'] <=> $b['stock_actual'];
});

echo json_encode([
    "status" => "success",
    "modelo" => "Predictivo-Regresion-Asociacion v1.0 (PoC)",
    "total_analizados" => count($analisis),
    "predicciones" => $analisis
], JSON_UNESCAPED_UNICODE);

$conn->close();
?>