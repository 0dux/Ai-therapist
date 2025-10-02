import express from "express";
import { Request, Response } from "express";
import logger from "./utils/logger";
import { serve } from "inngest/express";
// import { inngest, functions } from "./src/inngest";

// Important: ensure you add JSON middleware to process incoming JSON POST payloads.
const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(
        `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
      );
    });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
