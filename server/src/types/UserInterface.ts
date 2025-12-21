import type { ObjectId } from "mongodb";

export interface UserInput {
  username: string;
  email: string;
  passwordHash: string;
}

export interface User extends UserInput {
  _id: ObjectId;
  createdAt: Date;
}
