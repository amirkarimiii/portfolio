import { z } from 'zod';

export const seoSchema = z.object({
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val || val.trim() === '') return true;
                try {
                    const url = new URL(val);
                    return url.protocol === 'https:';
                } catch {
                    return false;
                }
            },
            {
                message: 'Must be a valid absolute URL (e.g., https://example.com/article)',
            }
        ),
});

export type SEOFormValues = z.infer<typeof seoSchema>;