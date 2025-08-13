const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendResetEmail(to, name, link) {
    const options = {
        from: `Todo App <${process.env.EMAIL_USER}>`,
        to,
        subject: "Restablecer contraseña",
        html: `
            <h3>Hola ${name},</h3>
            <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <a href="${link}">Restablecer contraseña</a>
            <p>Este enlace expirará en 30 minutos.</p>
        `
    };

    await transporter.sendMail(options);
}

module.exports = sendResetEmail;
