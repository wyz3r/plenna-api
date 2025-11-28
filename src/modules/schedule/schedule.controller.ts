import { Request, Response } from 'express';
import { demo } from '../../utils/demoData';
import { logger } from '../../utils/logger';
import { SchedulesParams } from '../../dtos/schedule.params';
import { Doctor } from '../../interfaces/doctor.interface';
import { unifySchedules } from './schedule.service';

export const unificationSchedule = (
  req: Request<object, object, object, SchedulesParams>,
  res: Response
) => {
  logger.info('unificationSchedule started');
  const { date } = req.query;
  const doctors: Doctor[] = demo.schedules as Doctor[];
  const schedulesUnify = unifySchedules(doctors, date);
  return res.status(200).json(schedulesUnify);
};
