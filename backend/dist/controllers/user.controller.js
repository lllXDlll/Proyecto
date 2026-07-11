"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.listUsers = exports.createUser = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const db_1 = __importDefault(require("../db"));
// 1. Create a user
const createUser = async (req, res) => {
    try {
        const { usuario, password, nombre, rol } = req.body;
        if (!usuario || !password || !nombre) {
            return res.status(400).json({ error: 'Usuario, contraseña y nombre son requeridos' });
        }
        const existingUser = await db_1.default.user.findUnique({
            where: { usuario }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db_1.default.user.create({
            data: {
                usuario,
                password: hashedPassword,
                nombre,
                rol: rol || 'USUARIO',
                activo: true
            }
        });
        return res.status(201).json({
            id: newUser.id,
            usuario: newUser.usuario,
            nombre: newUser.nombre,
            rol: newUser.rol,
            activo: newUser.activo
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.createUser = createUser;
// 2. List users (with pagination and search)
const listUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;
        const filter = search
            ? {
                OR: [
                    { nombre: { contains: search, mode: 'insensitive' } },
                    { usuario: { contains: search, mode: 'insensitive' } }
                ]
            }
            : {};
        const [users, total] = await Promise.all([
            db_1.default.user.findMany({
                where: filter,
                skip,
                take: limit,
                select: {
                    id: true,
                    usuario: true,
                    nombre: true,
                    rol: true,
                    activo: true
                },
                orderBy: { id: 'asc' }
            }),
            db_1.default.user.count({ where: filter })
        ]);
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            users,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        });
    }
    catch (error) {
        console.error('Error listing users:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.listUsers = listUsers;
// 3. Update a user
const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { usuario, nombre, rol, activo } = req.body;
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'ID de usuario inválido' });
        }
        const existingUser = await db_1.default.user.findUnique({
            where: { id: userId }
        });
        if (!existingUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Self deactivation validation
        if (activo === false && req.user && req.user.id === userId) {
            return res.status(400).json({ error: 'No puedes desactivar tu propia cuenta de administrador' });
        }
        // Username conflict check
        if (usuario && usuario !== existingUser.usuario) {
            const conflictUser = await db_1.default.user.findUnique({
                where: { usuario }
            });
            if (conflictUser) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }
        }
        const updatedUser = await db_1.default.user.update({
            where: { id: userId },
            data: {
                usuario: usuario ?? existingUser.usuario,
                nombre: nombre ?? existingUser.nombre,
                rol: rol ?? existingUser.rol,
                activo: activo !== undefined ? activo : existingUser.activo
            },
            select: {
                id: true,
                usuario: true,
                nombre: true,
                rol: true,
                activo: true
            }
        });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.updateUser = updateUser;
