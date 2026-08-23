function TablaProductos() {
  const [productos, setProductos] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    fetch("php/obtener_productos.php")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al conectar con la API:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return React.createElement(
      "div",
      { className: "text-center py-4 text-secondary" },
      "Cargando catálogo desde MySQL..."
    );
  }

  const filas = productos.map((prod) =>
    React.createElement(
      "tr",
      { key: prod.id },
      React.createElement("td", { className: "fw-bold" }, prod.codigo),
      React.createElement("td", null, prod.nombre),
      React.createElement(
        "td",
        null,
        "$" + Number(prod.precio).toLocaleString("es-CO")
      ),
      React.createElement("td", null, prod.stock + " un."),
      React.createElement(
        "td",
        { className: "text-center" },
        React.createElement(
          "button",
          { className: "btn btn-sm btn-outline-primary me-1" },
          React.createElement("i", { className: "fa-solid fa-pen" })
        ),
        React.createElement(
          "button",
          { className: "btn btn-sm btn-outline-danger" },
          React.createElement("i", { className: "fa-solid fa-trash" })
        )
      )
    )
  );

  return React.createElement(
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
  );
}
