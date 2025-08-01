const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendVerificationEmail(to, name, link) {
    const mailOptions = {
        from: `Todo App <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verifica tu correo electronico',
        html: `
            <h3>Hola ${name},</h3>
            <p>Gracias por registrarte. Por favor verifica tu correo haciendo clic en el siguiente enlace:</p>
            <a href="${link}">Verificar Correo</a>
            `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendVerificationEmail;