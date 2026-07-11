import * as dotenv from 'dotenv';
import app from './app';
import prisma from './db';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Database connection verification & server start
async function startServer() {
  try {
    // Verify DB connection
    await prisma.$connect();
    console.log('Successfully connected to database with Prisma ORM.');

    app.listen(PORT, () => {
      console.log(`Backend server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize application database connection:', error);
    process.exit(1);
  }
}

startServer();
