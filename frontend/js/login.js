document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try{
        const response = await fetch("http://localhost:2808/api/auth/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || "Error al iniciar sesion");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.name);

        window.location.href = "index.html";
    }catch (error) {
        document.getElementById("error-message").textContent = error.message;
    }
});