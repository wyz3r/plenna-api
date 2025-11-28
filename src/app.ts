import express from 'express';

import { logger } from './utils/logger';
import { requestLogger } from './utils/requestLogger';
import { errorHandler } from './utils/errorHandler';
import { emptyPostValidation } from './utils/emptyPostValidation';
import { notFoundHandler } from './utils/notFoundHandler';
import doctorRoutes from './modules/schedule/schedule.route';
import patientRoutes from './modules/patients/patient.route';
import consultationRoute from './modules/consultations/consultations.route';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(emptyPostValidation);

app.get('/health', (_req, res) => {
  logger.info('health check');
  res.json({ message: 'API is working!!!!!' });
});

// routes
app.use('/doctors', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/consultation', consultationRoute);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
