import express from "express";
import { createProjectController } from "../controllers/projectsController.ts";

const router = express.Router();

router.post("/", createProjectController);

export default router;
