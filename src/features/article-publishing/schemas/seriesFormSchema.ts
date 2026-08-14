import { z } from 'zod';
import { seriesIdentitySchema } from './seriesIdentitySchema';
import { seriesClassificationSchema } from './seriesClassificationSchema';
import {assetsSchema} from "@/features/article-publishing/schemas/assetsSchema";
import {seoSchema} from "@/features/article-publishing/schemas/seoSchema";

export const seriesFormSchema = z.object({
    ...seriesIdentitySchema.shape,
    ...seriesClassificationSchema.shape,
    ...assetsSchema.shape,
    ...seoSchema.shape,
});

export type SeriesFormValues = z.infer<typeof seriesFormSchema>;