import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import app from '../../../backend/src/app';

describe('protected API routes', () => {
  it('exposes health check without authentication', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('rejects equipment inventory without JWT', async () => {
    const response = await request(app).get('/api/equipment');

    expect(response.status).toBe(401);
  });

  it('rejects administrator-only user management for non-admin JWT before controller logic', async () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = jwt.sign({ id: 9, usuario: 'regular', nombre: 'Regular', rol: 'USUARIO' }, 'test-secret');

    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});
