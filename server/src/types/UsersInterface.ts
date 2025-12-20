import type { ObjectId } from "mongodb";

export interface Users {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
}
