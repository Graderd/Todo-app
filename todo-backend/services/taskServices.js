const taskRepository = require('../repositories/taskRepository');

// Obtener tareas de un usuario específico
async function getTasksByUser(userId){
    return await taskRepository.findByUserId(userId);
}

//Crear tarea
async function createTask(taskData){
    if (!taskData.texto || typeof taskData.texto !== 'string'){
        throw new Error("Texto invalido");
    }

    taskData.texto = taskData.texto.trim();
    taskData.completada = !!taskData.completada;

    return await taskRepository.createTask(taskData);
}

// Actualizar tarea
async function updateTask(id, userId, updates){
    const task = await taskRepository.findByIdAndUser(id, userId);
    if (!task) {
        throw new Error("Tarea no encontrada");
    }

    if (updates.texto !== undefined){
        if(typeof updates.texto !== 'string' || updates.texto.trim() === '') {
            throw new Error("Texto invalido");
        }
        task.texto = updates.texto.trim();
    }
    if (updates.completada !== undefined) {
        task.completado = !!updates.completada;
    }

    const updated = await task.save();
    return updated;
}

// Eliminar tarea
async function deleteTask(id, userId){
    const task = await taskRepository.findByIdAndUser(id, userId);
    if (!task) {
        throw new Error("Tarea no encontrada");
    }

    await task.deleteOne();
    return true;
}

module.exports = {
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask,
};