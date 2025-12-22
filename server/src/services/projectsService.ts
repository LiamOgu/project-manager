import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { Project, ProjectInput } from "../types/ProjectInterface.ts";

const PROJECT_PROJECTION = {};

const getProjectsCollection = () => getDb().collection<Project>("projects");

export const createProject = async (
  projectInput: ProjectInput,
): Promise<ObjectId> => {
  const projectToInsert = {
    ...projectInput,
    createdAt: new Date(),
  };
  try {
    const result = await getProjectsCollection().insertOne(
      projectToInsert as any,
    );
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting project document:", error);
    throw error;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const result = await getProjectsCollection()
      .find({}, { projection: PROJECT_PROJECTION })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
};

export const getProjectById = async (
  projectId: ObjectId,
): Promise<Project | null> => {
  try {
    const result = await getProjectsCollection().findOne(
      { _id: projectId },
      { projection: PROJECT_PROJECTION },
    );
    return result;
  } catch (error) {
    console.error("Error finding project document:", error);
    throw error;
  }
};

export const updateProject = async (
  projectId: ObjectId,
  updates: Partial<ProjectInput>,
): Promise<{ matchedCount: number; modifiedCount: number }> => {
  try {
    const result = await getProjectsCollection().updateOne(
      { _id: projectId },
      { $set: updates },
    );
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    console.error("Error updating project document:", error);
    throw error;
  }
};

export const deleteProject = async (
  projectId: ObjectId,
): Promise<{ deletedCount: number }> => {
  try {
    const result = await getProjectsCollection().deleteOne({ _id: projectId });
    return { deletedCount: result.deletedCount };
  } catch (error) {
    console.error("Error deleting project document:", error);
    throw error;
  }
};

export const getProjectsByOwnerId = async (
  ownerId: ObjectId,
): Promise<Project[]> => {
  try {
    const result = await getProjectsCollection()
      .find({ ownerId: ownerId }, { projection: PROJECT_PROJECTION })
      .toArray();
    console.log("Projects fetched for ownerId", ownerId, ":", result);
    console.log("Type of ownerId", ownerId, ":", typeof ownerId);
    return result;
  } catch (error) {
    console.error("Error fetching projects by ownerId:", error);
    throw error;
  }
};
