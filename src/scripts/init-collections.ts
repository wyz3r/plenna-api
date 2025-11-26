import mongoose from 'mongoose';
import dotenv from 'dotenv';
import '../models/patient.model';
import '../models/consultation.model';
import { logger } from '../utils/logger';
import { connectDB } from '../config/database';
dotenv.config();

async function initCollections() {
  try {
    await connectDB();
    const client = mongoose.connection.getClient();
    const db = client.db();
    const collections = await db.listCollections().toArray();
    const names = collections.map((c) => c.name);

    if (!names.includes('patients')) {
      await db.createCollection('patients');
      logger.info('📁 Collections patients created');
    }

    if (!names.includes('consultations')) {
      await db.createCollection('consultations');
      console.log('📁 Collections consultations created');
    }
    logger.info('✅ COLLECTIONS READY ');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error:', error);
    process.exit(1);
  }
}

initCollections();
