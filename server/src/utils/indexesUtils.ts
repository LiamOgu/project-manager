import { getDb } from "../db/mongo.ts";
import type { Project } from "../types/ProjectInterface.ts";
import type { User } from "../types/UserInterface.ts";

const getUsersCollection = () => getDb().collection<User>("users");
const getProjectsCollection = () => getDb().collection<Project>("projects");
const getTasksCollection = () => getDb().collection("tasks");

export const createEmailIndex = async (): Promise<void> => {
  try {
    await getUsersCollection().createIndex({ email: 1 }, { unique: true });
    console.log("Unique index created on email field");
  } catch (error) {
    console.error("Error creating email index:", error);
    throw error;
  }
};

export const createProjectNameIndex = async (): Promise<void> => {
  try {
    await getProjectsCollection().createIndex({ name: 1 }, { unique: true });
    console.log("Unique index created on project name field");
  } catch (error) {
    console.error("Error creating project name index:", error);
    throw error;
  }
};

export const createProjectIdIndex = async (): Promise<void> => {
  try {
    await getTasksCollection().createIndex({ projectId: 1 });
    console.log("Index created on tasks : projectId field");
  } catch (error) {
    console.error("Error creating projectId index:", error);
    throw error;
  }
};
