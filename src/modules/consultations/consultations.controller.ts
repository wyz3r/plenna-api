import { Response, Request, NextFunction } from 'express';
import { Consultation } from '../../models/consultation.model';
import { logger } from '../../utils/logger';
import { Patient } from '../../models/patient.model';
import { NotFoundError } from '../../utils/errors/errors';

export const createConsultation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('createConsultation');
    const { patientId } = req.body;
    const patientExists = await Patient.exists({ _id: patientId });

    if (!patientExists) {
      throw new NotFoundError('Patient Not Found');
    }

    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    next(error);
  }
};
