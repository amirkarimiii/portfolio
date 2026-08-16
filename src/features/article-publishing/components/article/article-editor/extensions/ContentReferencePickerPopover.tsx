'use client';

import React, { useState, useMemo } from 'react';
import { Layers, FileText } from 'lucide-react';
import dummyData from '@/dummy-content.json';
import { cn } from '@/shared/utils/shadcnUtils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandInput,
} from '@/shared/components/ui/command';
import { ContentCard } from '@/features/article-publishing/components/cards-and-modals/ContentCard';
import {
    ArticleCardData,
    SeriesCardData,
} from '@/features/article-publishing/types/reference-card.type';

interface ContentReferencePickerPopoverProps {
    type: 'article' | 'series';
    onSelect: (id: string) => void;
    disabled?: boolean;
    className?: string;
}

export const ContentReferencePickerPopover: React.FC<
    ContentReferencePickerPopoverProps
> = ({ type, onSelect, disabled = false, className }) => {
    const [open, setOpen] = useState(false);

    const items = useMemo<(ArticleCardData | SeriesCardData)[]>(() => {
        if (type === 'series') {
            const rawSeries = (dummyData as { series?: SeriesCardData[] }).series || [];
            return rawSeries.slice(0, 20).map((item) => ({
                _id: item._id,
                slug: item.slug,
                title: item.title,
                description: item.description,
                defaultTags: item.defaultTags,
                thumbnailImage: item.thumbnailImage,
                thumbnailAltText: item.thumbnailAltText,
            }));
        }

        const rawArticles = (dummyData as { articles?: ArticleCardData[] }).articles || [];
        return rawArticles
            .filter((item) => item.lifecycle !== 'archived')
            .slice(0, 20)
            .map((item) => ({
                _id: item._id,
                slug: item.slug,
                title: item.title,
                summary: item.summary,
                lifecycle: item.lifecycle,
                seriesId: item.seriesId,
                seriesSlug: item.seriesSlug,
                seriesTitle: item.seriesTitle,
                tags: item.tags,
                thumbnailImage: item.thumbnailImage,
                thumbnailAltText: item.thumbnailAltText,
                firstPublishedAt: item.firstPublishedAt,
                publishedAt: item.publishedAt,
            }));
    }, [type]);

    const handleItemSelect = (id: string) => {
        onSelect(id);
        setOpen(false);
    };

    const isSeries = type === 'series';
    const Icon = isSeries ? Layers : FileText;
    const titleText = isSeries ? 'Select Series' : 'Select Article';
    const subtitleText = isSeries
        ? 'Choose from existing series'
        : 'Choose from published articles';

    return (
        <div className={cn('w-full max-w-2xl', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        disabled={disabled}
                        className="w-full border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30 rounded-xl p-6 text-center space-y-2 transition-all group cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                    >
                        <div className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                {titleText}
                            </p>
                            <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                                {subtitleText}
                            </p>
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                >
                    <Command>
                        <CommandInput
                            placeholder={isSeries ? 'Search series...' : 'Search articles...'}
                        />
                        <CommandList className="max-h-60 overflow-y-auto p-1">
                            <CommandEmpty>
                                {isSeries ? 'No series found.' : 'No articles found.'}
                            </CommandEmpty>
                            <CommandGroup>
                                {items.map((item) => (
                                    <CommandItem
                                        key={item._id}
                                        value={item.title}
                                        onSelect={() => handleItemSelect(item._id)}
                                        className="flex flex-col gap-2 items-center cursor-pointer p-1 rounded-lg"
                                    >
                                        {type === 'series' ? (
                                            <ContentCard
                                                type="series"
                                                data={item as SeriesCardData}
                                                selective={false}
                                            />
                                        ) : (
                                            <ContentCard
                                                type="article"
                                                data={item as ArticleCardData}
                                            />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ContentReferencePickerPopover;