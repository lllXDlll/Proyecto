import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import prisma from '../db';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

// 1. Create a user
export const createUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { usuario, password, nombre, rol } = req.body;

    if (!usuario || !password || !nombre) {
      return res.status(400).json({ error: 'Usuario, contraseña y nombre son requeridos' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { usuario }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
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
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// 2. List users (with pagination and search)
export const listUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          OR: [
            { nombre: { contains: search, mode: 'insensitive' as const } },
            { usuario: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
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
      prisma.user.count({ where: filter })
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
  } catch (error) {
    console.error('Error listing users:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// 3. Update a user
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { usuario, nombre, rol, activo } = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const existingUser = await prisma.user.findUnique({
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
      const conflictUser = await prisma.user.findUnique({
        where: { usuario }
      });

      if (conflictUser) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      }
    }

    const updatedUser = await prisma.user.update({
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
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
