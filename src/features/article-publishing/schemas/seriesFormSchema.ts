import { z } from 'zod';
import { seriesIdentitySchema } from './seriesIdentitySchema';
import { seriesClassificationSchema } from './seriesClassificationSchema';

export const seriesFormSchema = z.object({
    ...seriesIdentitySchema.shape,
    ...seriesClassificationSchema.shape,
});

export type SeriesFormValues = z.infer<typeof seriesFormSchema>;