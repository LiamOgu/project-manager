import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectByIdController,
  getProjectByOwnerIdController,
  updateProjectController,
} from "../controllers/projectsController.ts";
import { validateObjectId } from "../middlewares/validateObjectId.ts";

const router = express.Router();

router.post("/", createProjectController);
router.get("/", getAllProjectsController);
router.get("/id/:id", validateObjectId("id"), getProjectByIdController);
router.get(
  "/ownerId/:ownerId",
  validateObjectId("ownerId"),
  getProjectByOwnerIdController,
);
router.patch("/id/:id", validateObjectId("id"), updateProjectController);
router.delete("/id/:id", validateObjectId("id"), deleteProjectController);

export default router;
