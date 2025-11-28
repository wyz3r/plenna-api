/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import express from 'express';
import router from '../../../src/modules/patients/patient.route';

jest.mock('../../../src/utils/validate', () => ({
  validate: jest.fn(() => (req: any, _res: any, next: any) => next()),
}));

jest.mock('../../../src/utils/validationUpdatePatient', () => ({
  validateUpdatePatient: jest.fn((req, _res, next) => next()),
}));

jest.mock('../../../src/modules/patients/patient.controller', () => ({
  getPatients: jest.fn((req, res) => res.status(200).json({ ok: 'getPatients' })),
  getPatientById: jest.fn((req, res) => res.status(200).json({ ok: 'getPatientById' })),
  getPatientHistory: jest.fn((req, res) => res.status(200).json({ ok: 'getPatientHistory' })),
  createPatient: jest.fn((req, res) => res.status(201).json({ ok: 'createPatient' })),
  updatePatient: jest.fn((req, res) => res.status(200).json({ ok: 'updatePatient' })),
  deletedPatientById: jest.fn((req, res) => res.status(200).json({ ok: 'deletedPatientById' })),
}));

describe('Patient Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/patients', router);

  const { validate } = require('../../../src/utils/validate');
  const { validateUpdatePatient } = require('../../../src/utils/validationUpdatePatient');
  const controllers = require('../../../src/modules/patients/patient.controller');

  it('GET /patients -> must call getPatients', async () => {
    const res = await request(app).get('/patients');

    expect(res.status).toBe(200);
    expect(controllers.getPatients).toHaveBeenCalled();
  });

  it('GET /patients/history/:id -> calls validate & getPatientHistory', async () => {
    const res = await request(app).get('/patients/history/123456789012345678901234');

    expect(validate).toHaveBeenCalled();
    expect(controllers.getPatientHistory).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it('GET /patients/:id -> calls validate & getPatientById', async () => {
    const res = await request(app).get('/patients/123456789012345678901234');

    expect(validate).toHaveBeenCalled();
    expect(controllers.getPatientById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it('POST /patients -> calls validate & createPatient', async () => {
    const res = await request(app).post('/patients').send({
      name: 'Leo',
      lastName: 'Islas',
      age: 29,
      gender: 'male',
    });

    expect(validate).toHaveBeenCalled();
    expect(controllers.createPatient).toHaveBeenCalled();
    expect(res.status).toBe(201);
  });

  it('PATCH /patients/:id -> calls validate, validateUpdatePatient, updatePatient', async () => {
    const res = await request(app)
      .patch('/patients/123456789012345678901234')
      .send({ name: 'Nuevo Nombre' });

    expect(validate).toHaveBeenCalled();
    expect(validateUpdatePatient).toHaveBeenCalled();
    expect(controllers.updatePatient).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it('DELETE /patients/delete/:id -> calls validate & deletedPatientById', async () => {
    const res = await request(app).delete('/patients/delete/123456789012345678901234');

    expect(validate).toHaveBeenCalled();
    expect(controllers.deletedPatientById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it('should return 500 if controller throws', async () => {
    controllers.getPatients.mockImplementationOnce(() => {
      throw new Error('Test Error');
    });

    const res = await request(app).get('/patients');

    expect(res.status).toBe(500);
  });
});
