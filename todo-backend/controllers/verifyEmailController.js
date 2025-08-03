const User = require("../models/userModel");

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) return res.status(400).json({ error: "Token no proporcionado." });

    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).json({ error: "Token invalido o expirado."});

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.redirect("http://localhost:5173/login.html");
    // Respuesta alternativa si no se redirige
    res.status(200).json({ message: "Correo verificado exitosamente. Puedes iniciar sesión ahora." });
};

module.exports = { verifyEmail };