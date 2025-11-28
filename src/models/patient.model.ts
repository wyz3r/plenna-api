import { Query, Schema, model } from 'mongoose';

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
  isDeleted: boolean;
}

const PatientSchema = new Schema<Patient>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: String,
    email: String,
    isDeleted: { type: Boolean, default: false },
    medicalProfile: {
      bloodType: String,
      allergies: [String],
      chronicDiseases: [String],
    },
  },
  { timestamps: true }
);

PatientSchema.pre<Query<Patient[], Patient>>(/^find/, function () {
  this.where({ isDeleted: false });
});

export const Patient = model('Patient', PatientSchema);
