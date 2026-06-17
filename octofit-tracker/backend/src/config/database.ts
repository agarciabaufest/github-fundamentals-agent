import mongoose from 'mongoose';

export const databaseName = 'octofit_db';
export const mongoUri = process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/${databaseName}`;

export function connectDatabase() {
  return mongoose.connect(mongoUri, { dbName: databaseName });
}

export { mongoose };
