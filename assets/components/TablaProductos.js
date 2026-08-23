function ModuloProductosPOS() {
  const [productos, setProductos] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  const [idProducto, setIdProducto] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [stock, setStock] = React.useState("");

  const cargarProductos = () => {
    fetch("php/obtener_productos.php")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al consultar MySQL:", err);
        setCargando(false);
      });
  };

  React.useEffect(() => {
    cargarProductos();
  }, []);

  const limpiarFormulario = () => {
    setIdProducto("");
    setCodigo("");
    setNombre("");
    setPrecio("");
    setStock("");
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    if (!codigo || !nombre || !precio || stock === "") {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Enviamos id_producto obligatoriamente si estamos editando
    const datos = {
      id_producto: idProducto ? parseInt(idProducto) : 0,
      codigo: codigo,
      nombre: nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };

    fetch("php/guardar_producto.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          alert("¡Operación realizada con éxito en MySQL!");
          limpiarFormulario();
          cargarProductos();
        } else {
          alert("Error de base de datos: " + res.message);
        }
      })
      .catch((err) => alert("Error al procesar la solicitud."));
  };

  const prepararEdicion = (prod) => {
    setIdProducto(prod.id); // Captura el ID real de MySQL (1, 2, 3, etc.)
    setCodigo(prod.codigo);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setStock(prod.stock);
  };

  const eliminarProducto = (id) => {
    if (confirm("¿Está seguro de eliminar este producto del inventario?")) {
      fetch("php/eliminar_producto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto: id }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("Producto eliminado de MySQL.");
          cargarProductos();
        })
        .catch((err) => alert("Error al eliminar."));
    }
  };

  if (cargando) {
    return React.createElement(
      "div",
      { className: "text-center py-4 text-secondary" },
      "Cargando datos desde MySQL..."
    );
  }

  const filas = productos.map((prod) => {
    // Regla de Negocio: Stock Bajo en amarillo si es <= 5 unidades
    const esStockBajo = prod.stock <= 5;
    const badgeStock = esStockBajo
      ? React.createElement(
          "span",
          { className: "badge bg-warning text-dark" },
          React.createElement("i", {
            className: "fa-solid fa-triangle-exclamation me-1",
          }),
          prod.stock + " un. (Bajo)"
        )
      : React.createElement(
          "span",
          { className: "badge bg-success" },
          prod.stock + " un."
        );

    return React.createElement(
      "tr",
      { key: prod.id, className: esStockBajo ? "table-warning" : "" },
      React.createElement(
        "td",
        null,
        React.createElement(
          "span",
          { className: "badge bg-light text-dark border" },
          prod.codigo
        )
      ),
      React.createElement("td", { className: "fw-bold" }, prod.nombre),
      React.createElement(
        "td",
        null,
        "$" + Number(prod.precio).toLocaleString("es-CO")
      ),
      React.createElement("td", null, badgeStock),
      React.createElement(
        "td",
        { className: "text-center" },
        React.createElement(
          "button",
          {
            className: "btn btn-sm btn-outline-primary me-1",
            onClick: () => prepararEdicion(prod),
            title: "Editar",
          },
          React.createElement("i", { className: "fa-solid fa-pen" })
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-sm btn-outline-danger",
            onClick: () => eliminarProducto(prod.id),
            title: "Eliminar",
          },
          React.createElement("i", { className: "fa-solid fa-trash" })
        )
      )
    );
  });

  return React.createElement(
    "div",
    { className: "row g-4" },
    React.createElement(
      "div",
      { className: "col-md-4" },
      React.createElement(
        "div",
        { className: "card shadow-sm border-0 rounded-3" },
        React.createElement(
          "div",
          { className: "card-header bg-white fw-bold" },
          React.createElement("i", {
            className: "fa-solid fa-pen-to-square me-1 text-danger",
          }),
          idProducto ? "Editar Producto" : "Agregar Producto"
        ),
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "form",
            { onSubmit: guardarProducto },
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement(
                "label",
                { className: "form-label small fw-bold" },
                "Código de Barras"
              ),
              React.createElement("input", {
                type: "text",
                className: "form-control",
                placeholder: "Ej: PROD001",
                value: codigo,
                onChange: (e) => setCodigo(e.target.value),
                required: true,
              })
            ),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement(
                "label",
                { className: "form-label small fw-bold" },
                "Nombre del Producto"
              ),
              React.createElement("input", {
                type: "text",
                className: "form-control",
                placeholder: "Ej: Labial Mate Rosa",
                value: nombre,
                onChange: (e) => setNombre(e.target.value),
                required: true,
              })
            ),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement(
                "label",
                { className: "form-label small fw-bold" },
                "Precio de Venta ($)"
              ),
              React.createElement("input", {
                type: "number",
                className: "form-control",
                placeholder: "25000",
                value: precio,
                onChange: (e) => setPrecio(e.target.value),
                required: true,
              })
            ),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement(
                "label",
                { className: "form-label small fw-bold" },
                "Stock Inicial"
              ),
              React.createElement("input", {
                type: "number",
                className: "form-control",
                placeholder: "10",
                value: stock,
                onChange: (e) => setStock(e.target.value),
                required: true,
              })
            ),
            React.createElement(
              "button",
              { type: "submit", className: "btn btn-rosa w-100" },
              React.createElement("i", {
                className: "fa-solid fa-floppy-disk me-1",
              }),
              idProducto ? " Actualizar Producto" : " Guardar Producto"
            ),
            idProducto &&
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-secondary w-100 mt-2",
                  onClick: limpiarFormulario,
                },
                "Cancelar Edición"
              )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "col-md-8" },
      React.createElement(
        "div",
        { className: "card shadow-sm border-0 rounded-3" },
        React.createElement(
          "div",
          {
            className:
              "card-header bg-white d-flex justify-content-between align-items-center",
          },
          React.createElement(
            "span",
            { className: "fw-bold" },
            React.createElement("i", {
              className: "fa-solid fa-list me-1 text-muted",
            }),
            "Catálogo de Inventario (Componente React JS)"
          ),
          React.createElement(
            "small",
            { className: "text-muted" },
            productos.length + " Productos"
          )
        ),
        React.createElement(
          "div",
          { className: "card-body p-0" },
          React.createElement(
            "div",
            { className: "table-responsive" },
            React.createElement(
              "table",
              { className: "table table-hover align-middle mb-0" },
              React.createElement(
                "thead",
                { className: "table-dark" },
                React.createElement(
                  "tr",
                  null,
                  React.createElement("th", null, "Código"),
                  React.createElement("th", null, "Producto"),
                  React.createElement("th", null, "Precio"),
                  React.createElement("th", null, "Stock"),
                  React.createElement(
                    "th",
                    { className: "text-center" },
                    "Acciones"
                  )
                )
              ),
              React.createElement("tbody", null, filas)
            )
          )
        )
      )
    )
  );
}
