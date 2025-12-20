import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";

dotenv.config();
const app = express();

const PORT: string = process.env.PORT || "3000";

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
