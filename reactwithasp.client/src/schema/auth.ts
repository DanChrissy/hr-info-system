import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({ message: 'Email is required'})
        .min(1, { message: "Email is required"})
        .email({ message: "Email is invalid"})
        .trim(),
    password: z
        .string({ message: "Password is required"})
        .min(1, { message: "Password is required"})
        .trim(),
});