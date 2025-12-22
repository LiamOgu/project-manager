import type { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { User, UserInput } from "../types/UserInterface.ts";
import { passwordHash } from "../utils/passwordUtils.ts";

const getUsersCollection = () => getDb().collection<User>("users");

const USER_PROJECTION = {
  passwordHash: 0,
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const createUser = async (userInput: UserInput): Promise<ObjectId> => {
  if (!isValidEmail(userInput.email)) {
    throw new Error("Invalid email format");
  }

  const userToInsert = {
    ...userInput,
    passwordHash: await passwordHash(userInput.passwordHash),
    createdAt: new Date(),
  };
  try {
    const result = await getUsersCollection().insertOne(userToInsert as any);
    return result.insertedId;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    console.error("Error inserting user document:", error);
    throw error;
  }
};

export const getUserById = async (userId: ObjectId): Promise<User | null> => {
  try {
    const result = await getUsersCollection().findOne(
      { _id: userId },
      { projection: USER_PROJECTION },
    );
    return result;
  } catch (error) {
    console.error("Error finding user document:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await getUsersCollection().findOne(
      { email },
      { projection: USER_PROJECTION },
    );
    return result;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await getUsersCollection()
      .find({}, { projection: USER_PROJECTION })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error finding user document:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: ObjectId,
  updates: Partial<UserInput>,
): Promise<{ matchedCount: number; modifiedCount: number }> => {
  try {
    const result = await getUsersCollection().updateOne(
      { _id: userId },
      { $set: updates },
    );
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    console.error("Error updating user document:", error);
    throw error;
  }
};

export const deleteUser = async (
  userId: ObjectId,
): Promise<{ deletedCount: number }> => {
  try {
    const result = await getUsersCollection().deleteOne({ _id: userId });
    return { deletedCount: result.deletedCount };
  } catch (error) {
    console.error("Error deleting user document:", error);
    throw error;
  }
};
