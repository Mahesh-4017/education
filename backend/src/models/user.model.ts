import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "student" | "instructor" | "admin";
  avatar: string;
  enrolledCourses: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  verify: boolean;
  otp?: number;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  getJWTToken: (expiresIn: string | number | undefined) => string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    verify: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function (expiresIn: string | number | undefined): string {
  const payload = { id: this._id, role: this.role };
  const secret = process.env.JWT_SECRET || "default_secret";
  const options: SignOptions = { expiresIn: expiresIn || "7d" };
  return jwt.sign(payload, secret, options);
};

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
