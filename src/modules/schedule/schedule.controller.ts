import { Request, Response } from 'express';
import resjson from '../../../pruebaTecnica';
import { logger } from '../../utils/logger';
import { SchedulesParams } from '../../dtos/schedule.params';
const newSchedules = new Map();

interface SlotDate {
  date: string;
  slots: { dateTime: string }[];
}

interface Doctor {
  idDoctor: string;
  slotdates: SlotDate[];
}

export async function unificationSchedule(req: Request<SchedulesParams>, res: Response) {
  logger.info('unificationSchedule started');
  const { date: scheduleDate } = req.query;
  newSchedules.clear();
  const doctors: Doctor[] = resjson.schedules;

  doctors.forEach((d) => {
    d.slotdates.forEach((f) => {
      const key = f.date;
      if (newSchedules.get(key) !== undefined) {
        newSchedules
          .get(key)
          ?.push({ idDoctor: d.idDoctor, slots: f?.slots?.map((s) => s?.dateTime) });
      }
      if (!newSchedules.has(key)) {
        newSchedules.set(key, [{ idDoctor: d.idDoctor, slots: f?.slots?.map((s) => s?.dateTime) }]);
      }
    });
  });
  if (scheduleDate) {
    const key = `${scheduleDate}T00:00:00Z`;
    return res.status(200).json({ [key]: newSchedules.get(`${scheduleDate}T00:00:00Z`) });
  }
  return res.status(200).json(Object.fromEntries(newSchedules));
}
