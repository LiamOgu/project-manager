import type { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { User, UserInput } from "../types/UserInterface.ts";

const usersCollection = getDb().collection<User>("users");

const USER_PROJECTION = {
  passwordHash: 0,
};

export const createEmailIndex = async (): Promise<void> => {
  try {
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log("Unique index created on email field");
  } catch (error) {
    console.error("Error creating email index:", error);
    throw error;
  }
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
    createdAt: new Date(),
  };
  try {
    const result = await usersCollection.insertOne(userToInsert as any); // le as any c'est pour contourner un problème de typage
    console.log(`User created with ID: ${result.insertedId}`);
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
    const result = await usersCollection.findOne(
      { _id: userId },
      { projection: USER_PROJECTION },
    );
    console.log(`User found : ${result}`);
    return result;
  } catch (error) {
    console.error("Error finding user document:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await usersCollection.findOne(
      { email },
      { projection: USER_PROJECTION },
    );
    return result;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[] | []> => {
  try {
    const result = await usersCollection
      .find({}, { projection: USER_PROJECTION })
      .toArray();
    console.log(`${result.length} Users found : ${result}`);
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
    const result = await usersCollection.updateOne(
      { _id: userId },
      { $set: updates },
    );
    console.log(`User updated : ${result.modifiedCount}`);
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

export const deleteUser = async (userId: ObjectId) => {
  try {
    const result = await usersCollection.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }
    console.log(`User deleted with ID : ${userId}`);
    return { deletedCount: result.deletedCount };
  } catch (error) {
    console.error("Error deleting user document:", error);
    throw error;
  }
};
