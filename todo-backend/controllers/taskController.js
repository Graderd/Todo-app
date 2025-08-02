const taskService = require("../services/taskServices");

//Obterner tareas por usuario
async function getTasksByUser(req, res) {
    try {
        const tasks = await taskService.getTasksByUser(req.userId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: error.message});
    }
}

//Crear tarea
async function createTask(req, res) {
    try{
        const newTask = await taskService.createTask({ ...req.body, userId: req.userId});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Actualizar tarea
async function updateTask(req, res) {
    try {
        const updated = await taskService.updateTask(req.params.id, req.userId, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Eliminar tarea
async function deleteTask(req, res) {
    try {
        await taskService.deleteTask(req.params.id, req.userId);
        res.status(200).json({ message: "Tarea eliminada exitosamente." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask,
};