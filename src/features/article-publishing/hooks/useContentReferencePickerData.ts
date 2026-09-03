'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublishedArticlesAction } from '../actions/articleAction';
import { getSeriesListAction } from '../actions/seriesActions';
import { ArticleCardData, SeriesCardData } from '../types/reference-card.type';

interface UseContentReferencePickerDataProps {
    type: 'article' | 'series';
    enabled?: boolean;
}

export function useContentReferencePickerData({
                                                  type,
                                                  enabled = true,
                                              }: UseContentReferencePickerDataProps) {
    return useQuery<(ArticleCardData | SeriesCardData)[]>({
        queryKey: ['contentReferencePickerData', type],
        queryFn: async () => {
            if (type === 'series') {
                return await getSeriesListAction();
            }
            return await getPublishedArticlesAction();
        },
        enabled,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}