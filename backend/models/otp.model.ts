import mongoose, { Document, Schema } from "mongoose";

const otpSchema: Schema<IOtp> = new Schema(
    {
        otp: {
            type: Number,
        },
    },
    { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export { Otp };
