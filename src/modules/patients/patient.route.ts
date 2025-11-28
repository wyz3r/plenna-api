import { Router } from 'express';
import {
  createPatient,
  getPatients,
  getPatientById,
  getPatientHistory,
  deletedPatientById,
  updatePatient,
} from './patient.controller';
import { validate } from '../../utils/validate';
import { GetPatientByIdDTO } from '../../dtos/get-patient-by-id.dto';
import { CreatePatientDTO } from '../../dtos/create-patient.dto';
import { GetPatientHistoryDTO } from '../../dtos/get-patient-history';
import { validateUpdatePatient } from '../../utils/validationUpdatePatient';

const router = Router();

router.get('/', getPatients);
router.get('/history/:id', validate(GetPatientHistoryDTO, 'params'), getPatientHistory);
router.get('/:id', validate(GetPatientByIdDTO, 'params'), getPatientById);
router.post('/', validate(CreatePatientDTO, 'body'), createPatient);
router.patch('/:id', validate(GetPatientByIdDTO, 'params'), validateUpdatePatient, updatePatient);
router.delete('/delete/:id', validate(GetPatientByIdDTO, 'params'), deletedPatientById);

export default router;
