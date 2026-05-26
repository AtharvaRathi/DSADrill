import { Router } from 'express';
import { submitProgress, getUserProgress, getDueQuestions, getQuestionProgress } from '../controllers/progressCtrl';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/submit', protect, submitProgress);
router.get('/me', protect, getUserProgress);
router.get('/due', protect, getDueQuestions);
router.get('/:questionId', protect, getQuestionProgress);

export default router;
