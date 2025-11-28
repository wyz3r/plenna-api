import { Router } from 'express';
import { unificationSchedule } from './schedule.controller';
import { SchedulesParamsSchema } from '../../dtos/schedule.params';
import { validate } from '../../utils/validate';

const router = Router();
router.get('/availability', validate(SchedulesParamsSchema, 'query'), unificationSchedule);

export default router;
