import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, default: 0, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
