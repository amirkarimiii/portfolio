import { z } from 'zod';

export const assetsSchema = z.object({
    coverImage: z
        .string()
        .min(1, 'Cover image is required'),

    coverAltText: z
        .string()
        .min(1, 'Cover Alt text is required for accessibility and SEO'),

    thumbnailImage: z
        .string()
        .min(1, 'Thumbnail image is required'),

    thumbnailAltText: z
        .string()
});

export type AssetsFormValues = z.infer<typeof assetsSchema>;