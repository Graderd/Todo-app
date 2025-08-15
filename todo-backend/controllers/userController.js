const { registerUser, loginUser } = require("../services/authService");

//Registro de usuario
const register = async (req, res) => {
    try{
        const {name, email, password, confirmPassword} = req.body;

        //validacion extra de contraseñas
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Las contraseñas no coinciden"
            });
        }

        const result = await registerUser(name, email, password);

        res.status(201).json({
            success: true,
            data: {
                user: result.user,
                token: result.token
            }
        });
    }catch (error){
        console.error("Error al registrar usuario:", error.message);
        res.status(400).json({ success: false, error: error.message});
    }
};

//Inicio de sesion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            data:{
                token: result.token,
                name: result.user.name
            }
        });
    }catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        res.status(401).json({ success: false, error: error.message });
    }
};

module.exports = {
    register,
    login,
};