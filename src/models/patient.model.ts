import { Schema, model } from 'mongoose';

export interface Patient {
  name: string;
  lastName: string;
  age: number;
  gender: 'M' | 'F';
  email: string;
  medicalProfile: object;
  phone: string;
  birthDate: Date;
  address: string;
}

const PatientSchema = new Schema<Patient>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: String,
    email: String,
    medicalProfile: {
      bloodType: String,
      allergies: [String],
      chronicDiseases: [String],
    },
  },
  { timestamps: true }
);

export const Patient = model('Patient', PatientSchema);
