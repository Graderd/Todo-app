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

    if(taskData.texto.length > 200){
        throw new Error("El texto de la tarea es demasiado largo");
    }

    taskData.completado = !!taskData.completado;

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

        const trimmedText = updates.texto.trim();

        if (trimmedText.length > 200) {
            throw new Error("El texto de la tarea es demasiado largo");
        }

        task.texto = trimmedText;
    }
    if (updates.completado !== undefined) {
        task.completado = !!updates.completado;
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