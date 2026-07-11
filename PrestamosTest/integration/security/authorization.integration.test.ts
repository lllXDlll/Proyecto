import request from 'supertest';
import app from '../helpers/app';
import { adminToken, expiredToken, regularToken } from '../helpers/auth';

describe('authorization integration', () => {
  it('exposes health check without authentication', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('requires JWT for protected endpoints', async () => {
    const endpoints = [
      '/api/users',
      '/api/equipment',
      '/api/loans/active',
      '/api/dashboard/summary',
      '/api/reports/equipment/status'
    ];

    for (const endpoint of endpoints) {
      const response = await request(app).get(endpoint);
      expect(response.status).toBe(401);
    }
  });

  it('rejects invalid and expired JWTs', async () => {
    const invalid = await request(app).get('/api/equipment').set('Authorization', 'Bearer invalid-token');
    const expired = await request(app).get('/api/equipment').set('Authorization', `Bearer ${expiredToken()}`);

    expect(invalid.status).toBe(401);
    expect(expired.status).toBe(401);
  });

  it('rejects non-admin users from admin-only routes', async () => {
    const { token } = await regularToken();

    const users = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
    const createEquipment = await request(app).post('/api/equipment').set('Authorization', `Bearer ${token}`).send({});
    const loans = await request(app).get('/api/loans/active').set('Authorization', `Bearer ${token}`);
    const loanStats = await request(app).get('/api/reports/loans/stats').set('Authorization', `Bearer ${token}`);

    expect(users.status).toBe(403);
    expect(createEquipment.status).toBe(403);
    expect(loans.status).toBe(403);
    expect(loanStats.status).toBe(403);
  });

  it('allows admin-only routes for administrators', async () => {
    const { token } = await adminToken();

    const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
