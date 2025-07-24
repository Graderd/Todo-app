const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createTask, getTasksByUser, deleteTask, updateTask } = require("../controllers/taskController");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasksByUser);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);
module.exports = router;