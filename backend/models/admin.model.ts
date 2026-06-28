import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password?: string;
  role: mongoose.Types.ObjectId;
  getJWTToken(expiresIn?: StringValue | number): string;
  comparePassword(password: string): Promise<boolean>;
}

const adminSchema: Schema<IAdmin> = new Schema(
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
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

adminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

adminSchema.methods.getJWTToken = function (
  expiresIn: StringValue | number | undefined
): string {
  const payload = { id: this._id };
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

adminSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
