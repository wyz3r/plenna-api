import { z } from 'zod';

export const GetPatientHistoryDTO = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export type GetPatientHistoryDTOType = z.infer<typeof GetPatientHistoryDTO>;
