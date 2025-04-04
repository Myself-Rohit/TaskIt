import express from "express";
import {
	createTask,
	editTask,
	getTasks,
	removeTask,
} from "../controllers/task.controllers.js";
import verifyToken from "../utils/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/all", verifyToken, getTasks);
router.patch("/edit/:taskId", verifyToken, editTask);
router.delete("/remove/:taskId", verifyToken, removeTask);
export default router;
