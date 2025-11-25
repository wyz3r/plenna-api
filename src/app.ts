import express from 'express';

import { logger } from './utils/logger';
import { requestLogger } from './utils/requestLogger';
import { errorHandler } from './utils/errorHandler';
import { emptyPostValidation } from './utils/emptyPostValidation';
import { notFoundHandler } from './utils/notFoundHandler';
import { unificationSchedule } from './modules/schedule/schedule.service';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(emptyPostValidation);

app.get('/', (_req, res) => {
  logger.info('health check');
  res.json({ message: 'API is working!!!!!' });
});

app.get('/doctors/availability', async (req, res) => {
  logger.info('schedules info json ');
  const { date } = req.query;
  const resjson = await unificationSchedule(date);
  return res.json(resjson);
});

app.post('/', async (req, res) => {
  const { params, body } = req;
  console.log({ params });
  console.log({ body });
  return res.json({});
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
