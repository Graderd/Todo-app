const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 2808;

require("dotenv").config();

//Middlewares globales
app.use(cors());
app.use(express.json());

//Rutas
app.use("/api/tasks",taskRoutes);
app.use("/api/auth", authRoutes);

//Conexion a DB y arranque del servidor
connectDB().then(() => {
    app.listen(port, () =>{
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error al conectar con MongoDB", err);
});