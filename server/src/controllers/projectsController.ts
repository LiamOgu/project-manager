import type { Request, Response } from "express";
import { ObjectId } from "mongodb";

import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/projectsService.ts";

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const { name, ownerId } = req.body;
    if (!name || !ownerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newProject = await createProject({ name, ownerId });

    return res.status(201).json({ projectId: newProject });
  } catch (error) {
    console.error("Error in createProjectController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProjectsController = async (_: Request, res: Response) => {
  try {
    const projects = await getAllProjects();
    if (projects && projects.length > 0) {
      return res.status(200).json({ projects });
    }
    return res.status(200).json({ projects: [] });
  } catch (error) {
    console.error("Error in getAllProjectsController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectByIdController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(200).json({ project });
  } catch (error) {
    console.error("Error in getProjectByIdController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProjectController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const updates = req.body;

    const updatedProject = await updateProject(id, updates);

    if (!updatedProject.matchedCount) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(200).json({ updatedProject });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Project name already exists"
    ) {
      return res.status(409).json({ error: error.message });
    }
    console.error("Error in updateProjectController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProjectController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);

    const deletedProject = await deleteProject(id);

    if (!deletedProject.deletedCount) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error in deleteProjectController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
