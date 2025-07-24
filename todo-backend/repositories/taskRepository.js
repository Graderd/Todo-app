const mongoose = require("mongoose");
const Task = require("../models/taskModel");

async function getAllTasks(){
    return await Task.find();
}

async function createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
}

async function updateTask(id, updates) {
    const result = await Task.findByIdAndUpdate(id, updates, { new: true });
    return result;
}

async function deleteTask(id) {
    const result = await Task.findByIdAndDelete(id);
    return result !== null;
}

module.exports = {
    setTasksCollection,
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};