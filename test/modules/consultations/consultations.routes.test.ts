/* eslint-disable @typescript-eslint/no-require-imports */
import request from 'supertest';
import express from 'express';
import router from '../../../src/modules/consultations/consultations.route';

// -------------------------------
// MOCK DEL CONTROLLER
// -------------------------------
jest.mock('../../../src/modules/consultations/consultations.controller', () => ({
  createConsultation: jest.fn((req, res) =>
    res.status(201).json({ ok: 'createConsultation', body: req.body })
  ),
}));

describe('Consultations Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/consultations', router);

  const {
    createConsultation,
  } = require('../../../src/modules/consultations/consultations.controller');

  it('POST /consultations -> should call createConsultation', async () => {
    const response = await request(app)
      .post('/consultations')
      .send({ patientId: '123', reason: 'Dolor' });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe('createConsultation');
    expect(createConsultation).toHaveBeenCalled();
  });

  it('POST /consultations -> 500 if controller throws', async () => {
    createConsultation.mockImplementationOnce(() => {
      throw new Error('DB Fail');
    });

    const response = await request(app)
      .post('/consultations')
      .send({ patientId: '123', reason: 'Dolor' });

    expect(response.status).toBe(500);
  });
});
