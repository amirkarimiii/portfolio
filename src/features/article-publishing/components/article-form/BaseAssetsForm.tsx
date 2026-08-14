'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { AttachmentUpload, type FileAttachment } from '@/features/article-publishing/article-metadata/card-components/AttachmentUpload';
import { Badge } from '@/shared/components/ui/badge';
import { Info } from 'lucide-react';

function extractUrl(val: string | FileAttachment | null): string {
    if (!val) return '';
    return typeof val === 'string' ? val : val.url;
}

function formatFileNameToAlt(fileName: string): string {
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    return nameWithoutExt
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function BaseAssetsForm() {
    const form = useFormContext();
    const { control, setValue, getValues } = form;

    const coverAltText = useWatch({ control, name: 'coverAltText' });
    const thumbnailAltText = useWatch({ control, name: 'thumbnailAltText' });

    // Auto-derive thumbnail alt text from cover alt text
    useEffect(() => {
        if (coverAltText !== undefined) {
            const derivedThumbnailAlt = coverAltText.trim()
                ? `${coverAltText.trim()}_thumb`
                : '';

            setValue('thumbnailAltText', derivedThumbnailAlt, {
                shouldValidate: true,
                shouldDirty: false,
            });
        }
    }, [coverAltText, setValue]);

    return (
        <div className="py-3 space-y-6">
            <div className="space-y-3">
                <FormField
                    control={control}
                    name="coverImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Cover Image</FormLabel>
                            <Badge variant="outline" className="w-fit select-none opacity-80">
                                Cover Image
                            </Badge>
                            <AttachmentUpload
                                value={field.value}
                                onChange={(val) => {
                                    if (val && typeof val !== 'string') {
                                        field.onChange(val.url);
                                        const currentCoverAlt = getValues('coverAltText');
                                        if (!currentCoverAlt || !currentCoverAlt.trim()) {
                                            const suggestedAlt = formatFileNameToAlt(val.name);
                                            setValue('coverAltText', suggestedAlt, {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            });
                                        }
                                    } else {
                                        field.onChange(extractUrl(val));
                                    }
                                }}
                                label=""
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="coverAltText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Cover Alt Text</FormLabel>
                            <Badge variant="outline" className="w-fit select-none opacity-80">
                                Cover Alt Text
                            </Badge>
                            <FormControl>
                                <Input {...field} placeholder="Enter alt text for cover image..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-3">
                <FormField
                    control={control}
                    name="thumbnailImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Thumbnail Image</FormLabel>
                            <Badge variant="outline" className="w-fit select-none opacity-80">
                                Thumbnail Image
                            </Badge>
                            <div className="w-50 aspect-square">
                                <AttachmentUpload
                                    label=""
                                    value={field.value}
                                    onChange={(val) => field.onChange(extractUrl(val))}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="thumbnailAltText"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel className="sr-only">Thumbnail Alt Text</FormLabel>
                                <Badge variant="outline" className="w-fit select-none opacity-80">
                                    Thumbnail Alt Text
                                </Badge>
                                <Badge variant="outline" className="w-fit select-none opacity-80">
                                    <span className="w-3 aspect-square flex items-center justify-center">
                                        <Info className="inline" />
                                    </span>
                                    Auto-generated from Cover Alt Text
                                </Badge>
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={thumbnailAltText || ''}
                                    disabled
                                    className="bg-muted/50 cursor-not-allowed text-muted-foreground"
                                    placeholder="Will be derived automatically..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}