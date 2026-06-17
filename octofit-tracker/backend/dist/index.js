"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.get('/', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker backend is running',
        baseUrl,
        apiBase: `${baseUrl}/api`,
    });
});
mongoose_1.default
    .connect(mongoUri, { dbName: 'octofit_db' })
    .then(() => {
    console.log('MongoDB connected to octofit_db');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
});
