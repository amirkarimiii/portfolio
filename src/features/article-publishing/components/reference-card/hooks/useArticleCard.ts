'use client';

import React from 'react';
import { ArticleCardData } from "@/features/article-publishing/types/reference-card.type";
import { useAdminSession } from "@/features/admin/hooks/useAdminAuth";
import { useSeriesDetails } from "@/features/article-publishing/hooks/useSeriesDetails";
import { getEffectiveTags } from "@/features/article-publishing/utils/tagUtils";

interface UseArticleCardProps {
    data: ArticleCardData;
    origin: "publish" | "archive" | "draft" | "paper";
}

export const useArticleCard = ({ data, origin }: UseArticleCardProps) => {
    const { data: session } = useAdminSession();
    const parentSeries = useSeriesDetails(data.seriesId);

    const destinationRoute = React.useMemo(() => {
        if (origin === "archive") {
            return `/admin/articles/archive/${data.uniqueId}`;
        }
        return data.seriesId && parentSeries?.slug
            ? `/series/${parentSeries.slug}/${data.slug}`
            : `/blog/${data.slug}`;
    }, [origin, data.uniqueId, data.seriesId, data.slug, parentSeries?.slug]);

    const effectiveTags = React.useMemo(
        () => getEffectiveTags(data.tags, parentSeries?.defaultTags || []),
        [data.tags, parentSeries]
    );

    const formattedDate = React.useMemo(() => {
        const rawDate = data.firstPublishedAt || data.publishedAt;
        if (!rawDate) return null;

        const parsedDate = new Date(rawDate);
        if (isNaN(parsedDate.getTime())) return null;

        return parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }, [data.firstPublishedAt, data.publishedAt]);

    return {
        isAuthenticated: !!session?.authenticated,
        destinationRoute,
        effectiveTags,
        formattedDate,
        parentSeriesTitle: parentSeries?.title,
    };
};