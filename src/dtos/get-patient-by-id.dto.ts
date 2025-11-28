import { z } from 'zod';

export const GetPatientByIdDTO = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export type GetPatientByIdDTOType = z.infer<typeof GetPatientByIdDTO>;
