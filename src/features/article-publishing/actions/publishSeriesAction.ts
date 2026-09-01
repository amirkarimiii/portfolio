'use server';

import { type SeriesFormValues } from '../schemas/seriesFormSchema';
import { SeriesService } from '../services/seriesService';
import { SeriesItem } from "@/features/article-publishing/types/series-item.type";
import { ApiResponse, ErrorCode } from "@/shared/types/api";
import { logger } from "@/shared/logger/logger";

export async function publishSeriesAction(
    formData: SeriesFormValues
): Promise<ApiResponse<SeriesItem>> {
    if (!formData) {
        logger.warn('publishSeriesAction called with empty formData', {
            context: 'publishSeriesAction',
        });
        return {
            success: false,
            error: {
                code: ErrorCode.VALIDATION_ERROR,
                message: 'Form data is required to publish a series.',
            },
        };
    }

    try {
        return await SeriesService.publishSeries(formData);
    } catch (err) {
        logger.error(
            err as Error,
            'Failed to create series',
            { context: 'publishSeriesAction', slug: formData.slug }
        );
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred while saving the series.',
            },
        };
    }
}