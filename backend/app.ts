import express, { Request, Response, NextFunction, Application } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import errorMiddleware from "./middleware/error";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
const app: Application = express();
// const allowedOrigins: string[] = [
//   "http://localhost:5173",
//   "http://localhost:3001",
//   // "http://localhost:3002",
// ];

app.use(compression());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/v1", userRoutes);
app.use("/api/v1/", adminRoutes);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export default app;
