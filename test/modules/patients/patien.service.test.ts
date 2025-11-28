import {
  createPatientService,
  deletePatienByIdService,
  getPatientByidServices,
  getPatientHistoryService,
  getPatientServices,
  updatedPatientbyIdService,
} from '../../../src/modules/patients/patien.service';

import { Patient } from '../../../src/models/patient.model';
import { NotFoundError } from '../../../src/utils/errors/errors';
import { logger } from '../../../src/utils/logger';
import { Consultation } from '../../../src/models/consultation.model';

jest.mock('../../../src/models/patient.model');
jest.mock('../../../src/models/consultation.model');
jest.mock('../../../src/utils/logger');

describe('Patient Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CREATE PATIENT
  describe('createPatientService', () => {
    it('should create patient', async () => {
      const body = { name: 'Juan' };
      const fakePatient = { id: '1', ...body };

      (Patient.create as jest.Mock).mockResolvedValue(fakePatient);

      const result = await createPatientService(body as object);

      expect(Patient.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(fakePatient);
    });

    it('should throw error when create fails', async () => {
      const error = new Error('Error creating patient');

      (Patient.create as jest.Mock).mockRejectedValue(error);

      await expect(createPatientService({} as object)).rejects.toThrow(error);
    });
  });

  // ✅ GET ALL PATIENTS
  describe('getPatientServices', () => {
    it('should return patients', async () => {
      const fakePatients = [{ id: '1' }];

      (Patient.find as jest.Mock).mockResolvedValue(fakePatients);

      const result = await getPatientServices();

      expect(Patient.find).toHaveBeenCalled();
      expect(result).toEqual(fakePatients);
    });
  });

  // ✅ GET PATIENT BY ID
  describe('getPatientByidServices', () => {
    it('should return patient when found', async () => {
      const fakePatient = { id: '1' };

      (Patient.findById as jest.Mock).mockResolvedValue(fakePatient);

      const result = await getPatientByidServices('123');

      expect(Patient.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(fakePatient);
    });

    it('should log and throw when db fails', async () => {
      const error = new Error('fail');

      (Patient.findById as jest.Mock).mockRejectedValue(error);

      await expect(getPatientByidServices('123')).rejects.toThrow();
      expect(logger.error).toHaveBeenCalled();
    });
  });

  // ✅ GET PATIENT HISTORY
  describe('getPatientHistoryService', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return patient history when exists', async () => {
      const fakeHistory = [
        {
          vitals: {
            weight: 72,
            height: 1.7,
            pressure: '120/80',
          },
          _id: '123',
          date: '2025-11-28T03:37:39.605Z',
          doctor: 'Dr. Test',
          reason: 'Revisión',
          diagnosis: 'Sano',
          treatment: 'Ninguno',
        },
      ];

      (Consultation.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(fakeHistory),
      });

      const result = await getPatientHistoryService('123');

      expect(Consultation.find).toHaveBeenCalledWith(
        { patientId: '123' },
        'vitals date diagnosis treatment reason doctor'
      );

      expect(Consultation.find).toHaveBeenCalled();
      expect(result).toEqual(fakeHistory);
    });

    it('should return empty array when no history exists', async () => {
      (Consultation.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      const result = await getPatientHistoryService('123');

      expect(result).toEqual([]);
    });

    it('should throw error when db fails', async () => {
      const error = new Error('Get error history Patient');

      (Consultation.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockRejectedValue(error),
      });

      await expect(getPatientHistoryService('123')).rejects.toThrow(error);

      expect(logger.error).toHaveBeenCalled();
    });
  });

  // ✅ DELETE PATIENT
  describe('deletePatienByIdService', () => {
    it('should delete patient', async () => {
      (Patient.findByIdAndUpdate as jest.Mock).mockResolvedValue({ id: '1' });

      await deletePatienByIdService('123');

      expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith('123', { isDeleted: true });
    });

    it('should throw NotFoundError when not found', async () => {
      (Patient.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(deletePatienByIdService('123')).rejects.toThrow(NotFoundError);
    });
  });

  // ✅ UPDATE PATIENT
  describe('updatedPatientbyIdService', () => {
    it('should update patient', async () => {
      const body = { name: 'Nuevo' };
      const updated = { id: '1', ...body };

      (Patient.findByIdAndUpdate as jest.Mock).mockResolvedValue(updated);

      const result = await updatedPatientbyIdService('1', body as object);

      expect(result).toEqual(updated);
    });

    it('should return undefined when not found', async () => {
      (Patient.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(deletePatienByIdService('123')).rejects.toThrow(NotFoundError);
    });
  });
});
