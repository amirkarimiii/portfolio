'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ArticleFormValues } from '../../../schemas/articleFormSchema';
import { ArticleCardData } from '../../../types/reference-card.type';
import { getSuggestedArticles } from '../../../utils/relatedArticleUtils';
import { SelectableContentCard } from './SelectableContentCard';
import {getAllArticlesAction} from "@/features/article-publishing/actions/relatedActions";

interface SortableItemProps {
    article: ArticleCardData;
    onRemove: (id: string) => void;
}

function SortableRelatedItem({ article, onRemove }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: article.uniqueId });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <SelectableContentCard
                article={article}
                mode="remove"
                onAction={onRemove}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
        </div>
    );
}

export const RelatedArticlesTab: React.FC = () => {
    const { setValue, control } = useFormContext<ArticleFormValues>();

    const selectedIds = useWatch({ control, name: 'relatedArticleIds', defaultValue: [] });
    const currentTags = useWatch({ control, name: 'tags', defaultValue: [] });

    const currentSeriesId = useWatch({ control, name: 'seriesId' });

    const [allArticles, setAllArticles] = useState<ArticleCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchArticles() {
            try {
                const articles = await getAllArticlesAction();
                if (isMounted) {
                    setAllArticles(articles);
                }
            } catch (error) {
                console.error('Failed to load articles for suggestions:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        fetchArticles();
        return () => {
            isMounted = false;
        };
    }, []);

    const selectedArticles = useMemo(() => {
        const articleMap = new Map(allArticles.map((a) => [a.uniqueId, a]));
        return selectedIds
            .map((id) => articleMap.get(id))
            .filter((a): a is ArticleCardData => Boolean(a));
    }, [selectedIds, allArticles]);

    const suggestedArticles = useMemo(() => {
        return getSuggestedArticles({
            allArticles,
            currentTags,
            currentSeriesId,
            selectedRelatedIds: selectedIds,
        });
    }, [allArticles, currentTags, currentSeriesId, selectedIds]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = (articleId: string) => {
        if (!selectedIds.includes(articleId)) {
            setValue('relatedArticleIds', [...selectedIds, articleId], {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    };

    const handleRemove = (articleId: string) => {
        setValue(
            'relatedArticleIds',
            selectedIds.filter((id) => id !== articleId),
            {
                shouldValidate: true,
                shouldDirty: true,
            }
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = selectedIds.indexOf(String(active.id));
            const newIndex = selectedIds.indexOf(String(over.id));

            if (oldIndex !== -1 && newIndex !== -1) {
                const newOrderedIds = arrayMove(selectedIds, oldIndex, newIndex);
                setValue('relatedArticleIds', newOrderedIds, {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 text-center text-sm text-muted-foreground">
                Loading articles...
            </div>
        );
    }

    return (
        <div className="space-y-8 py-4">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                        Selected Related Articles ({selectedArticles.length})
                    </h3>
                </div>

                {selectedArticles.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
                        No related articles selected yet. Choose from suggestions below.
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={selectedIds}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {selectedArticles.map((article) => (
                                    <SortableRelatedItem
                                        key={article.uniqueId}
                                        article={article}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                        Suggested Articles
                    </h3>
                </div>

                {currentTags.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
                        Select at least one tag in Metadata tab to view suggested articles.
                    </div>
                ) : suggestedArticles.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
                        No matching articles found based on tag similarity.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {suggestedArticles.map((article) => (
                            <SelectableContentCard
                                key={article.uniqueId}
                                article={article}
                                mode="add"
                                onAction={handleAdd}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};