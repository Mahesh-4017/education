import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URI_PRO || "mongodb://localhost:27017/education";
import http from "http";
async function init() {
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
      process.exit(1);
    });
  const httpServer = http.createServer(app)

  const server = httpServer.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
  });
  process.on("unhandledRejection", (err: unknown) => {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
      console.error(`Shutting down the server due to Unhandled Promise Rejection`);
    } else {
      console.error("An unknown error occurred. Shutting down the server due to Unhandled Promise Rejection.");
    }

    server.close(() => {
      process.exit(1);
    });
  });
}

init()