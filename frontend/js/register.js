document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        form.reset();
        return;
    }

    try{
        const res = await fetch("http://localhost:2808/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password})
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || "Error al registrarse");
        }

        alert("✅ Registro exitoso. Inicia sesión ahora.");
        window.location.href = "login.html";
    }catch (error){
        document.getElementById("error-message").textContent = error.message;
    }
});