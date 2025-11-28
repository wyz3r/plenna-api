import { z } from 'zod';

export const SchedulesParamsSchema = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid Format (YYYY-MM-DD)')
      .refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) && value === date.toISOString().split('T')[0];
      }, 'Invalid Date ')
      .optional(),
  })
  .strict();

export type SchedulesParams = z.infer<typeof SchedulesParamsSchema>;
