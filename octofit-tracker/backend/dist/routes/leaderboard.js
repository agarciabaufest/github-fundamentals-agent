"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_model_1 = require("../models/leaderboard.model");
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_model_1.Leaderboard.find().populate('user', 'name email').sort({ rank: 1, points: -1 }).lean();
    res.json(leaderboard);
});
leaderboardRouter.post('/', async (req, res) => {
    const entry = await leaderboard_model_1.Leaderboard.create(req.body);
    res.status(201).json(entry);
});
exports.default = leaderboardRouter;
