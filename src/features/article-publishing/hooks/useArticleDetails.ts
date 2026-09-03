'use client';

import { useQuery } from '@tanstack/react-query';
import {getPublishedArticleByIdAction} from "@/features/article-publishing/actions/articleAction";
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";

export function useArticleDetails(articleId: string | null) {
    return useQuery<ArticleItem | null>({
        queryKey: ['contentReference', 'article', articleId],
        queryFn: async () => {
            if (!articleId) return null;
            return await getPublishedArticleByIdAction(articleId);
        },
        staleTime: 1000 * 60 * 5,
        enabled: Boolean(articleId),
    });
}