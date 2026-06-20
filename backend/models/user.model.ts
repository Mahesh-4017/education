import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from 'ms';
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: "avatar/qrha3atky0s6dgdalcqs",
      },
      url: {
        type: String,
        default: "https://res.cloudinary.com/daufn0xzj/image/upload/v1673085445/avatar/qrha3atky0s6dgdalcqs.png",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function (expiresIn: StringValue | number | undefined): string {
  const payload = { id: this._id };
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.index({ name: "text", profession: "text" });

const User = mongoose.model<IUser>("User", userSchema);

export { User };
