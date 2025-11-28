import dotenv from 'dotenv';
import { Patient } from '../models/patient.model';
import { Consultation } from '../models/consultation.model';
import { connectDB } from '../config/database';
dotenv.config();
async function seedBasic() {
  try {
    await connectDB();
    const patient = await Patient.create({
      name: 'Juan',
      lastName: 'Pérez',
      age: 35,
      gender: 'M',
      phone: '5512345678',
      email: 'juan@test.com',
      isDeleted: false,
      medicalProfile: {
        bloodType: 'O+',
        allergies: ['Polen'],
        chronicDiseases: ['Diabetes'],
      },
    });

    await Consultation.create({
      patientId: patient._id,
      date: new Date(),
      doctor: 'Dr. García',
      reason: 'Dolor de cabeza',
      diagnosis: 'Migraña',
      treatment: 'Paracetamol',
      notes: 'Reposo 24h',
      vitals: {
        weight: 72,
        height: 1.75,
        pressure: '120/80',
      },
    });

    console.log('✅ Seed created');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in seed:', error);
    process.exit(1);
  }
}

seedBasic();
