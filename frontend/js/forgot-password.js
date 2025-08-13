document.getElementById("forgotForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").ariaValueMax.trim();
    const mensaje = document.getElementById("mensaje");

    try {
        const res = await fetch("http://localhost:2808/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if(!response.ok) {
        throw new Error(data.error || "Error al enviar el enlace de recuperación.");
    }

    mensaje.style.color = "green";
    mensaje.textContent = data.message || "Revisa tu correo para restablecer tu contraseña";
    } catch (error) {
        mensaje.style.color = "red";
        mensaje.textContent = error.mensaje;
    }
});