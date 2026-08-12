'use client';

import {useEffect} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    assetsSchema,
    type AssetsFormValues,
} from '@/features/article-publishing/schemas/assetsSchema';
import {Form, FormField, FormItem, FormLabel, FormMessage, FormControl} from '@/shared/components/ui/form';
import {Input} from '@/shared/components/ui/input';
import {AttachmentUpload, type FileAttachment} from './AttachmentUpload';
import {Badge} from '@/shared/components/ui/badge';
import {Info} from "lucide-react";

const defaultValues: AssetsFormValues = {
    coverImage: '',
    coverAltText: '',
    thumbnailImage: '',
    thumbnailAltText: '',
};

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

export function AssetsCard() {
    const form = useForm<AssetsFormValues>({
        resolver: zodResolver(assetsSchema),
        defaultValues,
        mode: 'onChange',
    });

    const coverAltText = useWatch({
        control: form.control,
        name: 'coverAltText',
    });

    const thumbnailAltText = useWatch({
        control: form.control,
        name: 'thumbnailAltText',
    });

    useEffect(() => {
        if (coverAltText !== undefined) {
            const derivedThumbnailAlt = coverAltText.trim()
                ? `${coverAltText.trim()}_thumb`
                : '';

            form.setValue('thumbnailAltText', derivedThumbnailAlt, {
                shouldValidate: true,
                shouldDirty: false,
            });
        }
    }, [coverAltText, form]);

    function onSubmit(data: AssetsFormValues) {
        console.log('Assets Form Data:', data);
    }

    return (
        <div className="py-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Cover Image
                                    </FormLabel>
                                    <Badge variant="outline" className="w-fit select-none opacity-80">
                                        Cover Image
                                    </Badge>
                                    <AttachmentUpload
                                        value={field.value}
                                        onChange={(val) => {
                                            if (val && typeof val !== 'string') {
                                                field.onChange(val.url);
                                                const currentCoverAlt = form.getValues('coverAltText');
                                                if (!currentCoverAlt || !currentCoverAlt.trim()) {
                                                    const suggestedAlt = formatFileNameToAlt(val.name);
                                                    form.setValue('coverAltText', suggestedAlt, {
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
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coverAltText"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Cover Alt Text
                                    </FormLabel>
                                    <Badge variant="outline"
                                           className="w-fit select-none opacity-80">
                                        Thumbnail Alt Text
                                    </Badge>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter alt text for cover image..."
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="thumbnailImage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Thumbnail Image
                                    </FormLabel>
                                    <Badge variant="outline" className="w-fit select-none opacity-80">
                                        Thumbnail Image
                                    </Badge>
                                    <div className="w-50 aspect-square">
                                        <AttachmentUpload
                                            label=""
                                            value={field.value}
                                            onChange={(val) =>
                                                field.onChange(extractUrl(val))
                                            }
                                        />
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnailAltText"
                            render={({field}) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="sr-only">
                                            Thumbnail Alt Text
                                        </FormLabel>
                                        <Badge variant="outline"
                                               className="w-fit select-none opacity-80">
                                            Thumbnail Alt Text
                                        </Badge>
                                        <Badge variant="outline"
                                               className="w-fit select-none opacity-80">
                                            <span className="w-3 aspect-square flex items-center justify-center">
                                                <Info className="inline"/>
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
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
}