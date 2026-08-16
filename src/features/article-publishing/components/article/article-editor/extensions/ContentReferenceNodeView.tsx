'use client';

import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/shared/utils/shadcnUtils';
import { Button } from '@/shared/components/ui/button';
import { ContentCard } from '@/features/article-publishing/components/cards-and-modals/ContentCard';
import { ContentReferencePickerPopover } from './ContentReferencePickerPopover';
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

    const handleSelectContent = (selectedId: string) => {
        updateAttributes({ id: selectedId });
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
                        'rounded-xl transition-all',
                        selected && 'ring-2 ring-primary ring-offset-2'
                    )}
                >
                    <ContentReferencePickerPopover
                        type={type}
                        onSelect={handleSelectContent}
                    />
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

                <div className="flex h-10 w-full flex-row items-center justify-center md:h-auto md:w-12 md:flex-col">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleResetSelection}
                        className="flex-1 w-full"
                        title="Remove series assignment"
                    >
                        <div className="w-4 aspect-square">
                            <RefreshCw />
                        </div>
                        <span className="sr-only">Remove series</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleDeleteNode}
                        className="flex-1 w-full"
                        title="Remove series assignment"
                    >
                        <div className="w-4 aspect-square my-auto">
                            <Trash2 />
                        </div>
                        <span className="sr-only">Remove series</span>
                    </Button>
                </div>
            </div>
        </NodeViewWrapper>
    );
};

export default ContentReferenceNodeView;