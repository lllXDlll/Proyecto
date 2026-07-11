import { Router } from 'express';
import { createLoan, listActiveLoans, listLoanHistory, returnLoan } from '../controllers/loan.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken as any);
router.use(authorizeRole(['ADMINISTRADOR']) as any);

router.post('/', createLoan as any);
router.put('/:id/return', returnLoan as any);
router.get('/active', listActiveLoans as any);
router.get('/history', listLoanHistory as any);

export default router;
