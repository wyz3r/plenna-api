import request from 'supertest';
import express from 'express';
import router from '../../../src/modules/schedule/schedule.route';

// Mock del middleware validate (para que no valide nada)
jest.mock('../../../src/utils/validate', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: jest.fn(() => (req: any, _res: any, next: any) => next()),
}));

// Mock del controlador
jest.mock('../../../src/modules/schedule/schedule.controller', () => ({
  unificationSchedule: jest.fn((req, res) => res.status(200).json({ ok: true, query: req.query })),
}));

describe('GET /availability route', () => {
  const app = express();
  app.use(express.json());
  app.use('/schedule', router);

  it('should call controller and return 200', async () => {
    const response = await request(app).get('/schedule/availability?date=2022-05-20');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it('should call validate middleware', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { validate } = require('../../../src/utils/validate');

    await request(app).get('/schedule/availability?date=2022-05-20');

    expect(validate).toHaveBeenCalled();
  });

  it('should handle controller error and return 500', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { unificationSchedule } = require('../../../src/modules/schedule/schedule.controller');
    unificationSchedule.mockImplementationOnce(() => {
      throw new Error('Internal fail');
    });

    const response = await request(app).get('/schedule/availability?date=2022-05-20');

    expect(response.status).toBe(500);
  });
});
