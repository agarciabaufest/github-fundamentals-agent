"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_model_1 = require("../models/workout.model");
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    const workouts = await workout_model_1.Workout.find().populate('user', 'name email').lean();
    res.json(workouts);
});
workoutsRouter.post('/', async (req, res) => {
    const workout = await workout_model_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = workoutsRouter;
