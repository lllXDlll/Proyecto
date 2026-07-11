import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { login } from '../../../../backend/src/controllers/auth.controller';
import prisma from '../../../../backend/src/db';
import { createMockResponse } from '../../../helpers/http';

jest.mock('../../../../backend/src/db', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn()
    }
  }
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

const req = (body: Record<string, unknown>) => ({ body } as any);

describe('AuthServiceTests adapted to auth.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('LoginAsync_UserNotFound_ReturnsNull', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const res = createMockResponse();

    await login(req({ usuario: 'missing', password: 'x' }), res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error');
  });

  it('LoginAsync_UserInactive_ReturnsNull', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ activo: false });
    const res = createMockResponse();

    await login(req({ usuario: 'inactive', password: 'x' }), res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('LoginAsync_InvalidPassword_ReturnsNull', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ activo: true, password: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    const res = createMockResponse();

    await login(req({ usuario: 'admin', password: 'bad' }), res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('LoginAsync_TokenGenerationThrows_ReturnsNull', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, usuario: 'admin', nombre: 'Admin', rol: 'ADMINISTRADOR', activo: true, password: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockImplementation(() => {
      throw new Error('token failed');
    });
    const res = createMockResponse();

    await login(req({ usuario: 'admin', password: 'ok' }), res);

    expect(res.status).toHaveBeenCalledWith(500);
    consoleError.mockRestore();
  });

  it('LoginAsync_Success_ReturnsTokenAndUser', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, usuario: 'admin', nombre: 'Admin', rol: 'ADMINISTRADOR', activo: true, password: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token-123');
    const res = createMockResponse();

    await login(req({ usuario: 'admin', password: 'ok' }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: 'token-123',
      usuario: {
        id: 1,
        usuario: 'admin',
        nombre: 'Admin',
        rol: 'ADMINISTRADOR'
      }
    });
  });
});
