import { z } from 'zod';
import { createSeriesIdentitySchema } from './seriesIdentitySchema';
import { seriesClassificationSchema } from './seriesClassificationSchema';
import { assetsSchema } from "@/features/article-publishing/schemas/assetsSchema";
import { seoSchema } from "@/features/article-publishing/schemas/seoSchema";

export const createSeriesFormSchema = (reservedSlugs: string[] = []) => {
    const seriesIdentitySchema = createSeriesIdentitySchema(reservedSlugs);

    return z.object({
        ...seriesIdentitySchema.shape,
        ...seriesClassificationSchema.shape,
        ...assetsSchema.shape,
        ...seoSchema.shape,
    });
};

export type SeriesFormValues = z.infer<ReturnType<typeof createSeriesFormSchema>>;