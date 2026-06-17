import { Schema, model, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);
