const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ error: "Token no proporcionado"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({ error: "Token no contiene userId" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error){
        console.error("Error de autenticación:", error.message);
        return res.status(401).json({ error: "Token invalido o expirado"});
    }
}

module.exports = authMiddleware;