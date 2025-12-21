import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
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

export const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserByEmailController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const objectId = new ObjectId(id);
    const user = await getUserById(objectId);

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
    const id = req.params.id;
    const { username, email } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const objectId = new ObjectId(id);

    const currentUser = await getUserById(objectId);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updates: Partial<UserInput> = {};

    if (username !== undefined) {
      updates.username = username;
    }

    if (email !== undefined) {
      if (email !== currentUser.email) {
        const existingUser = await getUserByEmail(email);
        if (
          existingUser &&
          existingUser._id.toString() !== objectId.toString()
        ) {
          return res.status(409).json({ error: "Email already exists" });
        }
        updates.email = email;
      }
    }

    const result = await updateUser(objectId, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    console.error("Error in updateUserController:", error);

    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

// export const
