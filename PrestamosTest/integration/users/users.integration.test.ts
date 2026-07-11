import request from 'supertest';
import app from '../helpers/app';
import { adminToken, createUser, regularToken } from '../helpers/auth';
import { prisma } from '../helpers/prisma';

describe('users API integration', () => {
  it('creates a user and persists a hashed password', async () => {
    const { token } = await adminToken();

    const response = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ usuario: 'new-user', password: 'Secret123!', nombre: 'New User', rol: 'USUARIO' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ usuario: 'new-user', nombre: 'New User', rol: 'USUARIO', activo: true });
    expect(response.body.password).toBeUndefined();

    const persisted = await prisma.user.findUniqueOrThrow({ where: { usuario: 'new-user' } });
    expect(persisted.password).not.toBe('Secret123!');
  });

  it('rejects duplicate users and required field validation errors', async () => {
    const { token } = await adminToken();
    await createUser({ usuario: 'duplicate-user' });

    const duplicate = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ usuario: 'duplicate-user', password: 'Secret123!', nombre: 'Duplicate' });
    const missing = await request(app).post('/api/users').set('Authorization', `Bearer ${token}`).send({ usuario: 'missing-fields' });

    expect(duplicate.status).toBe(400);
    expect(missing.status).toBe(400);
  });

  it('lists users with pagination and search', async () => {
    const { token } = await adminToken();
    await createUser({ usuario: 'ana-user', nombre: 'Ana Tester' });
    await createUser({ usuario: 'bob-user', nombre: 'Bob Tester' });

    const response = await request(app)
      .get('/api/users')
      .query({ page: 1, limit: 1, search: 'Ana' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(1);
    expect(response.body.users[0].usuario).toBe('ana-user');
    expect(response.body.meta.total).toBe(1);
  });

  it('updates user data and active status', async () => {
    const { token } = await adminToken();
    const target = await createUser({ usuario: 'target-user' });

    const response = await request(app)
      .put(`/api/users/${target.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nombre: 'Updated Name', usuario: 'target-updated', rol: 'ADMINISTRADOR', activo: false });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ usuario: 'target-updated', nombre: 'Updated Name', rol: 'ADMINISTRADOR', activo: false });
  });

  it('rejects invalid id, missing user, duplicate update, and self-deactivation', async () => {
    const { user: admin, token } = await adminToken();
    const first = await createUser({ usuario: 'first-user' });
    const second = await createUser({ usuario: 'second-user' });

    const invalidId = await request(app).put('/api/users/not-number').set('Authorization', `Bearer ${token}`).send({});
    const missing = await request(app).put('/api/users/9999').set('Authorization', `Bearer ${token}`).send({});
    const duplicate = await request(app).put(`/api/users/${first.id}`).set('Authorization', `Bearer ${token}`).send({ usuario: second.usuario });
    const selfDeactivate = await request(app).put(`/api/users/${admin.id}`).set('Authorization', `Bearer ${token}`).send({ activo: false });

    expect(invalidId.status).toBe(400);
    expect(missing.status).toBe(404);
    expect(duplicate.status).toBe(400);
    expect(selfDeactivate.status).toBe(400);
  });

  it('requires administrator role', async () => {
    const { token } = await regularToken();

    const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});
