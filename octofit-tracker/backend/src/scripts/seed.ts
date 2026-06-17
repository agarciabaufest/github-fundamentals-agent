import { connectDatabase, mongoose } from '../config/database';
import { Activity } from '../models/activity.model';
import { Leaderboard } from '../models/leaderboard.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { Workout } from '../models/workout.model';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    User.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  await Team.insertMany([
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

  await Activity.insertMany([
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

  await Leaderboard.insertMany([
    { user: diego._id, points: 1280, rank: 1 },
    { user: maya._id, points: 1165, rank: 2 },
    { user: avery._id, points: 980, rank: 3 },
    { user: priya._id, points: 875, rank: 4 },
  ]);

  await Workout.insertMany([
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
    users: await User.countDocuments(),
    teams: await Team.countDocuments(),
    activities: await Activity.countDocuments(),
    leaderboard: await Leaderboard.countDocuments(),
    workouts: await Workout.countDocuments(),
  };

  console.log('Seed complete:', counts);
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
