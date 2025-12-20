import type { ObjectId } from "mongodb";

export interface Projects {
  _id?: ObjectId;
  name: string;
  ownerId: ObjectId;
  createdAt: Date;
}
