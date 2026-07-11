import { Response } from 'express';
import prisma from '../db';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const EQUIPMENT_STATUSES = ['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO'];

const emptyEquipmentCounts = () => EQUIPMENT_STATUSES.reduce((acc, status) => {
  acc[status] = 0;
  return acc;
}, {} as Record<string, number>);

export const getDashboardSummary = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const [totalEquipment, equipmentGroups, totalUsers, activeLoans, completedLoans, totalLoans] = await Promise.all([
      prisma.equipo.count(),
      prisma.equipo.groupBy({
        by: ['estado'],
        _count: { _all: true }
      }),
      prisma.user.count(),
      prisma.prestamo.count({ where: { estado: 'ACTIVO' } }),
      prisma.prestamo.count({ where: { estado: 'DEVUELTO' } }),
      prisma.prestamo.count()
    ]);

    const equipmentByStatus = emptyEquipmentCounts();
    equipmentGroups.forEach((group) => {
      equipmentByStatus[group.estado] = group._count._all;
    });

    return res.status(200).json({
      equipment: {
        total: totalEquipment,
        byStatus: equipmentByStatus
      },
      users: {
        total: totalUsers
      },
      loans: {
        total: totalLoans,
        active: activeLoans,
        completed: completedLoans
      }
    });
  } catch (error) {
    console.error('Error loading dashboard summary:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
