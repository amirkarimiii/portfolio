'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Plus, ExternalLink } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { TagPicker } from "@/features/article-publishing/components/article/article-form/TagPicker";
import { SeriesPickerPopover } from "@/features/article-publishing/components/article/article-metadata/card-components/SeriesPickerPopover";

export function ClassificationCard() {
    const { control } = useFormContext();

    const handleCreateNewSeries = () => {
        window.open('/admin/add-series', '_blank');
    };

    return (
        <div className="py-3 space-y-8">
            <TagPicker
                fieldName="tags"
                label="Selected Tags"
                placeholder="Select or type a tag..."
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