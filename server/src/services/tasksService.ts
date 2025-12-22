import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.ts";
import type { Task, TaskInput } from "../types/TaskInterface.ts";

const TASK_PROJECTION = {};

const getTasksCollection = () => getDb().collection<Task>("tasks");

export const createTask = async (taskInput: TaskInput): Promise<ObjectId> => {
  const taskToInsert = {
    ...taskInput,
    createdAt: new Date(),
  };
  try {
    const result = await getTasksCollection().insertOne(taskToInsert as any);
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting task document:", error);
    throw error;
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const result = await getTasksCollection()
      .find({}, { projection: TASK_PROJECTION })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
};

export const getTaskById = async (taskId: ObjectId): Promise<Task | null> => {
  try {
    const result = await getTasksCollection().findOne(
      { _id: taskId },
      { projection: TASK_PROJECTION },
    );
    return result;
  } catch (error) {
    console.error("Error finding task document:", error);
    throw error;
  }
};

export const updateTask = async (
  taskId: ObjectId,
  updates: Partial<TaskInput>,
): Promise<{ matchedCount: number; modifiedCount: number }> => {
  try {
    const result = await getTasksCollection().updateOne(
      { _id: taskId },
      { $set: updates },
    );
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (error) {
    console.error("Error updating task document:", error);
    throw error;
  }
};

export const deleteTask = async (
  taskId: ObjectId,
): Promise<{ deletedCount: number }> => {
  try {
    const result = await getTasksCollection().deleteOne({ _id: taskId });
    return { deletedCount: result.deletedCount };
  } catch (error) {
    console.error("Error deleting task document:", error);
    throw error;
  }
};

export const getTasksByProjectId = async (
  projectId: ObjectId,
): Promise<Task[]> => {
  try {
    const result = await getTasksCollection()
      .find({ projectId }, { projection: TASK_PROJECTION })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error fetching tasks by projectId:", error);
    throw error;
  }
};

export const getTasksByAssigneeId = async (
  assigneeId: ObjectId,
): Promise<Task[]> => {
  try {
    const result = await getTasksCollection()
      .find({ assignedTo: assigneeId }, { projection: TASK_PROJECTION })
      .toArray();
    console.log("Tasks fetched for assigneeId", assigneeId, ":", result);
    return result;
  } catch (error) {
    console.error("Error fetching tasks by assigneeId:", error);
    throw error;
  }
};
