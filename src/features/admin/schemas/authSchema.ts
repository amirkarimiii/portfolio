import { z } from 'zod';

export const LoginInputSchema = z.object({
    password: z
        .string({
            message: 'Password must be a valid string',
        })
        .trim()
        .min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;