const express = require("express");
const router = express.Router();

const { createTask, getTasksByUser, deleteTask, updateTask } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getTasksByUser);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;