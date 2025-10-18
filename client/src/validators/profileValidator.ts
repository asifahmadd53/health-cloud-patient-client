import {z} from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(100, 'Name must not exceed 100 characters')
    .trim()
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      'Name can only contain alphabets and single spaces',
    ),
  gender: z.enum(['Male', 'Female']).optional(),
  marital: z.enum(['Single', 'Married']).optional(),
  dob: z.date().optional(),
  location: z.string().optional(),
});
