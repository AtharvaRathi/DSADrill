import { Router } from 'express';
import { createStudyPlan, getMyStudyPlan, updateStudyPlan, getStudyPlanStats } from '../controllers/studyPlanCtrl';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createStudyPlan);
router.get('/', protect, getMyStudyPlan);
router.patch('/', protect, updateStudyPlan);
router.get('/stats', protect, getStudyPlanStats);

export default router;
