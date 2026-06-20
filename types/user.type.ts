import { Document } from "mongoose";
import { StringValue } from 'ms';
declare global {
  interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    verify: boolean;
    avatar: {
      public_id: string;
      url: string;
    };
    updatedAt: Date;
    createdAt: Date;
    getJWTToken: (expiresIn: StringValue | number | undefined) => string;
    comparePassword: (password: string) => Promise<boolean>;
  }
  interface IOtp extends Document {
    otp: number;
    updatedAt: Date;
    createdAt: Date;

  }
  interface ITempPass extends Document {
    tempPass: string;
    otp: number;
    updatedAt: Date;
    createdAt: Date;
  }
}