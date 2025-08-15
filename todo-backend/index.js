require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 2808;

// Limitadoe de peticiones
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 peticiones por IP
    message: "Demasiadas peticiones, por favor intente de nuevo más tarde."
});

// Lista de orígenes permitidos
const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5500/frontend",
];

//Middlewares globales
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use("/api/", limiter)

//Rutas
app.use("/api/tasks",taskRoutes);
app.use("/api/auth", authRoutes);

//Middleware de manejo de errores
app.use(errorHandler);

//Conexion a DB y arranque del servidor
connectDB().then(() => {
    app.listen(port, () =>{
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error al conectar con MongoDB", err);
});

