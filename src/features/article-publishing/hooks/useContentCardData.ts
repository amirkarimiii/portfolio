'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublishedArticleByIdAction } from '../actions/articleAction';
import {getSeriesByIdAction} from '../actions/seriesActions';
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";
import {SeriesItem} from "@/features/article-publishing/types/series-item.type";

interface UseContentCardDataProps {
    id: string | null;
    type: 'article' | 'series';
}

export function useContentCardData({ id, type }: UseContentCardDataProps) {
    return useQuery<ArticleItem | SeriesItem | null>({
        queryKey: ['contentCardData', type, id],
        queryFn: async () => {
            if (!id) return null;
            if (type === 'article') {
                return await getPublishedArticleByIdAction(id);
            }
            return await getSeriesByIdAction(id);
        },
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    });
}