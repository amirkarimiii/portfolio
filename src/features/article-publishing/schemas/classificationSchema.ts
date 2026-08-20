import { z } from 'zod';

export const classificationSchema = z.object({
    tags: z
        .array(
            z
                .string()
                .min(2, { message: 'Tag must be at least 2 characters long.' })
                .max(30, { message: 'Tag cannot exceed 30 characters.' })
        )
        .refine((items) => new Set(items).size === items.length, {
            message: 'Duplicate tags are not allowed.',
        }),
    seriesId: z.string().nullable().optional(),
});

export type ClassificationFormValues = z.infer<typeof classificationSchema>;