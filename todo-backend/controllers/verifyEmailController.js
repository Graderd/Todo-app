const User = require("../models/userModel");

const verifyEmail = async (req, res) => {
    try {
    const { token } = req.query;

    if (!token) return res.status(400).json({ error: "Token no proporcionado." });

    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).json({ error: "Token invalido o expirado."});

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirigir al frontend después de la verificación
    // res.redirect("http://localhost:5173/login.html");

    res.status(200).json({ message: "Correo verificado exitosamente. Puedes iniciar sesión ahora." });

    } catch (error) {
        console.error("Error al verificar el correo:", error);
        res.status(500).json({ error: "Error al verificar el correo. Inténtalo de nuevo más tarde." });
    }
};

module.exports = { verifyEmail };