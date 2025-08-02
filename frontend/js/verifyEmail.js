const params = new URLSearchParams(window.location.search);
const token = params.get("token");

const statusText = document.getElementById("status");
const goLoginBtn = document.getElementById("goLoginBtn");

goLoginBtn.style.display = "none";

if (!token) {
    statusText.textContent = "Token no proporcionado.";
    goLoginBtn.style.display = "inline-block";
} else {
    fetch(`http://localhost:2808/api/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                statusText.textContent = `${data.message} Redirigiendo al inicio de sesion...`;

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
            } else {
                statusText.textContent = data.error || "Algo salio mal."
                goLoginBtn.style.display = "inline-block";
            }
        })
        .catch(() => {
            statusText.textContent = "Error de conexion al servidor."
            goLoginBtn.style.display = "inline-block";
        });
}