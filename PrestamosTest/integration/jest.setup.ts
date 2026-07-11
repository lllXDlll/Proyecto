import fs from 'fs';

const envFile = 'C:/tmp/proyecto-integration-env.json';
if (fs.existsSync(envFile)) {
  const env = JSON.parse(fs.readFileSync(envFile, 'utf8'));
  process.env.DATABASE_URL = env.DATABASE_URL;
  process.env.JWT_SECRET = env.JWT_SECRET;
}

const { cleanupDatabase } = require('./helpers/cleanup');
const { prisma } = require('./helpers/prisma');

beforeEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
