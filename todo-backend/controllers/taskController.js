const Task = require("../models/taskModel");

//Obtener Tareas
async function getTasksByUser(req, res) {
    try {
        const userId = req.userId;

        const tasks = await Task.find({ userId }).sort({ createdAt: -1});

        res.status(200).json(tasks);
    } catch (error){
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error al obtener las tarea", details: error.message});
    }
}

//Crear Tareas
async function createTask(req, res) {
    const { texto, completado } = req.body;

    if (!texto || typeof texto !== 'string') {
        return res.status(400).json({ error: "Texto invalido"});
    }

    try {
        const task = new Task({
            texto: texto.trim(),
            completado: !!completado,
            userId: req.userId
        });

        const saved = await task.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tarea"});
    }
}

//Eliminar Tarea por ID
async function deleteTask(req, res){
    const { id } = req.params;
    const userId = req.userId;

    try{
        const tasks = await Task.findOne({ _id: id, userId });

        if (!tasks) {
            return res.status(404).json({ error: "Tarea no encontrada o no autorizada"});
        }

        await tasks.deleteOne();
        res.status(200).json({ message: "Tarea eliminada exitosamente"});
    } catch (error){
        console.error("Error al eliminar la tarea:", error);
        res.status(500).json({ error: "Error al eliminar la tarea", details: error.message });
    }
}

//Editar Tareas
async function updateTask(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    const { texto, completado } = req.body;

    try {
        const tasks = await Task.findOne({ _id: id, userId });

        if (!tasks) {
            return res.status(404).json({ error: "Tarea no encontrada o no autorizada" });
        }

        if (texto !== undefined) {
            if (typeof texto !== "string" || texto.trim() === "") {
                return res.status(404), json({ error: "Texto invalido" });
            }
            tasks.texto = texto.trim();
        }

        if (completado !== undefined) {
            tasks.completado = !!completado;
        }

        const updated = await tasks.save();
        res.status(200).json(updated);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        res.status(500).json({ error: "Error al actualizar la tarea", details: error.message });
    }
}

module.exports = {
    createTask,
    getTasksByUser,
    deleteTask,
    updateTask,
};