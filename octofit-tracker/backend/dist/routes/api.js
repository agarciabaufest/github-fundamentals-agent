"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiRouter = (0, express_1.Router)();
apiRouter.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
exports.default = apiRouter;
