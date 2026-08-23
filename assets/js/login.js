document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usuarioInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");
  const errorAlert = document.getElementById("errorAlert");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    if (usuario === "" || password === "") {
      mostrarError("Error: Todos los campos son obligatorios.");
      return;
    }

    try {
      const respuesta = await fetch("php/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const resultado = await respuesta.json();

      if (resultado.status === "success") {
        ocultarError();
        alert("¡Autenticación Exitosa! Bienvenido a Cosmeth Stylos POS.");
        window.location.href = "productos.html";
      } else {
        // Inyecta el mensaje de error en la caja roja del HTML
        mostrarError("Error: " + resultado.mensaje);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      mostrarError(
        "Error: No se pudo conectar con el servidor de autenticación."
      );
    }
  });

  function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorAlert.style.display = "block";
  }

  function ocultarError() {
    errorAlert.style.display = "none";
  }
});
