import { Router } from 'express';
import { Team } from '../models/team.model';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const teams = await Team.find().populate('owner', 'name email').populate('members', 'name email').lean();
  res.json(teams);
});

teamsRouter.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

export default teamsRouter;
