import { Router } from 'express';
import { User } from '../models/user.model';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await User.find().select('-passwordHash').lean();
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const user = await User.create(req.body);
  const safeUser = await User.findById(user._id).select('-passwordHash').lean();
  res.status(201).json(safeUser);
});

export default usersRouter;
