import { ObjectId } from "mongodb";

export interface Task {
  _id?: ObjectId;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  projectId: ObjectId;
  assignedTo?: ObjectId;
  createdAt: Date;
}
