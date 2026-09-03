'use client';

import React from 'react';
import { ContentCard } from '@/features/article-publishing/components/reference-card/ContentCard';
import { useArticleDetails } from '@/features/article-publishing/hooks/useArticleDetails';
import { useSeriesDetails } from '@/features/article-publishing/hooks/useSeriesDetails';
import {ArticleCardData} from "@/features/article-publishing/types/reference-card.type";

interface ContentReferenceCardProps {
    refId: string | null;
    refType: 'article' | 'series';
}

export const DynamicReferenceCard: React.FC<ContentReferenceCardProps> = ({
                                                                              refId,
                                                                              refType,
                                                                          }) => {
    const isArticle = refType === 'article';
    const isSeries = refType === 'series';

    const {
        data: articleData,
        isLoading: isArticleLoading,
    } = useArticleDetails(isArticle ? refId : null);

    const seriesData = useSeriesDetails(isSeries ? refId : null);

    if (!refId) {
        return <ContentCard isUnavailable={true} type={refType} />;
    }

    if (isArticle) {
        if (isArticleLoading) {
            return (
                <div className="w-full h-42 rounded-xl bg-muted animate-pulse border" />
            );
        }

        if (!articleData) {
            return <ContentCard isUnavailable={true} type="article" />;
        }

        return (
            <ContentCard
                type="article"
                data={articleData as ArticleCardData}
                selective={true}
                target="_blank"
                origin="paper"
            />
        );
    }

    if (isSeries) {
        if (!seriesData) {
            return <ContentCard isUnavailable={true} type="series" />;
        }

        return (
            <ContentCard
                type="series"
                data={seriesData}
                selective={true}
                target="_blank"
            />
        );
    }

    return <ContentCard isUnavailable={true} type={refType} />;
};