'use client';

import { useQuery } from '@tanstack/react-query';
import { getSeriesListAction } from '../actions/seriesActions';

export function useSeriesDefaultTags(seriesId: string | null | undefined) {
    const { data: seriesList = [] } = useQuery({
        queryKey: ['contentReferencePickerData', 'series'],
        queryFn: async () => await getSeriesListAction(),
        staleTime: 1000 * 60 * 5,
    });

    if (!seriesId) return [];

    const selectedSeries = seriesList.find((series) => series.uniqueId === seriesId);
    return selectedSeries?.defaultTags || [];
}