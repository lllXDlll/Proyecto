import { Router } from 'express';
import { createEquipment, listEquipment, updateEquipment } from '../controllers/equipment.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';

const router = Router();
const adminOnly = authorizeRole(['ADMINISTRADOR']) as any;

router.use(authenticateToken as any);

router.get('/', listEquipment as any);
router.post('/', adminOnly, createEquipment as any);
router.put('/:id', adminOnly, updateEquipment as any);

export default router;
