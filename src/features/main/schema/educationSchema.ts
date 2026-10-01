import { z } from 'zod';

export const degreeLevelEnum = z.enum([
    'bachelor',
    'master',
]);

export const educationSchema = z.object({
    degree: z.object({
        level: degreeLevelEnum,
        field: z.string().min(1),
    }),

    institution: z.object({
        name: z.string().min(1),
        website: z.url(),
        logo: z.url(),
    }),

    date: z.object({
        start: z.number().int(),
        end: z.number().int().optional(),
    }),
});

export type Education = z.infer<typeof educationSchema>;
export type DegreeLevel = z.infer<typeof degreeLevelEnum>;