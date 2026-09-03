'use server';

import { SeriesService } from '../services/seriesService';
import { logger } from '@/shared/logger/logger';
import {SeriesItem} from "@/features/article-publishing/types/series-item.type";
import { SeriesCardData } from '../types/reference-card.type';


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


export async function getSeriesListAction(): Promise<SeriesCardData[]> {
    try {
        const result = await SeriesService.getPaginatedSeries({ page: '1', pageSize: 50 });
        return result.series;
    } catch (error) {
        logger.error(error as Error, 'Failed to fetch series list action', {
            context: 'getSeriesListAction',
        });
        return [];
    }
}