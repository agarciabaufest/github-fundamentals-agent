import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/api';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    baseUrl,
    apiBase: `${baseUrl}/api`,
  });
});

mongoose
  .connect(mongoUri, { dbName: 'octofit_db' })
  .then(() => {
    console.log('MongoDB connected to octofit_db');
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection error:', error);
  });

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});
