import { Response } from 'express';
import prisma from '../db';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const LOAN_STATUSES = ['ACTIVO', 'DEVUELTO'];

const normalizePage = (value: unknown) => {
  const parsed = parseInt(String(value || '1'), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const normalizeLimit = (value: unknown) => {
  const parsed = parseInt(String(value || '10'), 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 100) : 10;
};

const parseId = (value: unknown) => {
  const parsed = parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const parseDate = (value: unknown) => {
  if (!value || typeof value !== 'string') return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const loanInclude = {
  usuario: {
    select: {
      id: true,
      usuario: true,
      nombre: true,
      rol: true,
      activo: true
    }
  },
  equipo: true,
  registradoPor: {
    select: {
      id: true,
      usuario: true,
      nombre: true
    }
  },
  recibidoPor: {
    select: {
      id: true,
      usuario: true,
      nombre: true
    }
  }
};

const buildLoanFilter = (query: AuthenticatedRequest['query'], forcedStatus?: string) => {
  const search = typeof query.search === 'string' ? query.search.trim() : '';
  const estado = forcedStatus || (typeof query.estado === 'string' ? query.estado.trim().toUpperCase() : '');
  const usuarioId = query.usuarioId ? parseId(query.usuarioId) : undefined;
  const equipoId = query.equipoId ? parseId(query.equipoId) : undefined;
  const from = parseDate(query.from);
  const to = parseDate(query.to);

  if (estado && !LOAN_STATUSES.includes(estado)) {
    return { error: 'Estado de prestamo invalido' };
  }

  if (query.usuarioId && Number.isNaN(usuarioId)) {
    return { error: 'ID de usuario invalido' };
  }

  if (query.equipoId && Number.isNaN(equipoId)) {
    return { error: 'ID de equipo invalido' };
  }

  if (from === null || to === null) {
    return { error: 'Rango de fechas invalido' };
  }

  const filter: any = {
    ...(estado ? { estado } : {}),
    ...(usuarioId ? { usuarioId } : {}),
    ...(equipoId ? { equipoId } : {}),
    ...(from || to
      ? {
          fechaPrestamo: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {})
          }
        }
      : {}),
    ...(search
      ? {
          OR: [
            { usuario: { nombre: { contains: search, mode: 'insensitive' as const } } },
            { usuario: { usuario: { contains: search, mode: 'insensitive' as const } } },
            { equipo: { nombre: { contains: search, mode: 'insensitive' as const } } },
            { equipo: { codigoInventario: { contains: search, mode: 'insensitive' as const } } }
          ]
        }
      : {})
  };

  return { filter };
};

export const createLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const usuarioId = parseId(req.body.usuarioId);
    const equipoId = parseId(req.body.equipoId);
    const fechaDevolucionPrevista = parseDate(req.body.fechaDevolucionPrevista);
    const observacionesPrestamo = req.body.observacionesPrestamo ? String(req.body.observacionesPrestamo).trim() : null;

    if (Number.isNaN(usuarioId) || Number.isNaN(equipoId)) {
      return res.status(400).json({ error: 'Usuario y equipo son requeridos' });
    }

    if (fechaDevolucionPrevista === null) {
      return res.status(400).json({ error: 'Fecha de devolucion prevista invalida' });
    }

    const [borrower, equipment] = await Promise.all([
      prisma.user.findUnique({ where: { id: usuarioId } }),
      prisma.equipo.findUnique({ where: { id: equipoId } })
    ]);

    if (!borrower) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!borrower.activo) {
      return res.status(400).json({ error: 'No se puede prestar equipo a un usuario inactivo' });
    }

    if (!equipment) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    if (equipment.estado !== 'DISPONIBLE') {
      return res.status(409).json({ error: 'El equipo no esta disponible para prestamo' });
    }

    const loan = await prisma.$transaction(async (tx: any) => {
      const createdLoan = await tx.prestamo.create({
        data: {
          usuarioId,
          equipoId,
          fechaDevolucionPrevista: fechaDevolucionPrevista || null,
          estado: 'ACTIVO',
          observacionesPrestamo,
          registradoPorId: req.user?.id || null
        },
        include: loanInclude
      });

      await tx.equipo.update({
        where: { id: equipoId },
        data: { estado: 'PRESTADO' }
      });

      return createdLoan;
    });

    return res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const returnLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const loanId = parseId(req.params.id);
    const observacionesDevolucion = req.body.observacionesDevolucion ? String(req.body.observacionesDevolucion).trim() : null;

    if (Number.isNaN(loanId)) {
      return res.status(400).json({ error: 'ID de prestamo invalido' });
    }

    const existingLoan = await prisma.prestamo.findUnique({
      where: { id: loanId },
      include: { equipo: true }
    });

    if (!existingLoan) {
      return res.status(404).json({ error: 'Prestamo no encontrado' });
    }

    if (existingLoan.estado !== 'ACTIVO') {
      return res.status(409).json({ error: 'El prestamo ya fue devuelto' });
    }

    const updatedLoan = await prisma.$transaction(async (tx: any) => {
      const loan = await tx.prestamo.update({
        where: { id: loanId },
        data: {
          estado: 'DEVUELTO',
          fechaDevolucionReal: new Date(),
          observacionesDevolucion,
          recibidoPorId: req.user?.id || null
        },
        include: loanInclude
      });

      await tx.equipo.update({
        where: { id: existingLoan.equipoId },
        data: { estado: 'DISPONIBLE' }
      });

      return loan;
    });

    return res.status(200).json(updatedLoan);
  } catch (error) {
    console.error('Error returning loan:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const listLoans = async (req: AuthenticatedRequest, res: Response, forcedStatus?: string) => {
  const page = normalizePage(req.query.page);
  const limit = normalizeLimit(req.query.limit);
  const filterResult = buildLoanFilter(req.query, forcedStatus);

  if ('error' in filterResult) {
    return res.status(400).json({ error: filterResult.error });
  }

  const skip = (page - 1) * limit;

  const [loans, total] = await Promise.all([
    prisma.prestamo.findMany({
      where: filterResult.filter,
      include: loanInclude,
      skip,
      take: limit,
      orderBy: { fechaPrestamo: 'desc' }
    }),
    prisma.prestamo.count({ where: filterResult.filter })
  ]);

  return res.status(200).json({
    loans,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
};

export const listActiveLoans = async (req: AuthenticatedRequest, res: Response) => {
  try {
    return await listLoans(req, res, 'ACTIVO');
  } catch (error) {
    console.error('Error listing active loans:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const listLoanHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    return await listLoans(req, res);
  } catch (error) {
    console.error('Error listing loan history:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
