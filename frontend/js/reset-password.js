const form = document.getElementById("resetForm");
const mensaje = document.getElementById("mensaje");

//Obtener el token de la URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if(!token) {
    mensaje.textContent = "Token incalido o expirado";
    form.style.display = "none";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("newPassword").value;

    try {
        const response = await fetch("http://localhost:2808/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            mensaje.style.color = "green";
            mensaje.textContent = "Contraseña restablecida con éxito. Puedes iniciar sesión ahora.";
            form.reset();
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = data.error || "Error al restablecer la contraseña.";
        }
    } catch (error) {
        mensaje.style.colot = "red";
        mensaje.textContent = "Error al conectar con el servidor.";
    }
});