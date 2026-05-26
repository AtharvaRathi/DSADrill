import { Router } from 'express';
import { executeCode } from '../controllers/executionCtrl';

const router = Router();

// POST /api/execute
router.post('/', executeCode);

export default router;
