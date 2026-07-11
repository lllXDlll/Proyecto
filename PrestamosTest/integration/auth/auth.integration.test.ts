import request from 'supertest';
import app from '../helpers/app';
import { createUser, expiredToken, login, tokenFor } from '../helpers/auth';

describe('auth API integration', () => {
  it('logs in an active user and returns a JWT plus user profile', async () => {
    const user = await createUser({ usuario: 'auth-admin', rol: 'ADMINISTRADOR' });

    const response = await login(user.usuario, user.plainPassword);

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.usuario).toMatchObject({
      id: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
      rol: 'ADMINISTRADOR'
    });
  });

  it('rejects invalid password and unknown users', async () => {
    const user = await createUser();

    const invalidPassword = await login(user.usuario, 'bad-password');
    const unknownUser = await login('missing-user', 'Test123!');

    expect(invalidPassword.status).toBe(401);
    expect(unknownUser.status).toBe(401);
  });

  it('rejects inactive users and missing credentials', async () => {
    const inactive = await createUser({ activo: false });

    const inactiveResponse = await login(inactive.usuario, inactive.plainPassword);
    const missingFields = await request(app).post('/api/auth/login').send({ usuario: inactive.usuario });

    expect(inactiveResponse.status).toBe(401);
    expect(missingFields.status).toBe(400);
  });

  it('returns authenticated profile from /auth/me with a valid token', async () => {
    const user = await createUser({ rol: 'ADMINISTRADOR' });
    const token = tokenFor({ id: user.id, usuario: user.usuario, nombre: user.nombre, rol: user.rol });

    const response = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.authenticated).toBe(true);
    expect(response.body.user).toMatchObject({ id: user.id, usuario: user.usuario, rol: user.rol });
  });

  it('rejects missing, invalid, and expired JWTs on /auth/me', async () => {
    const missing = await request(app).get('/api/auth/me');
    const invalid = await request(app).get('/api/auth/me').set('Authorization', 'Bearer not-a-token');
    const expired = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${expiredToken()}`);

    expect(missing.status).toBe(401);
    expect(invalid.status).toBe(401);
    expect(expired.status).toBe(401);
  });
});
