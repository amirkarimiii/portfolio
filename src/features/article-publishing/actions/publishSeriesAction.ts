'use server';

import { seriesFormSchema, type SeriesFormValues } from '../schemas/seriesFormSchema';
import { SeriesRepository, type Series } from '../repository/seriesRepository';

export type PublishSeriesActionResult =
    | { success: true; data: Series }
    | { success: false; error: string; field?: keyof SeriesFormValues };

export async function publishSeriesAction(
    formData: SeriesFormValues
): Promise<PublishSeriesActionResult> {
    try {
        const validationResult = seriesFormSchema.safeParse(formData);
        if (!validationResult.success) {
            const issue = validationResult.error.issues[0];
            return {
                success: false,
                error: issue?.message || 'Invalid form data',
                field: issue?.path[0] as keyof SeriesFormValues,
            };
        }

        const validData = validationResult.data;

        const slugExists = await SeriesRepository.isSlugExists(validData.slug);
        if (slugExists) {
            return {
                success: false,
                error: 'A series with this slug already exists.',
                field: 'slug',
            };
        }

        const savedSeries = await SeriesRepository.saveSeries(validData);

        return { success: true, data: savedSeries };
    } catch (err) {
        console.error('Failed to create series:', err);
        return { success: false, error: 'An unexpected error occurred while saving the series.' };
    }
}