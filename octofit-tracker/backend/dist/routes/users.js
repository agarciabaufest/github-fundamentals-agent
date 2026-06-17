"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    const users = await user_model_1.User.find().select('-passwordHash').lean();
    res.json(users);
});
usersRouter.post('/', async (req, res) => {
    const user = await user_model_1.User.create(req.body);
    const safeUser = await user_model_1.User.findById(user._id).select('-passwordHash').lean();
    res.status(201).json(safeUser);
});
exports.default = usersRouter;
