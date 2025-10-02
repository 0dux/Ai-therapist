import express from "express";
import { Request, Response } from "express";
import { serve } from "inngest/express";
import { inngest } from "./Inngest/inngest";
import { functions as inngestFunctions } from "./Inngest/functions";
import logger from "./utils/logger";
import connectDB from "./utils/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  "/api/inngest",
  serve({ client: inngest, functions: inngestFunctions })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/chat", (req: Request, res: Response) => {
  res.send("Hi! How can I assist you today?");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}
      http://localhost:${port}/`);
      logger.info(
        `Inngest functions available:
      http://localhost:${port}/api/inngest`
      );
    });
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
    process.exit(1);
  }
};

startServer();
