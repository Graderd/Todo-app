const taskService = require("../services/taskServices");

async function getTasksByUser(req, res) {
    try {
        const tasks = await taskService.getTasksByUser(req.userId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: error.message});
    }
}