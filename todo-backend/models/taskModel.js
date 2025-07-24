const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;