// ==========================================================================
// EVENTO DOMContentLoaded
// Garantiza que el script se ejecute únicamente cuando todo el HTML esté cargado
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // SECCIÓN 1: CAPTURA DE ELEMENTOS DEL DOM
  // Obtenemos las referencias de los componentes HTML mediante sus IDs
  const loginForm = document.getElementById("loginForm");
  const usuarioInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");
  const errorAlert = document.getElementById("errorAlert");
  const errorMessage = document.getElementById("errorMessage");

  // SECCIÓN 2: ESCUCHADOR DE EVENTOS (EVENT LISTENER)
  // Interceptamos la acción de presionar el botón de enviar o dar Enter en el formulario
  loginForm.addEventListener("submit", (event) => {
    // REGLA CLAVE: Detiene la recarga por defecto de la página web
    event.preventDefault();

    // Obtenemos los valores ingresados eliminando espacios en blanco al inicio y final (.trim())
    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    // SECCIÓN 3: LOGICA DE VALIDACIÓN Y CONTROL DE ERRORES
    // Validación 1: Verificar que ningún campo esté vacío
    if (usuario === "" || password === "") {
      mostrarError("Error: Todos los campos son obligatorios.");
    }
    // Validación 2: Verificar que las credenciales sean correctas (Prueba simulada)
    else if (usuario !== "admin" || password !== "123456") {
      mostrarError("Error: Usuario o contraseña incorrectos.");
    }
    // Caso de Éxito: Credenciales válidas
    else {
      ocultarError();
      alert("¡Autenticación Exitosa! Bienvenido a Cosmeth Stylos POS.");
      // En la fase posterior, aquí se enviará la petición mediante Fetch/AJAX al controlador PHP
    }
  });

  // SECCIÓN 4: FUNCIONES MODULARES REUTILIZABLES

  /**
   * Muestra la caja de alerta e inyecta el mensaje de error personalizado
   * @param {string} mensaje - Texto descriptivo del error a mostrar
   */
  function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorAlert.style.display = "block"; // Hace visible el contenedor de alerta
  }

  /**
   * Oculta la caja de alerta
   */
  function ocultarError() {
    errorAlert.style.display = "none"; // Oculta el contenedor de alerta
  }
});
