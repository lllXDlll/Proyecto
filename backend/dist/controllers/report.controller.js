"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanReport = exports.getEquipmentStatusReport = exports.getLoanStats = void 0;
const db_1 = __importDefault(require("../db"));
const EQUIPMENT_STATUSES = ['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO'];
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
const buildDateFilter = (query) => {
    const from = parseDate(query.from);
    const to = parseDate(query.to);
    if (from === null || to === null) {
        return { error: 'Rango de fechas invalido' };
    }
    if (from && to && from > to) {
        return { error: 'La fecha inicial no puede ser mayor que la fecha final' };
    }
    return {
        filter: from || to
            ? {
                fechaPrestamo: {
                    ...(from ? { gte: from } : {}),
                    ...(to ? { lte: to } : {})
                }
            }
            : {}
    };
};
const emptyEquipmentCounts = () => EQUIPMENT_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
}, {});
const getLoanStats = async (req, res) => {
    try {
        const dateResult = buildDateFilter(req.query);
        if ('error' in dateResult) {
            return res.status(400).json({ error: dateResult.error });
        }
        const where = dateResult.filter;
        const [total, active, completed] = await Promise.all([
            db_1.default.prestamo.count({ where }),
            db_1.default.prestamo.count({ where: { ...where, estado: 'ACTIVO' } }),
            db_1.default.prestamo.count({ where: { ...where, estado: 'DEVUELTO' } })
        ]);
        return res.status(200).json({
            total,
            active,
            completed
        });
    }
    catch (error) {
        console.error('Error loading loan stats:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getLoanStats = getLoanStats;
const getEquipmentStatusReport = async (req, res) => {
    try {
        const page = normalizePage(req.query.page);
        const limit = normalizeLimit(req.query.limit);
        const estado = typeof req.query.estado === 'string' ? req.query.estado.trim().toUpperCase() : '';
        if (estado && !EQUIPMENT_STATUSES.includes(estado)) {
            return res.status(400).json({ error: 'Estado de equipo invalido' });
        }
        const where = estado ? { estado } : {};
        const skip = (page - 1) * limit;
        const [groups, equipment, total] = await Promise.all([
            db_1.default.equipo.groupBy({
                by: ['estado'],
                _count: { _all: true }
            }),
            db_1.default.equipo.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: 'asc' }
            }),
            db_1.default.equipo.count({ where })
        ]);
        const byStatus = emptyEquipmentCounts();
        groups.forEach((group) => {
            byStatus[group.estado] = group._count._all;
        });
        return res.status(200).json({
            byStatus,
            equipment,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    }
    catch (error) {
        console.error('Error loading equipment status report:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getEquipmentStatusReport = getEquipmentStatusReport;
const getLoanReport = async (req, res) => {
    try {
        const page = normalizePage(req.query.page);
        const limit = normalizeLimit(req.query.limit);
        const estado = typeof req.query.estado === 'string' ? req.query.estado.trim().toUpperCase() : '';
        const usuarioId = req.query.usuarioId ? parseId(req.query.usuarioId) : undefined;
        const equipoId = req.query.equipoId ? parseId(req.query.equipoId) : undefined;
        const dateResult = buildDateFilter(req.query);
        if ('error' in dateResult) {
            return res.status(400).json({ error: dateResult.error });
        }
        if (estado && !LOAN_STATUSES.includes(estado)) {
            return res.status(400).json({ error: 'Estado de prestamo invalido' });
        }
        if (req.query.usuarioId && Number.isNaN(usuarioId)) {
            return res.status(400).json({ error: 'ID de usuario invalido' });
        }
        if (req.query.equipoId && Number.isNaN(equipoId)) {
            return res.status(400).json({ error: 'ID de equipo invalido' });
        }
        const where = {
            ...dateResult.filter,
            ...(estado ? { estado } : {}),
            ...(usuarioId ? { usuarioId } : {}),
            ...(equipoId ? { equipoId } : {})
        };
        const skip = (page - 1) * limit;
        const [loans, total] = await Promise.all([
            db_1.default.prestamo.findMany({
                where,
                skip,
                take: limit,
                orderBy: { fechaPrestamo: 'desc' },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            usuario: true,
                            nombre: true
                        }
                    },
                    equipo: {
                        select: {
                            id: true,
                            nombre: true,
                            codigoInventario: true,
                            estado: true
                        }
                    }
                }
            }),
            db_1.default.prestamo.count({ where })
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
    }
    catch (error) {
        console.error('Error loading loan report:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getLoanReport = getLoanReport;
