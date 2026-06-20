import mongoose, { Document, Schema } from "mongoose";

const tempPassSchema: Schema<ITempPass> = new Schema(
    {
        tempPass: {
            type: String,
        },
        otp: {
            type: Number,
        }
    },
    { timestamps: true }
);

tempPassSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const TempPass = mongoose.model<ITempPass>("TempPass", tempPassSchema);

export { TempPass };
