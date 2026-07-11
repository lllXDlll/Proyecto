import { Router } from 'express';
import { createUser, listUsers, updateUser } from '../controllers/user.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';

const router = Router();

// Protect all user management routes to ADMINISTRADOR only
router.use(authenticateToken as any);
router.use(authorizeRole(['ADMINISTRADOR']) as any);

router.post('/', createUser as any);
router.get('/', listUsers as any);
router.put('/:id', updateUser as any);

export default router;
