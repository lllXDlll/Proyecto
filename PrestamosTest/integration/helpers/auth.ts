import request from 'supertest';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import app from './app';
import { prisma } from './prisma';
import { userData } from './factories';

export const jwtSecret = () => process.env.JWT_SECRET || 'integration-test-secret';

export const createUser = async (overrides: Partial<{ usuario: string; password: string; nombre: string; rol: string; activo: boolean }> = {}) => {
  const data = userData(overrides);
  const user = await prisma.user.create({
    data: {
      usuario: data.usuario,
      password: await bcrypt.hash(data.password, 10),
      nombre: data.nombre,
      rol: data.rol,
      activo: data.activo
    }
  });

  return { ...user, plainPassword: data.password };
};

export const login = async (usuario: string, password: string) =>
  request(app).post('/api/auth/login').send({ usuario, password });

export const tokenFor = (payload: { id: number; usuario: string; nombre: string; rol: string }, options: jwt.SignOptions = {}) =>
  jwt.sign(payload, jwtSecret(), { expiresIn: '8h', ...options });

export const adminToken = async () => {
  const admin = await createUser({ usuario: 'admin-it', rol: 'ADMINISTRADOR', nombre: 'Integration Admin' });
  return { user: admin, token: tokenFor({ id: admin.id, usuario: admin.usuario, nombre: admin.nombre, rol: admin.rol }) };
};

export const regularToken = async () => {
  const user = await createUser({ rol: 'USUARIO' });
  return { user, token: tokenFor({ id: user.id, usuario: user.usuario, nombre: user.nombre, rol: user.rol }) };
};

export const expiredToken = () =>
  jwt.sign(
    {
      id: 999,
      usuario: 'expired',
      nombre: 'Expired User',
      rol: 'ADMINISTRADOR',
      exp: Math.floor(Date.now() / 1000) - 60
    },
    jwtSecret()
  );
