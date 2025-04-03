import express from "express";
import { createTask, getTasks } from "../controllers/task.controllers.js";
import verifyToken from "../utils/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/all", verifyToken, getTasks);
export default router;
