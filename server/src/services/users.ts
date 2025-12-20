import type { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { User } from "../types/UserInterface.ts";

const usersCollection = getDb().collection<User>("users");

export const createUser = async (user: User) => {
  try {
    const result = await usersCollection.insertOne(user);
    console.log(`You inserted 1 user document : ${result}`);
  } catch (error) {
    console.error("Error inserting user document:", error);
    throw error;
  }
};

export const getUser = async (userId: ObjectId) => {
  try {
    const result = await usersCollection.findOne(userId);
    console.log(`User found : ${result}`);
  } catch (error) {
    console.error("Error finding user document:", error);
    throw error;
  }
};

export const getUsers = async (usersId: ObjectId[]) => {
  try {
    const result = await usersCollection.find(usersId).toArray();
    console.log(`User found : ${result}`);
  } catch (error) {
    console.error("Error finding user document:", error);
    throw error;
  }
};

export const updateUser = async (userId: ObjectId, update: Object) => {
  try {
    const result = await usersCollection.updateOne(userId, update);
    console.log(`User updated : ${result}`);
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};

export const deleteUser = async (userId: ObjectId) => {
  try {
    const result = await usersCollection.deleteOne(userId);
    console.log(`User deleted : ${result}`);
  } catch (error) {
    console.error("Error deleting user document:", error);
    throw error;
  }
};
