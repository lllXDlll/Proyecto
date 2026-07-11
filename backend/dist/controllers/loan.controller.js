"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLoanHistory = exports.listActiveLoans = exports.returnLoan = exports.createLoan = void 0;
const db_1 = __importDefault(require("../db"));
const LOAN_STATUSES = ['ACTIVO', 'DEVUELTO'];
const normalizePage = (value) => {
    const parsed = parseInt(String(value || '1'), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};
const normalizeLimit = (value) => {
    const parsed = parseInt(String(value || '10'), 10);
    return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 100) : 10;
};
const parseId = (value) => {
    const parsed = parseInt(String(value), 10);
    return Number.isFinite(parsed) ? parsed : NaN;
};
const parseDate = (value) => {
    if (!value || typeof value !== 'string')
        return undefined;
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
const buildLoanFilter = (query, forcedStatus) => {
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
    const filter = {
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
                    { usuario: { nombre: { contains: search, mode: 'insensitive' } } },
                    { usuario: { usuario: { contains: search, mode: 'insensitive' } } },
                    { equipo: { nombre: { contains: search, mode: 'insensitive' } } },
                    { equipo: { codigoInventario: { contains: search, mode: 'insensitive' } } }
                ]
            }
            : {})
    };
    return { filter };
};
const createLoan = async (req, res) => {
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
            db_1.default.user.findUnique({ where: { id: usuarioId } }),
            db_1.default.equipo.findUnique({ where: { id: equipoId } })
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
        const loan = await db_1.default.$transaction(async (tx) => {
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
    }
    catch (error) {
        console.error('Error creating loan:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.createLoan = createLoan;
const returnLoan = async (req, res) => {
    try {
        const loanId = parseId(req.params.id);
        const observacionesDevolucion = req.body.observacionesDevolucion ? String(req.body.observacionesDevolucion).trim() : null;
        if (Number.isNaN(loanId)) {
            return res.status(400).json({ error: 'ID de prestamo invalido' });
        }
        const existingLoan = await db_1.default.prestamo.findUnique({
            where: { id: loanId },
            include: { equipo: true }
        });
        if (!existingLoan) {
            return res.status(404).json({ error: 'Prestamo no encontrado' });
        }
        if (existingLoan.estado !== 'ACTIVO') {
            return res.status(409).json({ error: 'El prestamo ya fue devuelto' });
        }
        const updatedLoan = await db_1.default.$transaction(async (tx) => {
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
    }
    catch (error) {
        console.error('Error returning loan:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.returnLoan = returnLoan;
const listLoans = async (req, res, forcedStatus) => {
    const page = normalizePage(req.query.page);
    const limit = normalizeLimit(req.query.limit);
    const filterResult = buildLoanFilter(req.query, forcedStatus);
    if ('error' in filterResult) {
        return res.status(400).json({ error: filterResult.error });
    }
    const skip = (page - 1) * limit;
    const [loans, total] = await Promise.all([
        db_1.default.prestamo.findMany({
            where: filterResult.filter,
            include: loanInclude,
            skip,
            take: limit,
            orderBy: { fechaPrestamo: 'desc' }
        }),
        db_1.default.prestamo.count({ where: filterResult.filter })
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
const listActiveLoans = async (req, res) => {
    try {
        return await listLoans(req, res, 'ACTIVO');
    }
    catch (error) {
        console.error('Error listing active loans:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.listActiveLoans = listActiveLoans;
const listLoanHistory = async (req, res) => {
    try {
        return await listLoans(req, res);
    }
    catch (error) {
        console.error('Error listing loan history:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.listLoanHistory = listLoanHistory;
