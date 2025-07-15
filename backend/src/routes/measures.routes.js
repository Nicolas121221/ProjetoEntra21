import { Router } from 'express';
import { getAllMeaures, getMeasureById } from '../controllers/measure.controller.js';

const router = Router();

router.get('/', getAllMeaures);
router.get('/:id', getMeasureById);

export default router;