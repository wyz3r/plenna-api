import { z } from 'zod';

export const GetPatientsDTO = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.enum(['M', 'F']).optional(),
  age: z.coerce.number().int().min(0).optional(),
});

export type GetPatientsDTOType = z.infer<typeof GetPatientsDTO>;
