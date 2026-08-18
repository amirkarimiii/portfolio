'use client';

import React, { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Plus, ExternalLink } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { TagSelector } from "../../../tags/TagSelector";
import { SeriesPickerPopover } from "@/features/article-publishing/components/article/article-metadata/card-components/SeriesPickerPopover";
import { ArticleCreationTagsDisplay } from "../../../tags/ArticleCreationTagsDisplay";
import { getEffectiveTags } from "@/features/article-publishing/utils/tagUtils";
import dummySeries from '@/mock-files/series.json';

export function ClassificationCard() {
    const { control, watch, setValue } = useFormContext();

    const selectedSeriesId = watch('seriesId');
    const manualTags: string[] = watch('tags');

    const seriesDefaultTags = useMemo<string[]>(() => {
        if (!selectedSeriesId) return [];
        const series = dummySeries.series.find((item) => item.uniqueId === selectedSeriesId);
        return series?.defaultTags || [];
    }, [selectedSeriesId]);

    const effectiveTags = useMemo(() => {
        return getEffectiveTags(manualTags, seriesDefaultTags);
    }, [manualTags, seriesDefaultTags]);

    const handleRemoveManualTag = (tagName: string) => {
        const updatedTags = manualTags.filter(
            (tag) => tag.trim().toLowerCase() !== tagName.trim().toLowerCase()
        );
        setValue('tags', updatedTags, { shouldValidate: true, shouldDirty: true });
    };

    const handleCreateNewSeries = () => {
        window.open('/admin/add-series', '_blank');
    };

    return (
        <div className="py-3 space-y-8">
            <div className="space-y-2 w-md">
                <span className="text-xs text-muted-foreground">Selected</span>
                <ArticleCreationTagsDisplay
                    effectiveTags={effectiveTags}
                    onRemoveManualTag={handleRemoveManualTag}
                />
            </div>
            <TagSelector
                fieldName="tags"
                label="Article Specific Tags"
                placeholder="Search or add default tags for this series..."
            />
            <div className="space-y-4 pt-4 border-t">
                <Badge variant="outline" className="w-fit select-none opacity-80">
                    Series Membership
                </Badge>

                <div className="space-y-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCreateNewSeries}
                        className="w-full max-w-md mx-auto flex items-center justify-center gap-2"
                    >
                        <div className="w-4 aspect-square">
                            <Plus />
                        </div>
                        <span>Create New Series</span>
                        <div className="w-3.5 aspect-square text-muted-foreground ml-1">
                            <ExternalLink />
                        </div>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        or choose from existing series below
                    </p>
                </div>

                <div className="flex justify-center">
                    <Controller
                        name="seriesId"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <SeriesPickerPopover
                                value={field.value ?? null}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}