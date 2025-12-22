import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  getTaskByProjectIdController,
  getTasksByAssigneeIdController,
  updateTaskController,
} from "../controllers/tasksController.ts";
import { validateObjectId } from "../middlewares/validateObjectId.ts";

const router = express.Router();

router.post("/", createTaskController);
router.get("/", getAllTasksController);
router.get("/id/:id", validateObjectId("id"), getTaskByIdController);
router.get(
  "/projectId/:projectId",
  validateObjectId("projectId"),
  getTaskByProjectIdController,
);
router.get(
  "/assigneeId/:assigneeId",
  validateObjectId("assigneeId"),
  getTasksByAssigneeIdController,
);
router.patch("/id/:id", validateObjectId("id"), updateTaskController);
router.delete("/id/:id", validateObjectId("id"), deleteTaskController);

export default router;
