const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const User = require("../models/userModel");
const { generateToken } = require("../utils/tokenUtils");
const sendVerificationEmail = require("../utils/emailSender");

// Registro de usuario
const registerUser = async (name, email, password, confirmPassword) => {

    if (!name || typeof name !== "string" || name.trim().length < 2){
        throw new Error("Nombre invalido");
    }

    if (!email || !validator.isEmail(email.trim())) {
        throw new Error("Correo electronico invalido.");
    }

    if (!password || !validator.isStrongPassword(password, { minLength: 6, minNumbers: 1 })) {
        throw new Error("Contraseña invalida. Debe tener al menos 6 caracteres y un numero.");
    }

    if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("El correo ya esta registrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        verificationToken
    });

    await user.save();

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(user.email, user.name, verificationLink);

    return { message: "Usuario registrado exitosamente. Por favor verifica tu correo electronico." };
};

//Inicio de Sesion
const loginUser = async (email, password) => {

    if(!email || !validator.isEmail(email.trim())) {
        throw new Error("Correo electronico invalido.");
    }

    if(!password || typeof password !== "string" || validator.isEmpty(password.trim())) {
        throw new Error("Contraseña invalida.");
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if(!user){
        throw new Error("Usuario no encontrado.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Contraseña incorrecta.");
    }

    const token = generateToken( {userId: user._id} );

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};

module.exports = {
    registerUser,
    loginUser,
};