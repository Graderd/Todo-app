const Task = require("../models/taskModel");

async function getAllTasks() {
    return await Task.find();
}

async function createTask(taskData){
    const task = new Task(taskData);
    return await task.save();
}

async function updateTask(id, updates) {
    return await Task.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteTask(id) {
    return await Task.findByIdAndDelete(id);
}

async function findByUserId(userId){
    return await Task.find({ userId }).sort({ createdAt: -1 });
}

async function findByIdAndUser(id, userId) {
    return await Task.findOne({ _id: id, userId });
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    findByUserId,
    findByIdAndUser,
};