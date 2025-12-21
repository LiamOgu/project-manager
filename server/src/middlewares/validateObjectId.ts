import type { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export const validateObjectId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];
    if (!id) {
      return res
        .status(400)
        .json({ error: `${paramName} parameter is required` });
    }
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid ${paramName} format` });
    }
    next();
  };
};
