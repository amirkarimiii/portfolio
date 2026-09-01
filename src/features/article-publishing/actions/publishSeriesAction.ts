'use server';

import { type SeriesFormValues } from '../schemas/seriesFormSchema';
import { SeriesService } from '../services/seriesService';
import { SeriesItem } from "@/features/article-publishing/types/series-item.type";
import { ApiResponse, ErrorCode } from "@/shared/types/api";

export async function publishSeriesAction(
    formData: SeriesFormValues
): Promise<ApiResponse<SeriesItem>> {
    try {
        return await SeriesService.publishSeries(formData);
    } catch (err) {
        console.error('Failed to create series:', err);
        return {
            success: false,
            error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred while saving the series.',
            },
        };
    }
}