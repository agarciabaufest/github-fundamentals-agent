import { Router } from 'express';
import { Workout } from '../models/workout.model';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('user', 'name email').lean();
  res.json(workouts);
});

workoutsRouter.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default workoutsRouter;
