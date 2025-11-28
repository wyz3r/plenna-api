import { NextFunction, Request, Response } from 'express';
import { Patient } from '../../models/patient.model';
import { logger } from '../../utils/logger';
import { GetPatientByIdDTOType } from '../../dtos/get-patient-by-id.dto';
import { CreatePatientDTOType } from '../../dtos/create-patient.dto';
import { Consultation } from '../../models/consultation.model';
import { NotFoundError } from '../../utils/errors/errors';

export const createPatient = async (
  req: Request<object, object, CreatePatientDTOType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    logger.error('createPatient ', error);
    next(error);
  }
};

export const getPatients = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const patients = await Patient.find();
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
    const patient = await Patient.findById(id);
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
    const patient = await Patient.findById(id).lean();

    if (!patient) {
      throw new NotFoundError('Patient Not Found');
    }

    const history = await Consultation.find(
      {
        patientId: req.params.id,
      },
      'vitals date diagnosis treatment reason doctor'
    ).sort({ date: -1 });

    const response = {
      name: patient.name,
      lastname: patient.lastName,
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
    const patientupdate = await Patient.findByIdAndUpdate(id, { isDeleted: true });
    if (!patientupdate) {
      throw new NotFoundError('Patient Not Found');
    }
    res.status(200).json({
      message: 'patient deleted',
      data: patientupdate,
    });
  } catch (error) {
    logger.error('deletedPatientById');
    next(error);
  }
}

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPatient) {
      throw new NotFoundError('Patient not found');
    }
    res.json(updatedPatient);
  } catch (error) {
    next(error);
  }
};
