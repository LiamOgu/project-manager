import type { Request, Response } from "express";
import { createProject } from "../services/projectsService.ts";

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
