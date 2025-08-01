const params = new URLSearchParams(window.location.search);
const token = params.get("token");

const statusText = document.getElementById("status");

if (!token) {
    statusText.textContent = "Token no proporcionado.";
} else {
    fetch(`http://localhost:2808/api/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
            if (data,message) {
                statusText.textContent = data.message;
            } else {
                statusText.textContent = data.error || "Algo salio mal."
            }
        })
        .catch(() => {
            statusText.textContent = "Error de conexion al servidor."
        });
}