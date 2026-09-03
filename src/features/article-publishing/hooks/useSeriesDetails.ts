'use client';

import { useQuery } from '@tanstack/react-query';
import { getSeriesListAction } from '../actions/seriesActions';
import { SeriesCardData } from '../types/reference-card.type';

export function useSeriesDetails(seriesId: string | null | undefined): SeriesCardData | null {
    const { data: seriesList = [] } = useQuery<SeriesCardData[]>({
        queryKey: ['contentReferencePickerData', 'series'],
        queryFn: async () => await getSeriesListAction(),
        staleTime: 1000 * 60 * 5,
        enabled: Boolean(seriesId),
    });

    if (!seriesId) return null;

    return seriesList.find((series) => series.uniqueId === seriesId) || null;
}