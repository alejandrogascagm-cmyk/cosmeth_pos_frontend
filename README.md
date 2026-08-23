# Cosmeth Stylos POS - Sistema de Inventarios y Ventas 💄💈

## Descripción del Proyecto

Cosmeth Stylos POS es una solución web orientada a la automatización comercial, control de inventario y gestión de productos para el sector estético, barbería y peluquería.

---

## Evolución del Desarrollo

### Fase 1: Frontend y Persistencia Local (LocalStorage)

- Implementación de la interfaz de usuario con HTML5 y CSS3.
- Lógica de gestión en JavaScript aplicando reglas de negocio (alerta de stock bajo < 5 unidades).
- Almacenamiento inicial en `localStorage`.

### Fase 2: Backend, Servicios API y Persistencia Relacional (MySQL)

- Integración de arquitectura backend modular en **PHP**.
- Conexión orientada a objetos (`mysqli`) hacia la base de datos `cosmeth_stylos_pos`.
- Desarrollo de endpoints JSON para consumo asíncrono con Fetch API (`Async/Await`).
- Garantía de integridad referencial con llaves foráneas (`id_categoria`).

---

## Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6 (Fetch API).
- **Backend:** PHP 8.x (APIs RESTful / JSON).
- **Base de Datos:** MySQL / MariaDB (XAMPP).
- **Control de Versiones:** Git & GitHub.

---

## Estructura de Directorios

- `/assets/css`: Hojas de estilo del sistema (`styles.css`).
- `/assets/js`: Módulos de lógica de usuario (`login.js`, `productos.js`).
- `/php`: APIs y controladores del backend:
  - `db.php`: Conexión centralizada a la base de datos MySQL.
  - `obtener_productos.php`: Servicio de lectura del catálogo.
  - `guardar_producto.php`: Servicio de registro de productos en MySQL.
- `index.html`: Módulo de autenticación de usuario.
- `productos.html`: Interfaz de administración de inventarios.

---

## Instrucciones de Instalación y Ejecución Local

1. Clonar el repositorio dentro del servidor local:
   `git clone https://github.com/alejandrogascagm-cmyk/cosmeth_pos_frontend.git`
2. Ubicar el proyecto en la ruta `C:/xampp/htdocs/cosmeth_pos_frontend`.
3. Iniciar los servicios de **Apache** y **MySQL** desde el Panel de Control de XAMPP.
4. Importar la base de datos `cosmeth_stylos_pos` en phpMyAdmin.
5. Abrir la aplicación en el navegador desde la URL:
   `http://localhost/cosmeth_pos_frontend/productos.html`
