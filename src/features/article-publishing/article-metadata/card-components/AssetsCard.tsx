'use client';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    assetsSchema,
    type AssetsFormValues,
} from '@/features/article-publishing/schemas/assetsSchema';
import {Form, FormField, FormItem, FormLabel, FormMessage} from '@/shared/components/ui/form';
import { AttachmentUpload } from './AttachmentUpload';
import {Badge} from "@/shared/components/ui/badge";

const defaultValues: AssetsFormValues = {
    coverImage: '',
    coverAltText: '',
    thumbnailImage: '',
    thumbnailAltText: '',
};

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
                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">
                                    Cover Image
                                </FormLabel>
                                <Badge variant="outline" className="w-fit cursor-pointer select-none opacity-80">
                                    Cover Image
                                </Badge>
                                <AttachmentUpload
                                    value={field.value}
                                    onChange={(val) => field.onChange(val ? (typeof val === 'string' ? val : val.url) : '')}
                                    label=""
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="thumbnailImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">
                                    Thumbnail Image
                                </FormLabel>
                                <Badge variant="outline" className="w-fit cursor-pointer select-none opacity-80">
                                    Thumbnail Image
                                </Badge>
                                <div className="w-60">
                                    <AttachmentUpload
                                        label=""
                                        value={field.value}
                                        onChange={(val) =>
                                            field.onChange(val ? (typeof val === 'string' ? val : val.url) : '')
                                        }
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}