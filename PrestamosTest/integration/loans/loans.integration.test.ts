import request from 'supertest';
import app from '../helpers/app';
import { adminToken, createUser } from '../helpers/auth';
import { tomorrowIso } from '../helpers/factories';
import { prisma } from '../helpers/prisma';
import { createActiveLoan, createEquipment } from '../helpers/seed';

describe('loans API integration', () => {
  it('creates a loan and marks equipment as PRESTADO', async () => {
    const { user: admin, token } = await adminToken();
    const borrower = await createUser({ rol: 'USUARIO' });
    const equipment = await createEquipment();

    const response = await request(app)
      .post('/api/loans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: borrower.id,
        equipoId: equipment.id,
        fechaDevolucionPrevista: tomorrowIso(),
        observacionesPrestamo: 'Integration loan'
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ estado: 'ACTIVO', usuarioId: borrower.id, equipoId: equipment.id, registradoPorId: admin.id });

    const persistedEquipment = await prisma.equipo.findUniqueOrThrow({ where: { id: equipment.id } });
    expect(persistedEquipment.estado).toBe('PRESTADO');
  });

  it('rejects invalid create loan requests and unavailable resources', async () => {
    const { token } = await adminToken();
    const inactive = await createUser({ activo: false });
    const active = await createUser({ activo: true });
    const maintenance = await createEquipment({ estado: 'MANTENIMIENTO' });

    const missingIds = await request(app).post('/api/loans').set('Authorization', `Bearer ${token}`).send({});
    const invalidDate = await request(app).post('/api/loans').set('Authorization', `Bearer ${token}`).send({ usuarioId: inactive.id, equipoId: maintenance.id, fechaDevolucionPrevista: 'not-a-date' });
    const missingUser = await request(app).post('/api/loans').set('Authorization', `Bearer ${token}`).send({ usuarioId: 9999, equipoId: maintenance.id });
    const inactiveUser = await request(app).post('/api/loans').set('Authorization', `Bearer ${token}`).send({ usuarioId: inactive.id, equipoId: maintenance.id });
    const missingEquipment = await request(app).post('/api/loans').set('Authorization', `Bearer ${token}`).send({ usuarioId: active.id, equipoId: 9999 });

    expect(missingIds.status).toBe(400);
    expect(invalidDate.status).toBe(400);
    expect(missingUser.status).toBe(404);
    expect(inactiveUser.status).toBe(400);
    expect(missingEquipment.status).toBe(404);
  });

  it('rejects loans for equipment that is not available', async () => {
    const { token } = await adminToken();
    const borrower = await createUser({ rol: 'USUARIO' });
    const maintenance = await createEquipment({ estado: 'MANTENIMIENTO' });

    const response = await request(app)
      .post('/api/loans')
      .set('Authorization', `Bearer ${token}`)
      .send({ usuarioId: borrower.id, equipoId: maintenance.id });

    expect(response.status).toBe(409);
  });

  it('returns a loan and marks equipment as DISPONIBLE', async () => {
    const { token } = await adminToken();
    const { loan, equipment } = await createActiveLoan();

    const response = await request(app)
      .put(`/api/loans/${loan.id}/return`)
      .set('Authorization', `Bearer ${token}`)
      .send({ observacionesDevolucion: 'Returned by integration test' });

    expect(response.status).toBe(200);
    expect(response.body.estado).toBe('DEVUELTO');
    expect(response.body.observacionesDevolucion).toBe('Returned by integration test');

    const persistedEquipment = await prisma.equipo.findUniqueOrThrow({ where: { id: equipment.id } });
    expect(persistedEquipment.estado).toBe('DISPONIBLE');
  });

  it('rejects repeated returns, invalid ids, and missing loans', async () => {
    const { token } = await adminToken();
    const { loan } = await createActiveLoan();

    const firstReturn = await request(app).put(`/api/loans/${loan.id}/return`).set('Authorization', `Bearer ${token}`).send({});
    const secondReturn = await request(app).put(`/api/loans/${loan.id}/return`).set('Authorization', `Bearer ${token}`).send({});
    const invalidId = await request(app).put('/api/loans/not-number/return').set('Authorization', `Bearer ${token}`).send({});
    const missing = await request(app).put('/api/loans/9999/return').set('Authorization', `Bearer ${token}`).send({});

    expect(firstReturn.status).toBe(200);
    expect(secondReturn.status).toBe(409);
    expect(invalidId.status).toBe(400);
    expect(missing.status).toBe(404);
  });

  it('lists active loans and history with filters', async () => {
    const { token } = await adminToken();
    const { loan, borrower, equipment } = await createActiveLoan();

    const active = await request(app)
      .get('/api/loans/active')
      .query({ search: equipment.codigoInventario, page: 1, limit: 5 })
      .set('Authorization', `Bearer ${token}`);
    const history = await request(app)
      .get('/api/loans/history')
      .query({ estado: 'ACTIVO', usuarioId: borrower.id, equipoId: equipment.id })
      .set('Authorization', `Bearer ${token}`);
    const invalidStatus = await request(app).get('/api/loans/history').query({ estado: 'INVALID' }).set('Authorization', `Bearer ${token}`);
    const invalidUser = await request(app).get('/api/loans/history').query({ usuarioId: 'bad' }).set('Authorization', `Bearer ${token}`);

    expect(active.status).toBe(200);
    expect(active.body.loans[0].id).toBe(loan.id);
    expect(history.status).toBe(200);
    expect(history.body.loans).toHaveLength(1);
    expect(invalidStatus.status).toBe(400);
    expect(invalidUser.status).toBe(400);
  });
});
