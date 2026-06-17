import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard.model';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user', 'name email').sort({ rank: 1, points: -1 }).lean();
  res.json(leaderboard);
});

leaderboardRouter.post('/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

export default leaderboardRouter;
