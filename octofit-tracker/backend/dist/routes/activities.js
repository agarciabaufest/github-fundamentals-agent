"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_model_1 = require("../models/activity.model");
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    const activities = await activity_model_1.Activity.find().populate('user', 'name email').sort({ performedAt: -1 }).lean();
    res.json(activities);
});
activitiesRouter.post('/', async (req, res) => {
    const activity = await activity_model_1.Activity.create(req.body);
    res.status(201).json(activity);
});
exports.default = activitiesRouter;
