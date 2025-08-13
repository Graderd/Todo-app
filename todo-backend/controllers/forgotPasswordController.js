const User = require('../models/userModel');
const crypto = require('crypto');
const sendResetEmail = require('../utils/sendResetEmail');

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Correo electronico requerido."});

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
        return res.status(404).json({ error: "No se encontro un usuario con este correo electronico."
        });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 1000 * 60 * 60;

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;

    await sendResetEmail(user.email, user.name, resetLink);

        res.json({ message: "Correo de recuperacion enviado con exito."});
};

module.exports = {
    forgotPassword
};