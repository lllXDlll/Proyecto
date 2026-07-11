import { PrismaClient } from '../src/generated/prisma/index';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUser = 'admin';
  const adminPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { usuario: adminUser }
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        usuario: adminUser,
        password: hashedPassword,
        nombre: 'Administrador Principal',
        rol: 'ADMINISTRADOR',
        activo: true
      }
    });
    console.log(`Initial administrator seeded successfully: usuario='${adminUser}', password='${adminPassword}'`);
  } else {
    console.log('Administrator already exists in database, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
