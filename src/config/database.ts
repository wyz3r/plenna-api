import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI as string;
    const DB_NAME = process.env.DB_NAME as string;
    const DB_USER = process.env.DB_USER as string;
    const DB_PASS = process.env.DB_PASS as string;
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASS}@${MONGO_URI}/${DB_NAME}?authSource=admin`
    );
    logger.info('✅ Mongo connected');
  } catch (error) {
    logger.error('❌ Error Mongo', error);
    process.exit(1);
  }
};
