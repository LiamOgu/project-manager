import type { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { Project, ProjectInput } from "../types/ProjectInterface.ts";

const getProjectsCollection = () => getDb().collection<Project>("projects");

export const createProject = async (
  project: ProjectInput,
): Promise<ObjectId> => {
  try {
    const projectToInsert = {
      ...project,
      createdAt: new Date(),
    };

    const result = await getProjectsCollection().insertOne(projectToInsert);
    console.log(`Project created with ID: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting project document:", error);
    throw error;
  }
};
