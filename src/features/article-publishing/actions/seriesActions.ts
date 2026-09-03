'use server';

import { SeriesService } from '../services/seriesService';
import { logger } from '@/shared/logger/logger';
import {SeriesItem} from "@/features/article-publishing/types/series-item.type";

export async function getSeriesByIdAction(
    seriesId: string
): Promise<SeriesItem | null> {
    try {
        return await SeriesService.getSeriesById(seriesId);
    } catch (error) {
        logger.error(error as Error, 'Failed to fetch series card data action', {
            context: 'getSeriesCardDataAction',
            seriesId,
        });
        return null;
    }
}