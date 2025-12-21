import type { ObjectId } from "mongodb";

export interface ProjectInput {
  name: string;
  ownerId: ObjectId;
}

export interface Project extends ProjectInput {
  _id?: ObjectId;
  name: string;
  ownerId: ObjectId;
  createdAt: Date;
}
