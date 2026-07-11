import { prisma } from './prisma';

export const cleanupDatabase = async () => {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "prestamos", "equipos", "usuarios" RESTART IDENTITY CASCADE');
};
