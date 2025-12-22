import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/tasksController.ts";
import { validateObjectId } from "../middlewares/validateObjectId.ts";

const router = express.Router();

router.post("/", createTaskController);
router.get("/", getAllTasksController);
router.get("/id/:id", validateObjectId("id"), getTaskByIdController);
router.patch("/id/:id", validateObjectId("id"), updateTaskController);
router.delete("/id/:id", validateObjectId("id"), deleteTaskController);

export default router;
