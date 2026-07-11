import { Router, Response } from 'express';
import { login } from '../controllers/auth.controller';
import { authenticateToken, AuthenticatedRequest } from '../middlewares/auth.middleware';

const router = Router();

// Public login route
router.post('/login', login);

// Protected test/verification route
router.get('/me', authenticateToken as any, (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({
    authenticated: true,
    user: req.user
  });
});

export default router;
