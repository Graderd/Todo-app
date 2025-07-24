const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils/tokenUtils");

const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("El correo ya esta registrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword});
    await user.save();

    const token = generateToken({ userId: user._id });

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error("Usuario no encontrado.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Contraseña incorrecta.");
    }

    const token = generateToken(user._id );

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};

module.exports = {
    registerUser,
    loginUser,
};