import { Response, Request, NextFunction } from 'express';
import { logger } from '../../utils/logger';
import { getPatientByidServices } from '../patients/patien.service';
import { createConsultationServices } from './consultations.service';

export const createConsultation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('createConsultation');
    const { patientId } = req.body;
    await getPatientByidServices(patientId);

    const consultation = await createConsultationServices(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    next(error);
  }
};
