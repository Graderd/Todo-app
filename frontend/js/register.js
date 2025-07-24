document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:2808/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, email, password})
    });

    const data = await response.json();

    if(!response.ok){
        document.getElementById("error-message").textContent = data.message || "Error en el registro";
        return;
    }

    alert("Registro exitoso. Redirigiendo al login...");
    window.location.href = "login.html";
});