document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:2808/api/auth/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, password})
    });

    const data = await response.json();

    if(!response.ok) {
        document.getElementById("error-message").textContent = data.message || "Credenciales invalidad";
        return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
})