// ==========================================================================
// MÓDULO FRONTEND CON PERSISTENCIA EN BASE DE DATOS MYSQL (PHP)
// Proyecto: Cosmeth Stylos POS - GA7-220501096-AA2-EV01
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. CAPTURA DE ELEMENTOS DEL DOM
  const productoForm = document.getElementById("productoForm");
  const productoIdInput = document.getElementById("productoId");
  const codigoInput = document.getElementById("codigo");
  const nombreInput = document.getElementById("nombre");
  const precioInput = document.getElementById("precio");
  const stockInput = document.getElementById("stock");

  const tablaProductos = document.getElementById("tablaProductos");
  const totalRegistros = document.getElementById("totalRegistros");
  const formTitle = document.getElementById("formTitle");
  const btnGuardar = document.getElementById("btnGuardar");
  const btnCancelar = document.getElementById("btnCancelar");

  let productos = [];

  // Cargar datos reales desde MySQL al iniciar la página
  cargarProductosBackend();

  // ==========================================================================
  // OPERACIÓN 1: LECTURA Y RENDERIZADO DESDE MYSQL
  // ==========================================================================
  async function cargarProductosBackend() {
    try {
      const respuesta = await fetch("php/obtener_productos.php");
      productos = await respuesta.json();
      renderizarTabla();
    } catch (error) {
      console.error("Error cargando productos desde MySQL:", error);
    }
  }

  function renderizarTabla() {
    tablaProductos.innerHTML = "";

    if (!productos || productos.length === 0) {
      tablaProductos.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted py-4">
            <i class="fa-solid fa-folder-open mb-2 d-block fs-3"></i>
            No hay productos registrados en la base de datos MySQL.
          </td>
        </tr>`;
      totalRegistros.textContent = "0 Productos";
      return;
    }

    productos.forEach((prod) => {
      // REGLA DE NEGOCIO: Evaluación de Stock Bajo (< 5 unidades)
      const esStockBajo = prod.stock < 5;
      const badgeStock = esStockBajo
        ? `<span class="badge bg-warning text-dark"><i class="fa-solid fa-triangle-exclamation me-1"></i>${prod.stock} un. (Bajo)</span>`
        : `<span class="badge bg-success">${prod.stock} un.</span>`;

      const fila = document.createElement("tr");
      if (esStockBajo) fila.classList.add("table-warning");

      fila.innerHTML = `
        <td><span class="badge bg-light text-dark border">${
          prod.codigo
        }</span></td>
        <td class="fw-bold">${prod.nombre}</td>
        <td>$${Number(prod.precio).toLocaleString("es-CO")}</td>
        <td>${badgeStock}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="prepararEdicion(${
            prod.id
          })" title="Editar">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${
            prod.id
          })" title="Eliminar">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      tablaProductos.appendChild(fila);
    });

    totalRegistros.textContent = `${productos.length} Productos`;
  }

  // ==========================================================================
  // OPERACIÓN 2: GUARDAR EN BASE DE DATOS MYSQL (POST)
  // ==========================================================================
  productoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const codigo = codigoInput.value.trim();
    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value);
    const stock = parseInt(stockInput.value);

    // VALIDACIONES Y REGLAS DE NEGOCIO
    if (!codigo || !nombre || isNaN(precio) || isNaN(stock)) {
      alert("Error: Todos los campos son obligatorios.");
      return;
    }

    if (precio <= 0 || stock < 0) {
      alert(
        "Regla de Negocio: El precio debe ser mayor a $0 y el stock no puede ser negativo."
      );
      return;
    }

    const nuevoProducto = { codigo, nombre, precio, stock };

    try {
      const respuesta = await fetch("php/guardar_producto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      const resultado = await respuesta.json();

      if (resultado.status === "success") {
        alert("¡Producto registrado en MySQL exitosamente!");
        resetearFormulario();
        cargarProductosBackend(); // Actualiza la tabla inmediatamente
      } else {
        alert("Error al guardar: " + resultado.message);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error de conexión con el servidor PHP.");
    }
  });

  // ==========================================================================
  // PREPARAR EDICIÓN Y LIMPIEZA
  // ==========================================================================
  window.prepararEdicion = (id) => {
    const prod = productos.find((p) => p.id == id);
    if (prod) {
      productoIdInput.value = prod.id;
      codigoInput.value = prod.codigo;
      nombreInput.value = prod.nombre;
      precioInput.value = prod.precio;
      stockInput.value = prod.stock;

      formTitle.textContent = "Editar Producto";
      btnGuardar.innerHTML =
        '<i class="fa-solid fa-arrows-rotate me-1"></i> Actualizar Producto';
      btnCancelar.classList.remove("d-none");
    }
  };

  btnCancelar.addEventListener("click", resetearFormulario);

  function resetearFormulario() {
    productoForm.reset();
    productoIdInput.value = "";
    formTitle.textContent = "Agregar Producto";
    btnGuardar.innerHTML =
      '<i class="fa-solid fa-floppy-disk me-1"></i> Guardar Producto';
    btnCancelar.classList.add("d-none");
  }
});
