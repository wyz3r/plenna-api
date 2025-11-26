import { Schema, model } from 'mongoose';

const ConsultationSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    date: { type: Date, required: true },
    doctor: { type: String, required: true },
    reason: String,
    diagnosis: String,
    treatment: String,
    notes: String,

    vitals: {
      weight: Number,
      height: Number,
      pressure: String,
    },
  },
  { timestamps: true }
);

export const Consultation = model('Consultation', ConsultationSchema);
