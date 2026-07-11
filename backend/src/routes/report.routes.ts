import { Router } from 'express';
import { getEquipmentStatusReport, getLoanReport, getLoanStats } from '../controllers/report.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';

const router = Router();
const adminOnly = authorizeRole(['ADMINISTRADOR']) as any;

router.use(authenticateToken as any);

router.get('/equipment/status', getEquipmentStatusReport as any);
router.get('/loans/stats', adminOnly, getLoanStats as any);
router.get('/loans', adminOnly, getLoanReport as any);

export default router;
