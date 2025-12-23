import type { ObjectId } from "mongodb";

export interface ProjectInput {
  name: string;
  ownerId: ObjectId;
}

export interface Project extends ProjectInput {
  _id: ObjectId;
  createdAt: Date;
}

export interface ProjectWithStats extends Project {
  nbTotalTasks: number;
  nbTodoTasks: number;
  nbInProgressTasks: number;
  nbCompletedTasks: number;
}
