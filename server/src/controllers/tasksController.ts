import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../services/tasksService.ts";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, status, projectId, assignedTo } = req.body;
    if (!title || !description || !status || !projectId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const projectObjectId = new ObjectId(projectId);

    const newTask = await createTask({
      title,
      description,
      status,
      projectId: projectObjectId,
      assignedTo,
    });

    return res.status(201).json({ taskId: newTask });
  } catch (error) {
    console.error("Error in createTaskController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTasksController = async (_: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    if (tasks && tasks.length > 0) {
      return res.status(200).json({ tasks });
    }
    return res.status(200).json({ tasks: [] });
  } catch (error) {
    console.error("Error in getAllTasksController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    console.error("Error in getTaskByIdController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const updates = req.body;
    const result = await updateTask(id, updates);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error in updateTaskController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await deleteTask(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTaskController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
