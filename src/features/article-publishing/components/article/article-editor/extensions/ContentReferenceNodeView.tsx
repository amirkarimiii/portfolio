'use client';

import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/shared/utils/shadcnUtils';
import { Button } from '@/shared/components/ui/button';
import { ContentCard } from '../../../reference-card/ContentCard';
import { ContentReferencePickerPopover } from './ContentReferencePickerPopover';
import mockSeries from '@/mock-files/new-series.json';
import mockPublished from '@/mock-files/new-published-articles.json';
import {
    ArticleCardData,
    SeriesCardData,
} from '@/features/article-publishing/types/reference-card.type';
import { useArticleFormStore } from '@/features/article-publishing/stores/useArticleFormStore';
import {
    addInboundReferenceAction,
    removeInboundReferenceAction,
    changeInboundReferenceAction
} from '@/features/article-publishing/actions/inboundReferenceActions';

export const ContentReferenceNodeView: React.FC<NodeViewProps> = ({
                                                                      node,
                                                                      updateAttributes,
                                                                      deleteNode,
                                                                      selected,
                                                                      editor,
                                                                  }) => {
    const { id, type } = node.attrs as {
        id: string | null;
        type: 'article' | 'series';
    };

    const sourceArticleId = useArticleFormStore((state) => state.articleId);

    const getRemainingReferencesInDoc = (excludeCurrentNode = false) => {
        const refs: { id: string; type: 'article' | 'series' }[] = [];
        if (!editor) return refs;

        editor.state.doc.descendants((n) => {
            if (n.type.name === 'contentReference' && n.attrs.id) {
                if (excludeCurrentNode && n === node) {
                    return;
                }
                refs.push({
                    id: n.attrs.id as string,
                    type: (n.attrs.type as 'article' | 'series') || 'article',
                });
            }
        });

        return refs;
    };

    const handleSelectContent = async (selectedId: string) => {
        const oldId = id;

        updateAttributes({ id: selectedId });

        if (!sourceArticleId) return;

        const remainingRefs = getRemainingReferencesInDoc(true);

        if (!oldId) {
            await addInboundReferenceAction({
                sourceArticleId,
                targetId: selectedId,
                targetType: type,
            });
        } else if (oldId !== selectedId) {
            // حالت تغییر مرجع (B -> C)
            await changeInboundReferenceAction(
                sourceArticleId,
                { id: oldId, type },
                { id: selectedId, type },
                remainingRefs
            );
        }
    };

    const handleResetSelection = async () => {
        const oldId = id;
        updateAttributes({ id: null });

        if (sourceArticleId && oldId) {
            const remainingRefs = getRemainingReferencesInDoc(true);
            await removeInboundReferenceAction(
                {
                    sourceArticleId,
                    targetId: oldId,
                    targetType: type,
                },
                remainingRefs
            );
        }
    };

    const handleDeleteNode = async () => {
        const oldId = id;
        deleteNode();

        if (sourceArticleId && oldId) {
            const remainingRefs = getRemainingReferencesInDoc(true);
            await removeInboundReferenceAction(
                {
                    sourceArticleId,
                    targetId: oldId,
                    targetType: type,
                },
                remainingRefs
            );
        }
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
        const articles = (mockPublished as { articles?: ArticleCardData[] }).articles || [];
        const found = articles.find((art) => art.uniqueId === id);
        if (found && found.lifecycle !== 'archived') {
            cardData = found;
        } else {
            isUnavailable = true;
        }
    } else if (type === 'series') {
        const seriesList = (mockSeries as { series?: SeriesCardData[] }).series || [];
        const found = seriesList.find((s) => s.uniqueId === id);
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
                            selective={false}
                            target="_blank"
                            origin="paper"
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
                        title="Reset selection"
                    >
                        <div className="w-4 aspect-square">
                            <RefreshCw />
                        </div>
                        <span className="sr-only">Reset selection</span>
                    </Button    >
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleDeleteNode}
                        className="flex-1 w-full"
                        title="Delete reference"
                    >
                        <div className="w-4 aspect-square my-auto">
                            <Trash2 />
                        </div>
                        <span className="sr-only">Delete reference</span>
                    </Button    >
                </div>
            </div>
        </NodeViewWrapper>
    );
};

export default ContentReferenceNodeView;