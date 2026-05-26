import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authCtrl';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
