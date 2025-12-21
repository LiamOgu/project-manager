import { getDb } from "../db/mongo.ts";
import type { User } from "../types/UserInterface.ts";

const getUsersCollection = () => getDb().collection<User>("users");

export const createEmailIndex = async (): Promise<void> => {
  try {
    await getUsersCollection().createIndex({ email: 1 }, { unique: true });
    console.log("Unique index created on email field");
  } catch (error) {
    console.error("Error creating email index:", error);
    throw error;
  }
};
