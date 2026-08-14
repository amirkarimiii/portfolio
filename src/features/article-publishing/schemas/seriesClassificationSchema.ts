import { z } from 'zod';

export const seriesClassificationSchema = z.object({
    defaultTags: z
        .array(
            z
                .string()
                .min(2, { message: 'Tag must be at least 2 characters long.' })
                .max(30, { message: 'Tag cannot exceed 30 characters.' })
        )
        .refine((items) => new Set(items).size === items.length, {
            message: 'Duplicate tags are not allowed.',
        }),
});

export type SeriesClassificationFormValues = z.infer<typeof seriesClassificationSchema>;