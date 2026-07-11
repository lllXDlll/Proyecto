import { getEquipmentStatusReport, getLoanReport, getLoanStats } from '../../../../backend/src/controllers/report.controller';
import prisma from '../../../../backend/src/db';
import { createMockResponse } from '../../../helpers/http';

jest.mock('../../../../backend/src/db', () => ({
  __esModule: true,
  default: {
    equipo: { groupBy: jest.fn(), findMany: jest.fn(), count: jest.fn() },
    prestamo: { count: jest.fn(), findMany: jest.fn() }
  }
}));

const req = (overrides: Record<string, unknown>) => overrides as any;

describe('dashboard/report validation tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects invalid equipment status report filter', async () => {
    const res = createMockResponse();

    await getEquipmentStatusReport(req({ query: { estado: 'ROTO' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('rejects invalid loan stats date range', async () => {
    const res = createMockResponse();

    await getLoanStats(req({ query: { from: '2026-12-01', to: '2026-01-01' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns loan report rows with relations', async () => {
    (prisma.prestamo.findMany as jest.Mock).mockResolvedValue([{ id: 1, usuario: { nombre: 'Admin' }, equipo: { codigoInventario: 'EQ-1' } }]);
    (prisma.prestamo.count as jest.Mock).mockResolvedValue(1);
    const res = createMockResponse();

    await getLoanReport(req({ query: {} }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].loans[0].usuario.nombre).toBe('Admin');
  });
});
