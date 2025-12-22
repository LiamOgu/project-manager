import type { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { Project, ProjectInput } from "../types/ProjectInterface.ts";

const PROJECT_PROJECTION = {
  _id: 0,
};

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

// export const getProjectsByOwnerId = async (
//   ownerId: ObjectId,
// ): Promise<Project[]> => {
//   try {
//     if (!ownerId) {
//       throw new Error("ownerId is required");
//     }
//     const result = await getProjectsCollection().findOne(
//       { ownerId },
//       { projection: PROJECT_PROJECTION },
//     );
//     if (!result) {
//       console.log(`No projects found for ownerId: ${ownerId}`);
//       return [];
//     }
//     console.log(`Fetched ${result.length} projects for ownerId: ${ownerId}`);
//     return result;
//   } catch (error) {
//     console.error("Error fetching projects by ownerId:", error);
//     throw error;
//   }
// };
