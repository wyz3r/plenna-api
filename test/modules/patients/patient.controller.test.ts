import { Request, Response, NextFunction } from 'express';

import {
  createPatient,
  getPatients,
  getPatientById,
  getPatientHistory,
  deletedPatientById,
  updatePatient,
} from '../../../src/modules/patients/patient.controller';

import {
  createPatientService,
  deletePatienByIdService,
  getPatientByidServices,
  getPatientHistoryService,
  getPatientServices,
  updatedPatientbyIdService,
} from '../../../src/modules/patients/patien.service';

import { logger } from '../../../src/utils/logger';
import { NotFoundError } from '../../../src/utils/errors/errors';
import { GetPatientByIdDTOType } from '../../../src/dtos/get-patient-by-id.dto';

jest.mock('../../../src/modules/patients/patien.service');
jest.mock('../../../src/utils/logger');

describe('Patient Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  // ✅ createPatient
  it('createPatient → returns 201 and patient', async () => {
    const fakePatient = { id: '1', name: 'Test' };

    req.body = fakePatient;

    (createPatientService as jest.Mock).mockResolvedValue(fakePatient);

    await createPatient(req as Request, res as Response, next);

    expect(createPatientService).toHaveBeenCalledWith(fakePatient);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakePatient);
  });

  it('createPatient → calls next on error', async () => {
    const error = new Error('fail');
    (createPatientService as jest.Mock).mockRejectedValue(error);

    await createPatient(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // ✅ getPatients
  it('getPatients → returns list of patients', async () => {
    const fakePatients = [{ id: '1' }];

    (getPatientServices as jest.Mock).mockResolvedValue(fakePatients);

    await getPatients(req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith(fakePatients);
  });

  it('getPatients → logs and calls next on error', async () => {
    const error = new Error('fail');
    (getPatientServices as jest.Mock).mockRejectedValue(error);

    await getPatients(req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });

  // ✅ getPatientById
  it('getPatientById → returns patient when found', async () => {
    const fakePatient = { id: '1' };
    req.params = { id: '123' };

    (getPatientByidServices as jest.Mock).mockResolvedValue(fakePatient);

    await getPatientById(req as Request<GetPatientByIdDTOType>, res as Response, next);

    expect(getPatientByidServices).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(fakePatient);
  });

  it('getPatientById → throws NotFoundError when patient missing', async () => {
    req.params = { id: '123' };

    (getPatientByidServices as jest.Mock).mockResolvedValue(undefined);

    await getPatientById(req as Request<GetPatientByIdDTOType>, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
  });

  // ✅ getPatientHistory
  it('getPatientHistory → returns formatted history', async () => {
    req.params = { id: '123' };

    const fakePatient = {
      name: 'Paciente 2',
      lastName: 'Test',
    };

    const fakeHistory = [
      {
        vitals: { weight: 72, height: 1.7, pressure: '120/80' },
        doctor: 'Dr. Test',
        reason: 'Revisión',
        diagnosis: 'Sano',
        treatment: 'Ninguno',
      },
    ];

    (getPatientByidServices as jest.Mock).mockResolvedValue(fakePatient);
    (getPatientHistoryService as jest.Mock).mockResolvedValue(fakeHistory);

    await getPatientHistory(req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith({
      name: 'Paciente 2',
      lastname: 'Test',
      history: fakeHistory,
    });
  });

  it('getPatientHistory → passes error to next', async () => {
    const error = new Error('fail');

    (getPatientByidServices as jest.Mock).mockRejectedValue(error);

    req.params = { id: '123' };

    await getPatientHistory(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // ✅ deletedPatientById
  it('deletedPatientById → deletes patient', async () => {
    req.params = { id: '123' };

    (deletePatienByIdService as jest.Mock).mockResolvedValue(undefined);

    await deletedPatientById(req as Request, res as Response, next);

    expect(deletePatienByIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'patient deleted' });
  });

  it('deletedPatientById → calls next on error', async () => {
    const error = new Error('fail');
    req.params = { id: '123' };

    (deletePatienByIdService as jest.Mock).mockRejectedValue(error);

    await deletedPatientById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // ✅ updatePatient
  it('updatePatient → updates patient', async () => {
    req.params = { id: '123' };
    req.body = { name: 'Pepe' };

    const fakeUpdated = {
      id: '1',
      name: 'Pepe',
    };

    (updatedPatientbyIdService as jest.Mock).mockResolvedValue(fakeUpdated);

    await updatePatient(req as Request, res as Response, next);

    expect(updatedPatientbyIdService).toHaveBeenCalledWith('123', { name: 'Pepe' });
    expect(res.json).toHaveBeenCalledWith(fakeUpdated);
  });

  it('updatePatient → throws NotFoundError when missing', async () => {
    req.params = { id: '123' };
    req.body = {};

    (updatedPatientbyIdService as jest.Mock).mockResolvedValue(undefined);

    await updatePatient(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
  });
});
