import {z} from 'zod';

export const authSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Exactly10digitsrequired'),
});




