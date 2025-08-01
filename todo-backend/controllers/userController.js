const { registerUser, loginUser }= require("../services/authService");

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const result = await registerUser(name, email, password);

        res.status(201).json({user: result.user, token: result.token });
    }catch (error){
        console.error("Error al registrar usuario:", error.message);
        res.status(400).json({ error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);

        res.status(200).json({ token: result.token, name: result.user.name });
    }catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};