import { createLoan, listActiveLoans, listLoanHistory, returnLoan } from '../../../../backend/src/controllers/loan.controller';
import prisma from '../../../../backend/src/db';
import { createMockResponse } from '../../../helpers/http';

jest.mock('../../../../backend/src/db', () => ({
  __esModule: true,
  default: {
    user: { findUnique: jest.fn() },
    equipo: { findUnique: jest.fn(), update: jest.fn() },
    prestamo: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn(), findMany: jest.fn(), count: jest.fn() },
    $transaction: jest.fn()
  }
}));

const req = (overrides: Record<string, unknown>) => overrides as any;

describe('PrestamoServiceTests adapted to loan.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => callback({
      prestamo: {
        create: prisma.prestamo.create,
        update: prisma.prestamo.update
      },
      equipo: {
        update: prisma.equipo.update
      }
    }));
  });

  it('RegistrarPrestamo_SuccessfulRegistration_updatesEquipoAndReturnsDto', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, activo: true });
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 2, estado: 'DISPONIBLE' });
    (prisma.prestamo.create as jest.Mock).mockResolvedValue({ id: 3, estado: 'ACTIVO', usuarioId: 1, equipoId: 2 });
    const res = createMockResponse();

    await createLoan(req({ body: { usuarioId: 1, equipoId: 2 }, user: { id: 9 } }), res);

    expect(prisma.equipo.update).toHaveBeenCalledWith({ where: { id: 2 }, data: { estado: 'PRESTADO' } });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('RegistrarPrestamo_UsuarioNotFound_ThrowsKeyNotFoundException', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 2, estado: 'DISPONIBLE' });
    const res = createMockResponse();

    await createLoan(req({ body: { usuarioId: 1, equipoId: 2 } }), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('RegistrarPrestamo_UsuarioInactive_ThrowsInvalidOperationException', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, activo: false });
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 2, estado: 'DISPONIBLE' });
    const res = createMockResponse();

    await createLoan(req({ body: { usuarioId: 1, equipoId: 2 } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it.each(['MANTENIMIENTO', 'PRESTADO'])('RegistrarPrestamo_EquipoUnavailable_ThrowsInvalidOperationException for %s', async (estado) => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, activo: true });
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 2, estado });
    const res = createMockResponse();

    await createLoan(req({ body: { usuarioId: 1, equipoId: 2 } }), res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('RegistrarPrestamo_EquipoNotFound_ThrowsKeyNotFoundException', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, activo: true });
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue(null);
    const res = createMockResponse();

    await createLoan(req({ body: { usuarioId: 1, equipoId: 2 } }), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('RegistrarPrestamo_FechaDevolucionInvalid_ThrowsInvalidOperationException', async () => {
    const res = createMockResponse();

    await createLoan(req({ body: { usuarioId: 1, equipoId: 2, fechaDevolucionPrevista: 'not-a-date' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('GetActiveLoansAsync_ReturnsOnlyActive', async () => {
    (prisma.prestamo.findMany as jest.Mock).mockResolvedValue([{ id: 1, estado: 'ACTIVO' }]);
    (prisma.prestamo.count as jest.Mock).mockResolvedValue(1);
    const res = createMockResponse();

    await listActiveLoans(req({ query: {} }), res);

    expect(prisma.prestamo.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ estado: 'ACTIVO' })
    }));
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('RegistrarDevolucion_AlreadyFinalized_ThrowsInvalidOperationException', async () => {
    (prisma.prestamo.findUnique as jest.Mock).mockResolvedValue({ id: 1, estado: 'DEVUELTO', equipoId: 2 });
    const res = createMockResponse();

    await returnLoan(req({ params: { id: '1' }, body: {} }), res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('RegistrarDevolucion_Successful_ChangesEstadoPrestamoAndEquipo', async () => {
    (prisma.prestamo.findUnique as jest.Mock).mockResolvedValue({ id: 1, estado: 'ACTIVO', equipoId: 2 });
    (prisma.prestamo.update as jest.Mock).mockResolvedValue({ id: 1, estado: 'DEVUELTO', equipoId: 2 });
    const res = createMockResponse();

    await returnLoan(req({ params: { id: '1' }, body: {}, user: { id: 9 } }), res);

    expect(prisma.prestamo.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ estado: 'DEVUELTO' })
    }));
    expect(prisma.equipo.update).toHaveBeenCalledWith({ where: { id: 2 }, data: { estado: 'DISPONIBLE' } });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('RegistrarDevolucion_PrestamoNotFound_ThrowsKeyNotFoundException', async () => {
    (prisma.prestamo.findUnique as jest.Mock).mockResolvedValue(null);
    const res = createMockResponse();

    await returnLoan(req({ params: { id: '99' }, body: {} }), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('GetAll_ReturnsAllPrestamos', async () => {
    (prisma.prestamo.findMany as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
    (prisma.prestamo.count as jest.Mock).mockResolvedValue(2);
    const res = createMockResponse();

    await listLoanHistory(req({ query: {} }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].loans).toHaveLength(2);
  });
});
