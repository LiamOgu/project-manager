import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/usersController.ts";
import { validateObjectId } from "../middlewares/validateObjectId.ts";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUsersController);
router.get("/id/:id", validateObjectId("id"), getUserByIdController);
router.patch("/id/:id", validateObjectId("id"), updateUserController);
router.delete("/id/:id", validateObjectId("id"), deleteUserController);

export default router;
