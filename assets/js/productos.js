// ==========================================================================
// MÓDULO FRONTEND CON PERSISTENCIA EN LOCALSTORAGE Y REGLAS DE NEGOCIO
// Proyecto: Cosmeth Stylos POS - Evidencia GA6-220501096-AA4-EV03
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

  // 2. LECTURA INICIAL DE LOCALSTORAGE (READ)
  // Si no existen datos previos en LocalStorage, se cargan 2 registros semilla por defecto
  let productos = JSON.parse(localStorage.getItem("cosmeth_inventory_db")) || [
    {
      id: 1,
      codigo: "PROD001",
      nombre: "Lápiz Labial Mate Rosa",
      precio: 25000,
      stock: 12,
    },
    {
      id: 2,
      codigo: "PROD002",
      nombre: "Base de Maquillaje Líquida",
      precio: 45000,
      stock: 3,
    }, // Stock bajo para regla de negocio
  ];

  // Renderizar la tabla con la información persistida
  renderizarTabla();

  // ==========================================================================
  // OPERACIÓN 1: READ (LECTURA Y ACTUALIZACIÓN DINÁMICA DEL DOM)
  // ==========================================================================
  function renderizarTabla() {
    tablaProductos.innerHTML = "";

    if (productos.length === 0) {
      tablaProductos.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                        <i class="fa-solid fa-folder-open mb-2 d-block fs-3"></i>
                        No hay productos registrados en LocalStorage.
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
      if (esStockBajo) fila.classList.add("table-warning"); // Destaca la fila visualmente

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

    // PERSISTENCIA: Guardar en LocalStorage
    localStorage.setItem("cosmeth_inventory_db", JSON.stringify(productos));
  }

  // ==========================================================================
  // OPERACIONES 2 & 3: CREATE (CREAR) Y UPDATE (ACTUALIZAR)
  // ==========================================================================
  productoForm.addEventListener("submit", (e) => {
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

    const idEditando = productoIdInput.value;

    if (idEditando) {
      // --- OPERACIÓN UPDATE ---
      productos = productos.map((p) => {
        if (p.id == idEditando) {
          return { id: Number(idEditando), codigo, nombre, precio, stock };
        }
        return p;
      });
      alert("¡Producto actualizado correctamente en LocalStorage!");
    } else {
      // --- OPERACIÓN CREATE ---
      const nuevoProducto = {
        id: Date.now(), // ID único
        codigo,
        nombre,
        precio,
        stock,
      };
      productos.push(nuevoProducto);
      alert("¡Producto guardado exitosamente en LocalStorage!");
    }

    resetearFormulario();
    renderizarTabla();
  });

  // ==========================================================================
  // PREPARAR EDICIÓN (Cargar objeto al formulario)
  // ==========================================================================
  window.prepararEdicion = (id) => {
    const prod = productos.find((p) => p.id === id);
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

  // ==========================================================================
  // OPERACIÓN 4: DELETE (ELIMINAR DE LOCALSTORAGE)
  // ==========================================================================
  window.eliminarProducto = (id) => {
    if (
      confirm("¿Confirma que desea eliminar este registro de LocalStorage?")
    ) {
      productos = productos.filter((p) => p.id !== id);
      renderizarTabla();
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
