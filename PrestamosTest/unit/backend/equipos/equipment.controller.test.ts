import { createEquipment, listEquipment, updateEquipment } from '../../../../backend/src/controllers/equipment.controller';
import prisma from '../../../../backend/src/db';
import { createMockResponse } from '../../../helpers/http';

jest.mock('../../../../backend/src/db', () => ({
  __esModule: true,
  default: {
    equipo: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn()
    }
  }
}));

const req = (overrides: Record<string, unknown>) => overrides as any;

describe('EquipoServiceTests adapted to equipment.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('CreateAsync_DuplicateCode_Throws', async () => {
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    const res = createMockResponse();

    await createEquipment(req({ body: { nombre: 'Laptop', codigoInventario: 'EQ-1' } }), res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('CreateAsync_Succeeds_ReturnsDto with Disponible status', async () => {
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.equipo.create as jest.Mock).mockResolvedValue({ id: 1, nombre: 'Laptop', codigoInventario: 'EQ-1', estado: 'DISPONIBLE' });
    const res = createMockResponse();

    await createEquipment(req({ body: { nombre: 'Laptop', codigoInventario: 'EQ-1' } }), res);

    expect(prisma.equipo.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ estado: 'DISPONIBLE' })
    }));
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('UpdateAsync_ParseEstadoInvalid_DefaultsToDisponible adapted as validation error', async () => {
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 1, nombre: 'Laptop', codigoInventario: 'EQ-1', estado: 'DISPONIBLE' });
    const res = createMockResponse();

    await updateEquipment(req({ params: { id: '1' }, body: { estado: 'INVALIDO' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('UpdateAsync_ValidEstado_ParsesToEnum', async () => {
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 1, nombre: 'Laptop', codigoInventario: 'EQ-1', estado: 'DISPONIBLE' });
    (prisma.equipo.update as jest.Mock).mockResolvedValue({ id: 1, estado: 'MANTENIMIENTO' });
    const res = createMockResponse();

    await updateEquipment(req({ params: { id: '1' }, body: { estado: 'mantenimiento' } }), res);

    expect(prisma.equipo.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ estado: 'MANTENIMIENTO' })
    }));
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('DeleteAsync_RemovesAndReturnsTrue adapted as soft status change', async () => {
    (prisma.equipo.findUnique as jest.Mock).mockResolvedValue({ id: 1, nombre: 'Laptop', codigoInventario: 'EQ-1', estado: 'DISPONIBLE' });
    (prisma.equipo.update as jest.Mock).mockResolvedValue({ id: 1, estado: 'INACTIVO' });
    const res = createMockResponse();

    await updateEquipment(req({ params: { id: '1' }, body: { estado: 'INACTIVO' } }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].estado).toBe('INACTIVO');
  });

  it('GetAllAsync filters by status', async () => {
    (prisma.equipo.findMany as jest.Mock).mockResolvedValue([{ id: 1, estado: 'PRESTADO' }]);
    (prisma.equipo.count as jest.Mock).mockResolvedValue(1);
    const res = createMockResponse();

    await listEquipment(req({ query: { estado: 'prestado' } }), res);

    expect(prisma.equipo.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ estado: 'PRESTADO' })
    }));
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
