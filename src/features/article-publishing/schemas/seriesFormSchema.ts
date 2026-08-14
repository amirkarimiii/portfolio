import { z } from 'zod';
import { seriesIdentitySchema } from './seriesIdentitySchema';

export const seriesFormSchema = z.object({
    ...seriesIdentitySchema.shape,
});

export type SeriesFormValues = z.infer<typeof seriesFormSchema>;