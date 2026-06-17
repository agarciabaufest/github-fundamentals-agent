"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_model_1 = require("../models/team.model");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res) => {
    const teams = await team_model_1.Team.find().populate('owner', 'name email').populate('members', 'name email').lean();
    res.json(teams);
});
teamsRouter.post('/', async (req, res) => {
    const team = await team_model_1.Team.create(req.body);
    res.status(201).json(team);
});
exports.default = teamsRouter;
