import { Doctor } from '../../../src/interfaces/doctor.interface';
import { unifySchedules } from '../../../src/modules/schedule/schedule.service';
export const demo: { schedules: Doctor[] } = {
  schedules: [
    {
      idDoctor: '45',
      slotdates: [
        {
          date: '2022-05-20T00:00:00Z',
          slots: [{ dateTime: '2022-05-20T09:00:00Z' }, { dateTime: '2022-05-20T10:00:00Z' }],
        },
        {
          date: '2022-05-22T00:00:00Z',
        },
      ],
    },
    {
      idDoctor: '46',
      slotdates: [
        {
          date: '2022-05-20T00:00:00Z',
          slots: [
            { dateTime: '2022-05-20T09:00:00Z' },
            { dateTime: '2022-05-20T10:00:00Z' },
            { dateTime: '2022-05-20T11:00:00Z' },
            { dateTime: '2022-05-20T12:00:00Z' },
            { dateTime: '2022-05-20T13:00:00Z' },
            { dateTime: '2022-05-20T14:00:00Z' },
          ],
        },
      ],
    },
    {
      idDoctor: '47',
      slotdates: [
        {
          date: '2022-05-20T00:00:00Z',
          slots: [{ dateTime: '2022-05-20T15:00:00Z' }],
        },
        {
          date: '2022-05-27T00:00:00Z',
          slots: [{ dateTime: '2022-05-27T08:00:00Z' }],
        },
      ],
    },
  ],
};

describe('unifySchedules', () => {
  it('should unify schedules for all dates', () => {
    const result = unifySchedules(demo.schedules);

    expect(result).toHaveProperty('2022-05-20T00:00:00Z');
    expect(result).toHaveProperty('2022-05-27T00:00:00Z');

    const day = result['2022-05-20T00:00:00Z'];

    expect(day).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ idDoctor: '45' }),
        expect.objectContaining({ idDoctor: '46' }),
        expect.objectContaining({ idDoctor: '47' }),
      ])
    );
  });

  it('should return only one date when scheduleDate is provided', () => {
    const result = unifySchedules(demo.schedules, '2022-05-20');

    expect(Object.keys(result)).toEqual(['2022-05-20T00:00:00Z']);

    const day = result['2022-05-20T00:00:00Z'];
    expect(day?.length).toBe(3);
  });

  it('should return undefined slots when a doctor has no slots on a date', () => {
    const result = unifySchedules(demo.schedules, '2022-05-22');

    const day = result['2022-05-22T00:00:00Z'];

    const doctor45 = day?.find((d: { idDoctor: string }) => d.idDoctor === '45');

    expect(doctor45?.slots).toBeUndefined();
  });

  it('should return undefined for non-existing date', () => {
    const result = unifySchedules(demo.schedules, '2099-01-01');

    expect(result['2099-01-01T00:00:00Z']).toBeUndefined();
  });
});
