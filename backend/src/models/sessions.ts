import mongoose, { Schema } from "mongoose";

interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  deviceInfo?: string;
  lastActiveAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    deviceInfo: { type: String },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
export { ISession };
