"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = 8000;
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
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
});
(0, database_1.connectDatabase)()
    .then(() => {
    console.log(`MongoDB connected to ${database_1.databaseName}`);
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
});
