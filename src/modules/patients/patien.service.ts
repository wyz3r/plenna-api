import { IPatient } from '../../interfaces/patient.interface';
import { Consultation } from '../../models/consultation.model';
import { Patient } from '../../models/patient.model';
import { AppError } from '../../utils/errors/AppError';
import { DatabaseError, NotFoundError } from '../../utils/errors/errors';
import { logger } from '../../utils/logger';

const createPatientService = async (body: object) => {
  try {
    const patient = await Patient.create(body);
    logger.info('Patient Created');
    return patient;
  } catch (error) {
    logger.error('createPatientService', error);
    throw new DatabaseError('Error creating patient');
  }
};

const getPatientServices = async () => {
  try {
    const patient = await Patient.find();
    logger.info('Patients Found');
    return patient;
  } catch (error) {
    logger.error('getPatientServices', error);
    throw new DatabaseError('Get error Patients');
  }
};

const getPatientByidServices = async (id: string): Promise<IPatient | undefined> => {
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      throw new NotFoundError('Patient not Found');
    }
    logger.info('Patient Found');
    return patient;
  } catch (error: unknown) {
    logger.error('getPatientByidServices', { error });
    // Si ya es un error de tu dominio, solo relánzalo
    if (error instanceof AppError) {
      throw error;
    }
    // Si es error de Mongo
    throw new DatabaseError('Error retrieving patient');
  }
};

const getPatientHistoryService = async (id: string) => {
  try {
    const history = await Consultation.find(
      {
        patientId: id,
      },
      'vitals date diagnosis treatment reason doctor'
    ).sort({ date: -1 });
    logger.info('History Found');

    return history;
  } catch (error) {
    logger.error('getPatientByidServices', error);
    throw new DatabaseError('Get error history Patient');
  }
};

const deletePatienByIdService = async (id: string) => {
  try {
    const patientupdate = await Patient.findByIdAndUpdate(id, { isDeleted: true });
    if (!patientupdate) {
      throw new NotFoundError('Patient Not Found');
    }
    logger.info('Patient updated');
    return patientupdate;
  } catch (error) {
    logger.error('deletePatienByIdService', { error });
    // Si ya es un error de tu dominio, solo relánzalo
    if (error instanceof AppError) {
      throw error;
    }
    // Si es error de Mongo
    throw new DatabaseError('Error deleting patient');
  }
};

const updatedPatientbyIdService = async (id: string, body: object) => {
  const updatedPatient = await Patient.findByIdAndUpdate(
    id,
    { $set: body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPatient) {
    throw new NotFoundError('Patient not found');
  }
  return updatedPatient;
};

export {
  createPatientService,
  getPatientServices,
  getPatientByidServices,
  getPatientHistoryService,
  deletePatienByIdService,
  updatedPatientbyIdService,
};
