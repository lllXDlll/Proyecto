import request from 'supertest';
import app from '../helpers/app';
import { adminToken, regularToken } from '../helpers/auth';
import { equipmentData } from '../helpers/factories';
import { prisma } from '../helpers/prisma';
import { createEquipment } from '../helpers/seed';

describe('equipment API integration', () => {
  it('creates equipment with DISPONIBLE status', async () => {
    const { token } = await adminToken();
    const payload = equipmentData({ codigoInventario: 'EQ-001' });

    const response = await request(app).post('/api/equipment').set('Authorization', `Bearer ${token}`).send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ codigoInventario: 'EQ-001', estado: 'DISPONIBLE' });

    const persisted = await prisma.equipo.findUniqueOrThrow({ where: { codigoInventario: 'EQ-001' } });
    expect(persisted.estado).toBe('DISPONIBLE');
  });

  it('rejects duplicate code and missing required fields', async () => {
    const { token } = await adminToken();
    await createEquipment({ codigoInventario: 'DUP-EQ' });

    const duplicate = await request(app).post('/api/equipment').set('Authorization', `Bearer ${token}`).send(equipmentData({ codigoInventario: 'DUP-EQ' }));
    const missing = await request(app).post('/api/equipment').set('Authorization', `Bearer ${token}`).send({ nombre: '' });

    expect(duplicate.status).toBe(409);
    expect(missing.status).toBe(400);
  });

  it('lists equipment with search, status filter, and pagination', async () => {
    const { token } = await adminToken();
    await createEquipment({ nombre: 'Laptop Alpha', codigoInventario: 'ALPHA', estado: 'DISPONIBLE' });
    await createEquipment({ nombre: 'Laptop Beta', codigoInventario: 'BETA', estado: 'MANTENIMIENTO' });

    const response = await request(app)
      .get('/api/equipment')
      .query({ page: 1, limit: 1, search: 'Alpha', estado: 'DISPONIBLE' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.equipment).toHaveLength(1);
    expect(response.body.equipment[0].codigoInventario).toBe('ALPHA');
    expect(response.body.meta.total).toBe(1);
  });

  it('rejects invalid status filters', async () => {
    const { token } = await adminToken();

    const response = await request(app).get('/api/equipment').query({ estado: 'BROKEN' }).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('updates equipment and validates conflicts', async () => {
    const { token } = await adminToken();
    const first = await createEquipment({ codigoInventario: 'FIRST' });
    const second = await createEquipment({ codigoInventario: 'SECOND' });

    const updated = await request(app)
      .put(`/api/equipment/${first.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombre: 'Updated Equipment', codigoInventario: 'FIRST-UPDATED', estado: 'MANTENIMIENTO' });
    const conflict = await request(app).put(`/api/equipment/${first.id}`).set('Authorization', `Bearer ${token}`).send({ codigoInventario: second.codigoInventario });
    const invalidStatus = await request(app).put(`/api/equipment/${first.id}`).set('Authorization', `Bearer ${token}`).send({ estado: 'INVALID' });
    const missing = await request(app).put('/api/equipment/9999').set('Authorization', `Bearer ${token}`).send({});
    const invalidId = await request(app).put('/api/equipment/not-number').set('Authorization', `Bearer ${token}`).send({});

    expect(updated.status).toBe(200);
    expect(updated.body).toMatchObject({ codigoInventario: 'FIRST-UPDATED', estado: 'MANTENIMIENTO' });
    expect(conflict.status).toBe(409);
    expect(invalidStatus.status).toBe(400);
    expect(missing.status).toBe(404);
    expect(invalidId.status).toBe(400);
  });

  it('allows regular users to list but not create equipment', async () => {
    const { token } = await regularToken();

    const list = await request(app).get('/api/equipment').set('Authorization', `Bearer ${token}`);
    const create = await request(app).post('/api/equipment').set('Authorization', `Bearer ${token}`).send(equipmentData());

    expect(list.status).toBe(200);
    expect(create.status).toBe(403);
  });
});
