import { prisma } from './prisma';
import { equipmentData, tomorrowIso } from './factories';
import { createUser } from './auth';

export const createEquipment = async (overrides: Partial<{ nombre: string; descripcion: string | null; codigoInventario: string; estado: string }> = {}) =>
  prisma.equipo.create({ data: equipmentData(overrides) });

export const createActiveLoan = async () => {
  const admin = await createUser({ rol: 'ADMINISTRADOR' });
  const borrower = await createUser({ rol: 'USUARIO' });
  const equipment = await createEquipment();

  const loan = await prisma.prestamo.create({
    data: {
      usuarioId: borrower.id,
      equipoId: equipment.id,
      fechaDevolucionPrevista: new Date(tomorrowIso()),
      estado: 'ACTIVO',
      registradoPorId: admin.id
    },
    include: { usuario: true, equipo: true }
  });

  await prisma.equipo.update({ where: { id: equipment.id }, data: { estado: 'PRESTADO' } });

  return { admin, borrower, equipment, loan };
};
