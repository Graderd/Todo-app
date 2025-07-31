const { registerUser, loginUser }= require("../services/authService");

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const result = await registerUser(name, email, password);

        const userSafe = result.user.toObject();
        delete userSafe.password;

        res.status(201).json({user: userSafe, token: result.token });
    }catch (error){
        res.status(400).json({ error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        res.status(200).json({ token: result.token, name: result.user.name });
    }catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};