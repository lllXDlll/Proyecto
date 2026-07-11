"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEquipment = exports.listEquipment = exports.createEquipment = void 0;
const db_1 = __importDefault(require("../db"));
const VALID_STATUSES = ['DISPONIBLE', 'INACTIVO', 'PRESTADO', 'MANTENIMIENTO'];
const normalizePage = (value) => {
    const parsed = parseInt(String(value || '1'), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};
const normalizeLimit = (value) => {
    const parsed = parseInt(String(value || '10'), 10);
    return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 100) : 10;
};
const createEquipment = async (req, res) => {
    try {
        const { nombre, descripcion, codigoInventario } = req.body;
        const cleanNombre = typeof nombre === 'string' ? nombre.trim() : '';
        const cleanCodigo = typeof codigoInventario === 'string' ? codigoInventario.trim() : '';
        if (!cleanNombre || !cleanCodigo) {
            return res.status(400).json({ error: 'Nombre y codigo de inventario son requeridos' });
        }
        const existingEquipment = await db_1.default.equipo.findUnique({
            where: { codigoInventario: cleanCodigo }
        });
        if (existingEquipment) {
            return res.status(409).json({ error: 'El codigo de inventario ya esta registrado' });
        }
        const equipment = await db_1.default.equipo.create({
            data: {
                nombre: cleanNombre,
                descripcion: descripcion ? String(descripcion).trim() : null,
                codigoInventario: cleanCodigo,
                estado: 'DISPONIBLE'
            }
        });
        return res.status(201).json(equipment);
    }
    catch (error) {
        console.error('Error creating equipment:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.createEquipment = createEquipment;
const listEquipment = async (req, res) => {
    try {
        const page = normalizePage(req.query.page);
        const limit = normalizeLimit(req.query.limit);
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
        const estado = typeof req.query.estado === 'string' ? req.query.estado.trim().toUpperCase() : '';
        const skip = (page - 1) * limit;
        if (estado && !VALID_STATUSES.includes(estado)) {
            return res.status(400).json({ error: 'Estado de equipo invalido' });
        }
        const filter = {
            ...(search
                ? {
                    OR: [
                        { nombre: { contains: search, mode: 'insensitive' } },
                        { codigoInventario: { contains: search, mode: 'insensitive' } }
                    ]
                }
                : {}),
            ...(estado ? { estado } : {})
        };
        const [equipment, total] = await Promise.all([
            db_1.default.equipo.findMany({
                where: filter,
                skip,
                take: limit,
                orderBy: { id: 'asc' }
            }),
            db_1.default.equipo.count({ where: filter })
        ]);
        return res.status(200).json({
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
        console.error('Error listing equipment:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.listEquipment = listEquipment;
const updateEquipment = async (req, res) => {
    try {
        const equipmentId = parseInt(req.params.id, 10);
        const { nombre, descripcion, codigoInventario, estado } = req.body;
        if (Number.isNaN(equipmentId)) {
            return res.status(400).json({ error: 'ID de equipo invalido' });
        }
        const existingEquipment = await db_1.default.equipo.findUnique({
            where: { id: equipmentId }
        });
        if (!existingEquipment) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }
        const nextCodigo = typeof codigoInventario === 'string'
            ? codigoInventario.trim()
            : existingEquipment.codigoInventario;
        if (!nextCodigo) {
            return res.status(400).json({ error: 'Codigo de inventario es requerido' });
        }
        if (nextCodigo !== existingEquipment.codigoInventario) {
            const conflictingEquipment = await db_1.default.equipo.findUnique({
                where: { codigoInventario: nextCodigo }
            });
            if (conflictingEquipment) {
                return res.status(409).json({ error: 'El codigo de inventario ya esta en uso' });
            }
        }
        const nextEstado = typeof estado === 'string'
            ? estado.trim().toUpperCase()
            : existingEquipment.estado;
        if (!VALID_STATUSES.includes(nextEstado)) {
            return res.status(400).json({ error: 'Estado de equipo invalido' });
        }
        const nextNombre = typeof nombre === 'string' ? nombre.trim() : existingEquipment.nombre;
        if (!nextNombre) {
            return res.status(400).json({ error: 'Nombre es requerido' });
        }
        const updatedEquipment = await db_1.default.equipo.update({
            where: { id: equipmentId },
            data: {
                nombre: nextNombre,
                descripcion: descripcion !== undefined ? (descripcion ? String(descripcion).trim() : null) : existingEquipment.descripcion,
                codigoInventario: nextCodigo,
                estado: nextEstado
            }
        });
        return res.status(200).json(updatedEquipment);
    }
    catch (error) {
        console.error('Error updating equipment:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.updateEquipment = updateEquipment;
