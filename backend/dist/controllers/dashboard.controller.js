"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardSummary = void 0;
const db_1 = __importDefault(require("../db"));
const EQUIPMENT_STATUSES = ['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO'];
const emptyEquipmentCounts = () => EQUIPMENT_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
}, {});
const getDashboardSummary = async (_req, res) => {
    try {
        const [totalEquipment, equipmentGroups, totalUsers, activeLoans, completedLoans, totalLoans] = await Promise.all([
            db_1.default.equipo.count(),
            db_1.default.equipo.groupBy({
                by: ['estado'],
                _count: { _all: true }
            }),
            db_1.default.user.count(),
            db_1.default.prestamo.count({ where: { estado: 'ACTIVO' } }),
            db_1.default.prestamo.count({ where: { estado: 'DEVUELTO' } }),
            db_1.default.prestamo.count()
        ]);
        const equipmentByStatus = emptyEquipmentCounts();
        equipmentGroups.forEach((group) => {
            equipmentByStatus[group.estado] = group._count._all;
        });
        return res.status(200).json({
            equipment: {
                total: totalEquipment,
                byStatus: equipmentByStatus
            },
            users: {
                total: totalUsers
            },
            loans: {
                total: totalLoans,
                active: activeLoans,
                completed: completedLoans
            }
        });
    }
    catch (error) {
        console.error('Error loading dashboard summary:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getDashboardSummary = getDashboardSummary;
