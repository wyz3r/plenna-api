import { Doctor } from '../../interfaces/doctor.interface';

export const unifySchedules = (doctors: Doctor[], scheduleDate?: string) => {
  const newSchedules = new Map();
  doctors.forEach((d) => {
    d.slotdates.forEach((f) => {
      const key = f.date;
      const formattedSlots = f?.slots?.map((s) => formatDate(s.dateTime));
      if (newSchedules.has(key)) {
        newSchedules.get(key)!.push({
          idDoctor: d.idDoctor,
          slots: formattedSlots,
        });
      } else {
        newSchedules.set(key, [
          {
            idDoctor: d.idDoctor,
            slots: formattedSlots,
          },
        ]);
      }
    });
  });
  if (scheduleDate) {
    const key = `${scheduleDate}T00:00:00Z`;
    return { [key]: newSchedules.get(`${scheduleDate}T00:00:00Z`) };
  }
  return Object.fromEntries(newSchedules);
};

const formatDate = (dateTime: string) => {
  const timestamp = dateTime;
  const date = new Date(timestamp);
  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hour}:${minutes}`;
};
