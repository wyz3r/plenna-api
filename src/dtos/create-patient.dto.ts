import { z } from 'zod';

export const CreatePatientDTO = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  age: z.number().int().min(0),
  gender: z.enum(['M', 'F']),
  phone: z.string().optional(),
  email: z.string().email().optional(),

  medicalProfile: z
    .object({
      bloodType: z.string().optional(),
      allergies: z.array(z.string()).optional(),
      chronicDiseases: z.array(z.string()).optional(),
    })
    .optional(),
});

export type CreatePatientDTOType = z.infer<typeof CreatePatientDTO>;
export const UpdatePatientDTOType = CreatePatientDTO.partial();
