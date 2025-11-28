import { Request, Response, NextFunction } from 'express';
import { UpdatePatientDTOType } from '../dtos/create-patient.dto';

export const validateUpdatePatient = (req: Request, res: Response, next: NextFunction) => {
  const result = UpdatePatientDTOType.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 'error',
      errors: result.error.issues,
    });
  }

  req.body = result.data; // ✅ solo campos válidos
  next();
};
