import { ObjectId } from "mongodb";

export interface TaskInput {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  assignedTo?: ObjectId;
  projectId: ObjectId;
}

export interface Task extends TaskInput {
  _id: ObjectId;
  createdAt: Date;
}
