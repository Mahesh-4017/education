import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDatabase = async (): Promise<void> => {
  try {
    const dbUri = process.env.DB_URI_PRO;
    if (!dbUri) {
      throw new Error("Database connection URI (DB_URI_LOCAL) is not defined in environment variables.");
    }
    mongoose.connect(dbUri, { autoIndex: true });
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDatabase;
