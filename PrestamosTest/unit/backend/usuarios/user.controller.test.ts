import * as bcrypt from 'bcryptjs';
import { createUser, listUsers, updateUser } from '../../../../backend/src/controllers/user.controller';
import prisma from '../../../../backend/src/db';
import { createMockResponse } from '../../../helpers/http';

jest.mock('../../../../backend/src/db', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn()
    }
  }
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn()
}));

const req = (overrides: Record<string, unknown>) => overrides as any;

describe('UsuarioServiceTests adapted to user.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('CreateAsync_DuplicateCorreo_Throws', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    const res = createMockResponse();

    await createUser(req({ body: { usuario: 'admin', password: 'pw', nombre: 'Admin' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('CreateAsync_Success_ReturnsDto', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('pw_hash');
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 2, usuario: 'user', nombre: 'User', rol: 'USUARIO', activo: true });
    const res = createMockResponse();

    await createUser(req({ body: { usuario: 'user', password: 'pw', nombre: 'User' } }), res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json.mock.calls[0][0].usuario).toBe('user');
  });

  it('UpdateAsync_ChangeCorreoToExisting_Throws', async () => {
    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: 1, usuario: 'old', nombre: 'Old', rol: 'USUARIO', activo: true })
      .mockResolvedValueOnce({ id: 2, usuario: 'taken' });
    const res = createMockResponse();

    await updateUser(req({ params: { id: '1' }, body: { usuario: 'taken' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('DeleteAsync_NotFound_ReturnsFalse via update not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const res = createMockResponse();

    await updateUser(req({ params: { id: '99' }, body: { activo: false } }), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('GetAllAsync_ReturnsAllUsuarios', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([{ id: 1, usuario: 'admin' }]);
    (prisma.user.count as jest.Mock).mockResolvedValue(1);
    const res = createMockResponse();

    await listUsers(req({ query: { page: '1', limit: '10' } }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].users).toHaveLength(1);
  });

  it('DeleteAsync_Existing_ReturnsTrue as soft-delete accepted', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 3, usuario: 'u', nombre: 'User', rol: 'USUARIO', activo: true });
    (prisma.user.update as jest.Mock).mockResolvedValue({ id: 3, usuario: 'u', nombre: 'User', rol: 'USUARIO', activo: false });
    const res = createMockResponse();

    await updateUser(req({ params: { id: '3' }, body: { activo: false } }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].activo).toBe(false);
  });
});
