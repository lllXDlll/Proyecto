import type { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRole, AuthenticatedRequest } from '../../../../backend/src/middlewares/auth.middleware';

const createResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
  return res as unknown as Response & { status: jest.Mock; json: jest.Mock };
};

describe('auth middleware', () => {
  it('rejects requests without bearer token', () => {
    const req = { headers: {} } as AuthenticatedRequest;
    const res = createResponse();
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches decoded user for valid token', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = jwt.sign({ id: 1, usuario: 'admin', nombre: 'Admin', rol: 'ADMINISTRADOR' }, 'test-secret');
    const req = { headers: { authorization: `Bearer ${token}` } } as AuthenticatedRequest;
    const res = createResponse();
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(req.user?.rol).toBe('ADMINISTRADOR');
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('blocks users without an allowed role', () => {
    const req = { user: { id: 2, usuario: 'user', nombre: 'User', rol: 'USUARIO' } } as AuthenticatedRequest;
    const res = createResponse();
    const next = jest.fn();

    authorizeRole(['ADMINISTRADOR'])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
