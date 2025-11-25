import resjson from '../../../pruebaTecnica';
// import { logger } from '../../utils/logger';
const newSchedules = new Map();
export async function unificationSchedule(scheduleDate: any): Promise<object> {
  newSchedules.clear();
  const doctors = resjson.schedules;
  doctors.forEach((d: any) => {
    d.slotdates.forEach((f: any) => {
      const key = f.date;

      if (newSchedules.get(key) !== undefined) {
        newSchedules
          .get(key)
          ?.push({ idDoctor: d.idDoctor, slots: f?.slots?.map((s: any) => s?.dateTime) });
      }
      if (!newSchedules.has(key)) {
        newSchedules.set(key, [
          { idDoctor: d.idDoctor, slots: f?.slots?.map((s: any) => s?.dateTime) },
        ]);
      }
    });
  });

  if (scheduleDate) {
    const key = `${scheduleDate}T00:00:00Z`;
    return { [key]: newSchedules.get(`${scheduleDate}T00:00:00Z`) };
  }

  return Object.fromEntries(newSchedules);
}
