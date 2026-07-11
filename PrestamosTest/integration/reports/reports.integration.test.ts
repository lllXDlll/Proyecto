import request from 'supertest';
import app from '../helpers/app';
import { adminToken, regularToken } from '../helpers/auth';
import { prisma } from '../helpers/prisma';
import { createActiveLoan, createEquipment } from '../helpers/seed';

describe('reports API integration', () => {
  it('returns equipment status report with filters and counts', async () => {
    const { token } = await adminToken();
    await createEquipment({ codigoInventario: 'REPORT-AVAILABLE', estado: 'DISPONIBLE' });
    await createEquipment({ codigoInventario: 'REPORT-INACTIVE', estado: 'INACTIVO' });

    const response = await request(app)
      .get('/api/reports/equipment/status')
      .query({ estado: 'DISPONIBLE', page: 1, limit: 10 })
      .set('Authorization', `Bearer ${token}`);
    const invalid = await request(app).get('/api/reports/equipment/status').query({ estado: 'BAD' }).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.byStatus.DISPONIBLE).toBe(1);
    expect(response.body.byStatus.INACTIVO).toBe(1);
    expect(response.body.equipment).toHaveLength(1);
    expect(invalid.status).toBe(400);
  });

  it('allows regular users to read equipment status report', async () => {
    const { token } = await regularToken();

    const response = await request(app).get('/api/reports/equipment/status').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('returns loan stats and validates date ranges', async () => {
    const { token } = await adminToken();
    const { loan } = await createActiveLoan();
    await prisma.prestamo.update({ where: { id: loan.id }, data: { estado: 'DEVUELTO', fechaDevolucionReal: new Date() } });

    const stats = await request(app).get('/api/reports/loans/stats').set('Authorization', `Bearer ${token}`);
    const invalidDate = await request(app).get('/api/reports/loans/stats').query({ from: 'bad-date' }).set('Authorization', `Bearer ${token}`);
    const invertedRange = await request(app).get('/api/reports/loans/stats').query({ from: '2030-01-02', to: '2030-01-01' }).set('Authorization', `Bearer ${token}`);

    expect(stats.status).toBe(200);
    expect(stats.body).toMatchObject({ total: 1, active: 0, completed: 1 });
    expect(invalidDate.status).toBe(400);
    expect(invertedRange.status).toBe(400);
  });

  it('returns loan report with filters and rejects invalid parameters', async () => {
    const { token } = await adminToken();
    const { borrower, equipment } = await createActiveLoan();

    const report = await request(app)
      .get('/api/reports/loans')
      .query({ estado: 'ACTIVO', usuarioId: borrower.id, equipoId: equipment.id, page: 1, limit: 5 })
      .set('Authorization', `Bearer ${token}`);
    const invalidStatus = await request(app).get('/api/reports/loans').query({ estado: 'BAD' }).set('Authorization', `Bearer ${token}`);
    const invalidUser = await request(app).get('/api/reports/loans').query({ usuarioId: 'bad' }).set('Authorization', `Bearer ${token}`);

    expect(report.status).toBe(200);
    expect(report.body.loans).toHaveLength(1);
    expect(report.body.loans[0].equipo.codigoInventario).toBe(equipment.codigoInventario);
    expect(invalidStatus.status).toBe(400);
    expect(invalidUser.status).toBe(400);
  });

  it('requires admin role for loan reports', async () => {
    const { token } = await regularToken();

    const stats = await request(app).get('/api/reports/loans/stats').set('Authorization', `Bearer ${token}`);
    const report = await request(app).get('/api/reports/loans').set('Authorization', `Bearer ${token}`);

    expect(stats.status).toBe(403);
    expect(report.status).toBe(403);
  });
});
