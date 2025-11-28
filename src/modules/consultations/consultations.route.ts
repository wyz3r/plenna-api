import { Router } from 'express';
import { createConsultation } from './consultations.controller';

const router = Router();

router.post('/', createConsultation);

export default router;
