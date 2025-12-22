import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./db/mongo.ts";
import projectRoutes from "./routes/projectRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import {
  createEmailIndex,
  createProjectNameIndex,
} from "./utils/indexesUtils.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "3000";

app.use(express.json()); // to parse JSON request bodies

const startApp = async () => {
  try {
    await connectToDatabase();
    await createEmailIndex();
    await createProjectNameIndex();

    app.use("/api/users", userRoutes);
    app.use("/api/projects", projectRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1); // Exit with error code
  }
};

startApp();
