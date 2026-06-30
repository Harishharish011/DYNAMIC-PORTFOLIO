import 'dotenv/config';
import mongoose from 'mongoose';

import { seedBlogs } from './blogSeed';
import { seedGithub } from './githubSeed';
import { seedProjects } from './projectSeed';

async function connectForSeed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri?.trim()) {
    throw new Error('MONGODB_URI is not set');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoUri.trim(), {
    serverSelectionTimeoutMS: 10000,
  });
}

async function runSeed() {
  try {
    await connectForSeed();

    await seedProjects();
    console.log('Projects seeded ✔');

    await seedBlogs();
    console.log('Blogs seeded ✔');

    await seedGithub();
    console.log('GitHub seeded ✔');

    console.log('Database seeding completed successfully ✔');
  } finally {
    await mongoose.disconnect();
  }
}

runSeed().catch((error) => {
  console.error('Database seeding failed:', error);
  process.exit(1);
});

