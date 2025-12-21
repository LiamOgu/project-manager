import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByEmailController,
  getUserByIdController,
} from "../controllers/usersController.ts";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUsersController);
router.get("/id/:id", getUserByIdController);
router.get("/email/:email", getUserByEmailController);

export default router;
