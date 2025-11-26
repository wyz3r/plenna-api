import dotenv from 'dotenv';
import { Patient } from '../models/patient.model';
import { Consultation } from '../models/consultation.model';
import { connectDB } from '../config/database';
dotenv.config();
async function seedMassive() {
  try {
    await connectDB();

    for (let i = 1; i <= 10; i++) {
      const patient = await Patient.create({
        name: `Paciente ${i}`,
        lastName: 'Test',
        age: 20 + i,
        gender: i % 2 === 0 ? 'F' : 'M',
        phone: `55100000${i}`,
        email: `paciente${i}@test.com`,
        medicalProfile: {
          bloodType: 'A+',
          allergies: [],
          chronicDiseases: [],
        },
      });

      await Consultation.create({
        patientId: patient._id,
        date: new Date(),
        doctor: 'Dr. Test',
        reason: 'Revisión',
        diagnosis: 'Sano',
        treatment: 'Ninguno',
        vitals: {
          weight: 70 + i,
          height: 1.7,
          pressure: '120/80',
        },
      });
    }

    console.log('✅ super massive seed created');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedMassive();
