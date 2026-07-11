import request from 'supertest';
import app from '../helpers/app';
import { adminToken } from '../helpers/auth';
import { prisma } from '../helpers/prisma';
import { createActiveLoan, createEquipment } from '../helpers/seed';

describe('dashboard API integration', () => {
  it('returns dashboard counts from real database state', async () => {
    const { token } = await adminToken();
    await createEquipment({ estado: 'DISPONIBLE' });
    await createEquipment({ estado: 'MANTENIMIENTO' });
    const { loan } = await createActiveLoan();
    await prisma.prestamo.update({ where: { id: loan.id }, data: { estado: 'DEVUELTO', fechaDevolucionReal: new Date() } });

    const response = await request(app).get('/api/dashboard/summary').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.equipment.total).toBe(3);
    expect(response.body.equipment.byStatus.DISPONIBLE).toBe(1);
    expect(response.body.equipment.byStatus.MANTENIMIENTO).toBe(1);
    expect(response.body.equipment.byStatus.PRESTADO).toBe(1);
    expect(response.body.users.total).toBe(3);
    expect(response.body.loans).toMatchObject({ total: 1, active: 0, completed: 1 });
  });

  it('requires authentication', async () => {
    const response = await request(app).get('/api/dashboard/summary');

    expect(response.status).toBe(401);
  });
});
