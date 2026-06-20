import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Education Backend API is running...");
});

// Basic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

export default app;
