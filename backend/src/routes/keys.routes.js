import { Router } from 'express';
import { getKey, getKeyById} from '../controllers/keys.controller.js';

const router = Router();

router.get('/', getKey);
router.get('/:id', getKeyById);

export default router;