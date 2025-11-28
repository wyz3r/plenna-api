import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { GetPatientByIdDTOType } from '../../dtos/get-patient-by-id.dto';
import { CreatePatientDTOType } from '../../dtos/create-patient.dto';
import { NotFoundError } from '../../utils/errors/errors';
import {
  createPatientService,
  deletePatienByIdService,
  getPatientByidServices,
  getPatientHistoryService,
  getPatientServices,
  updatedPatientbyIdService,
} from './patien.service';

export const createPatient = async (
  req: Request<object, object, CreatePatientDTOType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await createPatientService(req.body);
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const patients = await getPatientServices();
    res.json(patients);
  } catch (error) {
    logger.error('getPatients', error);
    next(error);
  }
};

export const getPatientById = async (
  req: Request<GetPatientByIdDTOType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const patient = await getPatientByidServices(id);
    if (!patient) {
      throw new NotFoundError('Patient Not Found');
    }
    res.json(patient);
  } catch (error) {
    logger.error('getPatientById', error);
    next(error);
  }
};

export const getPatientHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('getPatientHistory start');
    const id = req.params.id;
    const patient = await getPatientByidServices(id);
    const history = await getPatientHistoryService(id);

    const response = {
      name: patient?.name,
      lastname: patient?.lastName,
      history,
    };

    res.json(response);
  } catch (error) {
    logger.error('getPatientHistory', error);
    next(error);
  }
};

export async function deletedPatientById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await deletePatienByIdService(id);
    res.status(200).json({
      message: 'patient deleted',
    });
  } catch (error) {
    logger.error('deletedPatientById');
    next(error);
  }
}

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedPatient = await updatedPatientbyIdService(id, body);

    if (!updatedPatient) {
      throw new NotFoundError('Patient not found');
    }
    res.json(updatedPatient);
  } catch (error) {
    next(error);
  }
};
