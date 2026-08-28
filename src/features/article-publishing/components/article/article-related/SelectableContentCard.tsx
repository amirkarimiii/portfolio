'use client';

import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ContentCard } from '../../reference-card/ContentCard';
import { ArticleCardData } from '../../../types/reference-card.type';
import { cn } from '@/shared/utils/shadcnUtils';

interface SelectableContentCardProps {
    article: ArticleCardData;
    mode: 'add' | 'remove';
    onAction: (articleId: string) => void;
    dragHandleProps?: Record<string, unknown>;
    className?: string;
}

export const SelectableContentCard: React.FC<SelectableContentCardProps> = ({
                                                                                article,
                                                                                mode,
                                                                                onAction,
                                                                                dragHandleProps,
                                                                                className,
                                                                            }) => {
    const handleActionClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAction(article.uniqueId);
    };

    return (
        <div
            className={cn(
                'flex items-center gap-2 p-1.5 rounded-xl border bg-card hover:border-primary/40 transition-colors group',
                className
            )}
        >
            {mode === 'remove' && (
                <div
                    {...dragHandleProps}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center p-1.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
                    title="Drag to reorder"
                    data-no-card-navigate
                >
                    <GripVertical className="w-4 h-4" />
                </div>
            )}

            {/* Core Content Card Component */}
            <div className="flex-1 min-w-0">
                <ContentCard
                    type="article"
                    data={article}
                    origin="paper"
                    selective={true}
                    target="_blank"
                />
            </div>

            {/* Action Buttons: Add or Remove */}
            <div className="shrink-0 px-1" data-no-card-navigate>
                {mode === 'add' ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleActionClick}
                        className="h-9 px-3 gap-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        title="Add to related articles"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-medium">Add</span>
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleActionClick}
                        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Remove from related articles"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                    </Button>
                )}
            </div>
        </div>
    );
};