const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: "Token y nueva contraseña son requeridos." });
    }

    try {
        const user = await User.findOne({ 
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });

        if(!user) {
            return res.status(400).json({ error: "Token invalido o expirado." });
        }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpires = undefined;
            await user.save();

            return res.status(200).json({ message: "Contraseña restablecida con éxito. Puedes iniciar sesión ahora." });
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error.message);
            return res.status(500).json({ error: "Error inerno del servidor." });
        }
};

module.exports = {
    resetPassword
};