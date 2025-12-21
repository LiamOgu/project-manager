import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByEmailController,
  getUserByIdController,
  updateUserController,
} from "../controllers/usersController.ts";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUsersController);
router.get("/id/:id", getUserByIdController);
router.get("/email/:email", getUserByEmailController);
router.patch("/id/:id", updateUserController);
router.delete("/id/:id", deleteUserController);

export default router;
