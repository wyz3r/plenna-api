import { Consultation } from '../../models/consultation.model';
import { DatabaseError } from '../../utils/errors/errors';
import { logger } from '../../utils/logger';

const createConsultationServices = async (body: object) => {
  try {
    const consultation = await Consultation.create(body);
    return consultation;
  } catch (error) {
    logger.error('createConsultationServices', error);
    throw new DatabaseError('error during the creation of consultation');
  }
};

export { createConsultationServices };
