import express, { NextFunction, Request, Response } from 'express';
import { connectDatabase, databaseName } from './config/database';
import apiRouter from './routes/api';

const app = express();
const port = 8000;

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

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

connectDatabase()
  .then(() => {
    console.log(`MongoDB connected to ${databaseName}`);
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection error:', error);
  });

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});
