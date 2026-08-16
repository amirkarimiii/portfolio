'use client';

import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/shared/utils/shadcnUtils';
import { Button } from '@/shared/components/ui/button';
import { ContentCard } from '@/features/article-publishing/components/cards-and-modals/ContentCard';
import dummyData from '@/dummy-content.json';
import {
    ArticleCardData,
    SeriesCardData,
} from '@/features/article-publishing/types/reference-card.type';

export const ContentReferenceNodeView: React.FC<NodeViewProps> = ({
                                                                      node,
                                                                      updateAttributes,
                                                                      deleteNode,
                                                                      selected,
                                                                  }) => {
    const { id, type } = node.attrs as {
        id: string | null;
        type: 'article' | 'series';
    };

    const handleResetSelection = () => {
        updateAttributes({ id: null });
    };

    const handleDeleteNode = () => {
        deleteNode();
    };

    if (!id) {
        return (
            <NodeViewWrapper className="my-4">
                <div
                    className={cn(
                        'flex min-h-[140px] max-w-2xl items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-6 transition-all',
                        selected && 'ring-2 ring-primary ring-offset-2'
                    )}
                >
          <span className="text-sm text-muted-foreground">
            No {type} selected yet. Select a reference content to display here.
          </span>
                </div>
            </NodeViewWrapper>
        );
    }

    let cardData: ArticleCardData | SeriesCardData | null = null;
    let isUnavailable = false;

    if (type === 'article') {
        const articles = (dummyData as { articles?: ArticleCardData[] }).articles || [];
        const found = articles.find((art) => art._id === id);
        if (found && found.lifecycle !== 'archived') {
            cardData = found;
        } else {
            isUnavailable = true;
        }
    } else if (type === 'series') {
        const seriesList = (dummyData as { series?: SeriesCardData[] }).series || [];
        const found = seriesList.find((s) => s._id === id);
        if (found) {
            cardData = found;
        } else {
            isUnavailable = true;
        }
    }

    return (
        <NodeViewWrapper className="my-4 select-none">
            <div
                className={cn(
                    'group relative flex w-max max-w-2xl flex-col rounded-xl border border-border bg-card overflow-hidden transition-all md:flex-row shadow-sm',
                    selected && 'ring-2 ring-primary ring-offset-2'
                )}
            >
                <div className="flex-1 min-w-0">
                    {isUnavailable || !cardData ? (
                        <ContentCard isUnavailable={true} type={type} />
                    ) : type === 'article' ? (
                        <ContentCard
                            type="article"
                            data={cardData as ArticleCardData}
                            target="_blank"
                        />
                    ) : (
                        <ContentCard
                            type="series"
                            data={cardData as SeriesCardData}
                            selective={false}
                            target="_blank"
                        />
                    )}
                </div>

                <div className="flex h-10 w-full flex-row items-center justify-center border-t border-border bg-muted/40 transition-colors md:h-auto md:w-12 md:flex-col md:border-t-0 md:border-l">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleResetSelection}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        title="Reset selection"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Reset selection</span>
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleDeleteNode}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        title="Remove block"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove block</span>
                    </Button>
                </div>
            </div>
        </NodeViewWrapper>
    );
};

export default ContentReferenceNodeView;