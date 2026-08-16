import React, { useState, useMemo } from 'react';
import { Layers, Trash2, ChevronsUpDown, Check } from 'lucide-react';
import dummyData from '@/dummy-content.json';
import { cn } from '@/shared/utils/shadcnUtils';
import { Button } from '@/shared/components/ui/button';
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
} from '@/shared/components/ui/command';
import { ContentCard } from '@/features/article-publishing/components/cards-and-modals/ContentCard';
import { SeriesCardData } from '@/features/article-publishing/types/reference-card.type';

interface SeriesPickerPopoverProps {
    value: string | null;
    onChange: (seriesId: string | null) => void;
    disabled?: boolean;
    className?: string;
}

export const SeriesPickerPopover: React.FC<SeriesPickerPopoverProps> = ({
                                                                            value,
                                                                            onChange,
                                                                            disabled = false,
                                                                            className,
                                                                        }) => {
    const [open, setOpen] = useState(false);

    const seriesList = useMemo<SeriesCardData[]>(() => {
        const rawSeries = dummyData.series.slice(0, 20);
        return rawSeries.map((item) => ({
            _id: item._id,
            slug: item.slug,
            title: item.title,
            description: item.description,
            defaultTags: item.defaultTags,
            thumbnailImage: item.thumbnailImage,
            thumbnailAltText: item.thumbnailAltText,
        }));
    }, []);

    const selectedSeries = useMemo(() => {
        if (!value) return null;
        return seriesList.find((item) => item._id === value) || null;
    }, [value, seriesList]);

    const handleSelect = (seriesId: string) => {
        onChange(seriesId);
        setOpen(false);
    };

    const handleUnselect = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    if (selectedSeries) {
        return (
            <div
                className={cn(
                    'w-max h-max rounded-xl overflow-hidden flex flex-col md:flex-row',
                    className
                )}
            >
                <div className="flex-1 min-w-0">
                    <ContentCard type="series" data={selectedSeries} selective={false} />
                </div>

                {!disabled && (
                    <div className="flex flex-row w-full h-10 md:h-38 md:-mt-2 md:w-10 md:flex-col items-center justify-center transition-colors">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleUnselect}
                            className="h-full mt-2 w-full"
                            title="Remove series assignment"
                        >
                            <div className="w-4 aspect-square">
                                <Trash2 />
                            </div>
                            <span className="sr-only">Remove series</span>
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={cn('w-full max-w-2xl', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        disabled={disabled}
                        className={cn(
                            'w-full border-2 border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30 rounded-xl p-6 text-center space-y-2 transition-all group cursor-pointer disabled:pointer-events-none disabled:opacity-50'
                        )}
                    >
                        <div className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors flex items-center justify-center">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                Select Series
                            </p>
                            <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                                Choose from existing series
                            </p>
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                        <CommandList className="max-h-60 overflow-y-auto">
                            <CommandEmpty>No series found.</CommandEmpty>
                            <CommandGroup>
                                {seriesList.map((series) => (
                                    <CommandItem
                                        key={series._id}
                                        value={series.title}
                                        onSelect={() => handleSelect(series._id)}
                                        className="flex flex-col gap-2 items-center cursor-pointer"
                                    >
                                        <ContentCard type="series" data={series} selective={false} />
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