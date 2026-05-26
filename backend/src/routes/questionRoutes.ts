import { Router } from 'express';
import { getAllQuestions, getQuestionById } from '../controllers/questionCtrl';

const router = Router();

// GET /api/questions
router.get('/', getAllQuestions);

// GET /api/questions/:id
router.get('/:id', getQuestionById);

export default router;
