/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { unificationSchedule } from '../../../src/modules/schedule/schedule.controller';
import { unifySchedules } from '../../../src/modules/schedule/schedule.service';
import { logger } from '../../../src/utils/logger';
import { demo } from '../../../src/utils/demoData';

jest.mock('../../../src/modules/schedule/schedule.service');
jest.mock('../../../src/utils/logger');
jest.mock('../../../src/utils/demoData');

describe('unificationSchedule controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('should return unified schedules without date', () => {
    const fakeResponse = { test: true };

    (demo as any).schedules = [{ idDoctor: '45' }];

    (unifySchedules as jest.Mock).mockReturnValue(fakeResponse);

    unificationSchedule(req as Request, res as Response);

    // ✅ status 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ✅ test json
    expect(res.json).toHaveBeenCalledWith(fakeResponse);

    // ✅ test logger
    expect(logger.info).toHaveBeenCalledWith('unificationSchedule started');

    // ✅ service without date
    expect(unifySchedules).toHaveBeenCalledWith(demo.schedules, undefined);
  });

  it('should return unified schedules with date', () => {
    const fakeResponse = { date: '2022-05-20' };

    req = {
      query: {
        date: '2022-05-20',
      },
    };

    (demo as any).schedules = [{ idDoctor: '46' }];

    (unifySchedules as jest.Mock).mockReturnValue(fakeResponse);

    unificationSchedule(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResponse);

    expect(unifySchedules).toHaveBeenCalledWith(demo.schedules, '2022-05-20');
  });
});
