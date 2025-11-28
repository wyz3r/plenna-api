import { Request, Response, NextFunction } from 'express';
import { createConsultation } from '../../../src/modules/consultations/consultations.controller';

import { getPatientByidServices } from '../../../src/modules/patients/patien.service';
import { createConsultationServices } from '../../../src/modules/consultations/consultations.service';
import { logger } from '../../../src/utils/logger';

jest.mock('../../../src/modules/patients/patien.service');
jest.mock('../../../src/modules/consultations/consultations.service');
jest.mock('../../../src/utils/logger');

describe('createConsultation Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  // ✅ SUCCESS CASE
  it('should create a consultation and return 201', async () => {
    req.body = { patientId: '123', reason: 'Dolor' };

    const fakeConsultation = {
      id: 'abc',
      reason: 'Dolor',
    };

    // Simula que el paciente sí existe
    (getPatientByidServices as jest.Mock).mockResolvedValue({ id: '123' });

    // Simula creación de consulta
    (createConsultationServices as jest.Mock).mockResolvedValue(fakeConsultation);

    await createConsultation(req as Request, res as Response, next);

    expect(logger.info).toHaveBeenCalledWith('createConsultation');

    expect(getPatientByidServices).toHaveBeenCalledWith('123');

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeConsultation);
  });

  // ❌ PATIENT NOT FOUND → Should propagate the error
  it('should call next with NotFoundError when patient does not exist', async () => {
    const error = new Error('DB fail');

    req.body = { patientId: '123', reason: 'Dolor' };

    (getPatientByidServices as jest.Mock).mockRejectedValue(error);

    await createConsultation(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // ❌ GENERAL ERROR
  it('should call next when service throws an error', async () => {
    const error = new Error('DB fail');

    req.body = { patientId: '123', reason: 'Dolor' };

    (getPatientByidServices as jest.Mock).mockRejectedValue(error);

    await createConsultation(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
