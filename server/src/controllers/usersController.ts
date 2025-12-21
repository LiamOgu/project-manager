import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/usersService.ts";
import type { UserInput } from "../types/UserInterface.ts";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash } = req.body;

    if (!username || !email || !passwordHash) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const userData: UserInput = {
      username,
      email,
      passwordHash,
    };

    const newUserId = await createUser(userData);

    return res.status(201).json({ userId: newUserId });
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }
    console.error("Error in createUserController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsersController = async (_: any, res: Response) => {
  try {
    const users = await getAllUsers();
    if (users && users.length > 0) {
      return res.status(200).json({ users });
    }
    return res.status(200).json({ users: [] });
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserByIdController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);

    const updates = req.body;
    const result = await updateUser(id, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User updated", ...result });
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);

    const result = await deleteUser(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
