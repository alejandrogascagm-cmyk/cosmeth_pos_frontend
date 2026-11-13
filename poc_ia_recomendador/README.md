# Prueba de Concepto (PoC) — Analítica Predictiva y Recomendador IA

**Proyecto:** Cosmeth Stylos POS  
**Evidencia:** GA8-220501096-AA2-EV04

## Descripción

Módulo experimental que incorpora técnicas de analítica predictiva de inventario (estimación de días de agotamiento según tasa de rotación) y reglas de asociación para recomendación cruzada en punto de venta.

## Requisitos de Ejecución

- Servidor local XAMPP (Apache + PHP 7.4+ + MySQL 8.0)
- Base de datos `cosmeth_stylos_pos` activa con la tabla `productos` poblada
- Archivo `../php/db.php` configurado en el entorno local (sin exponer credenciales en el repositorio)

## Instrucciones de Prueba

1. Iniciar los servicios Apache y MySQL en XAMPP Control Panel.
2. Abrir en el navegador: `http://localhost/cosmeth_pos_frontend/poc_ia_recomendador/poc_demo.html`.
3. Verificar el cálculo automático de riesgo de agotamiento y probar el selector de recomendación cruzada en caja.
