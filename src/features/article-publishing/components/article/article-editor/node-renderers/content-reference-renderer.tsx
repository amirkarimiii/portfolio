import React from 'react';
import mockPublishedArticles from '@/mock-files/new-published-articles.json';
import mockSeries from '@/mock-files/new-series.json';
import { ContentCard } from '@/features/article-publishing/components/reference-card/ContentCard';
import {
    ArticleCardData,
    SeriesCardData,
} from '@/features/article-publishing/types/reference-card.type';
import {
    NodeRendererContext,
    NodeRendererStrategy,
    TipTapNode
} from "@/features/article-publishing/types/node-renderers.type";

export const contentReferenceStrategy: NodeRendererStrategy = {
    canRender: (node: TipTapNode) => node.type === 'contentReference',

    render: (
        node: TipTapNode,
        index: number,
        _context: NodeRendererContext
    ): React.ReactNode => {
        const refId = node.attrs?.id as string | null;
        const refType = (node.attrs?.type as 'article' | 'series') || 'article';

        if (!refId) {
            return (
                <div key={index} className="my-6 max-w-2xl">
                    <ContentCard isUnavailable={true} type={refType} />
                </div>
            );
        }

        let cardData: ArticleCardData | SeriesCardData | null = null;
        let isUnavailable = false;

        if (refType === 'article') {
            const allArticles = [
                ...((mockPublishedArticles as { articles?: ArticleCardData[] }).articles || []),
            ];

            const found = allArticles.find((art) => art.uniqueId === refId);
            if (found && found.lifecycle === 'Published') {
                cardData = found;
            } else {
                isUnavailable = true;
            }
        } else if (refType === 'series') {
            const seriesList =
                (mockSeries as { series?: SeriesCardData[] }).series || [];
            const found = seriesList.find((s) => s.uniqueId === refId);
            if (found) {
                cardData = found;
            } else {
                isUnavailable = true;
            }
        }

        return (
            <div key={index} className="my-6 max-w-2xl">
                {isUnavailable || !cardData ? (
                    <ContentCard isUnavailable={true} type={refType} />
                ) : refType === 'article' ? (
                    <ContentCard
                        type="article"
                        data={cardData as ArticleCardData}
                        selective={true}
                        target="_blank"
                        origin="paper"
                    />
                ) : (
                    <ContentCard
                        type="series"
                        data={cardData as SeriesCardData}
                        selective={true}
                        target="_blank"
                    />
                )}
            </div>
        );
    },
};