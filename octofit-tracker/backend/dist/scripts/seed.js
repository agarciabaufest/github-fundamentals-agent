"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_model_1 = require("../models/activity.model");
const leaderboard_model_1 = require("../models/leaderboard.model");
const team_model_1 = require("../models/team.model");
const user_model_1 = require("../models/user.model");
const workout_model_1 = require("../models/workout.model");
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri, { dbName: 'octofit_db' });
    await Promise.all([
        activity_model_1.Activity.deleteMany({}),
        leaderboard_model_1.Leaderboard.deleteMany({}),
        team_model_1.Team.deleteMany({}),
        workout_model_1.Workout.deleteMany({}),
        user_model_1.User.deleteMany({}),
    ]);
    const users = await user_model_1.User.insertMany([
        {
            name: 'Maya Chen',
            email: 'maya.chen@example.com',
            passwordHash: 'test-hash-maya',
        },
        {
            name: 'Diego Ramirez',
            email: 'diego.ramirez@example.com',
            passwordHash: 'test-hash-diego',
        },
        {
            name: 'Avery Johnson',
            email: 'avery.johnson@example.com',
            passwordHash: 'test-hash-avery',
        },
        {
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            passwordHash: 'test-hash-priya',
        },
    ]);
    const [maya, diego, avery, priya] = users;
    await team_model_1.Team.insertMany([
        {
            name: 'Morning Miles',
            owner: maya._id,
            members: [maya._id, diego._id],
        },
        {
            name: 'Core Crew',
            owner: priya._id,
            members: [priya._id, avery._id],
        },
    ]);
    await activity_model_1.Activity.insertMany([
        {
            user: maya._id,
            type: 'Running',
            durationMinutes: 42,
            caloriesBurned: 430,
            performedAt: new Date('2026-06-10T06:30:00.000Z'),
        },
        {
            user: diego._id,
            type: 'Cycling',
            durationMinutes: 55,
            caloriesBurned: 520,
            performedAt: new Date('2026-06-11T12:15:00.000Z'),
        },
        {
            user: avery._id,
            type: 'Strength Training',
            durationMinutes: 38,
            caloriesBurned: 310,
            performedAt: new Date('2026-06-12T18:00:00.000Z'),
        },
        {
            user: priya._id,
            type: 'Yoga',
            durationMinutes: 45,
            caloriesBurned: 180,
            performedAt: new Date('2026-06-13T07:45:00.000Z'),
        },
    ]);
    await leaderboard_model_1.Leaderboard.insertMany([
        { user: diego._id, points: 1280, rank: 1 },
        { user: maya._id, points: 1165, rank: 2 },
        { user: avery._id, points: 980, rank: 3 },
        { user: priya._id, points: 875, rank: 4 },
    ]);
    await workout_model_1.Workout.insertMany([
        {
            user: maya._id,
            title: 'Tempo Run Builder',
            description: 'Warm up for 10 minutes, run 20 minutes at tempo pace, then cool down easy.',
            suggestedForLevel: 'intermediate',
        },
        {
            user: diego._id,
            title: 'Hill Sprint Intervals',
            description: 'Complete eight short hill sprints with full recovery between efforts.',
            suggestedForLevel: 'advanced',
        },
        {
            user: avery._id,
            title: 'Full-Body Strength Circuit',
            description: 'Three rounds of squats, rows, pushups, lunges, and planks.',
            suggestedForLevel: 'intermediate',
        },
        {
            user: priya._id,
            title: 'Mobility Reset Flow',
            description: 'A low-impact flow focused on hips, shoulders, and gentle core activation.',
            suggestedForLevel: 'beginner',
        },
    ]);
    const counts = {
        users: await user_model_1.User.countDocuments(),
        teams: await team_model_1.Team.countDocuments(),
        activities: await activity_model_1.Activity.countDocuments(),
        leaderboard: await leaderboard_model_1.Leaderboard.countDocuments(),
        workouts: await workout_model_1.Workout.countDocuments(),
    };
    console.log('Seed complete:', counts);
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
