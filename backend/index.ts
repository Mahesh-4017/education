import app from "./app";
import http from "http";
// import SocketService from "./services/socket";
import connectDatabase from "./config/database";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" })
async function init() {
  // const socketService = new SocketService()
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  const httpServer = http.createServer(app)
  // socketService.io.attach(httpServer)
  await connectDatabase();

  const server = httpServer.listen(8000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT || 8000}`);
  });
  // socketService.initListeners()
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
