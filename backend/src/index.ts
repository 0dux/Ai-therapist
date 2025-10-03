import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { serve } from "inngest/express";
import morgan from "morgan";
import { functions as inngestFunctions } from "./Inngest/functions";
import { inngest } from "./Inngest/inngest";
import { errorHandler } from "./middlewares/errorHandler";
import auth from "./routes/auth";
import connectDB from "./utils/db";
import logger from "./utils/logger";
import chatRouter from "./routes/chat";
import moodRouter from "./routes/mood";
import activityRouter from "./routes/activity";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

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

app.use("/auth", auth);
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);
app.use(errorHandler);

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
