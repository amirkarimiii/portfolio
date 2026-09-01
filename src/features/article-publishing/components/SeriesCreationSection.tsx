'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { seriesFormSchema, type SeriesFormValues } from '@/features/article-publishing/schemas/seriesFormSchema';
import { BaseIdentityForm } from './article/article-form/BaseIdentityForm';
import { BaseAssetsForm } from './article/article-form/BaseAssetsForm';
import { Separator } from '@/shared/components/ui/separator';
import { BaseSEOForm } from './article/article-form/BaseSEOForm';
import { TagSelector } from './tags/TagSelector';
import { SeriesCreationTagsDisplay } from './tags/SeriesCreationTagsDisplay';
import { publishSeriesAction } from '@/features/article-publishing/actions/publishSeriesAction';
import { SERIES_BROADCAST_CHANNEL } from "../constants/seriesChannel";
import {notify} from "@/shared/notification/notification.service";

const defaultValues: SeriesFormValues = {
    title: '',
    slug: '',
    description: '',
    coverImage: '',
    coverAltText: '',
    thumbnailImage: '',
    thumbnailAltText: '',
    defaultTags: [],
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
};

type PublishStatus = 'idle' | 'pending' | 'failed';

export function SeriesCreationSection() {
    const router = useRouter();
    const [publishStatus, setPublishStatus] = useState<PublishStatus>('idle');
    const [isPublishing, setIsPublishing] = useState(false);

    const methods = useForm<SeriesFormValues>({
        resolver: zodResolver(seriesFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const { watch, setValue, setError, handleSubmit } = methods;

    const defaultTags: string[] = watch('defaultTags');

    const handleRemoveTag = (tagName: string) => {
        const updated = defaultTags.filter(
            (tag) => tag.trim().toLowerCase() !== tagName.trim().toLowerCase()
        );
        setValue('defaultTags', updated, { shouldValidate: true, shouldDirty: true });
    };

    const onPublish = async (data: SeriesFormValues) => {
        setIsPublishing(true);
        setPublishStatus('pending');

        try {
            const payload: SeriesFormValues = JSON.parse(JSON.stringify(data));
            const result = await publishSeriesAction(payload);

            if (result.success) {
                notify.success("SERIES_PUBLISHED");
                if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
                    const channel = new BroadcastChannel(SERIES_BROADCAST_CHANNEL);
                    channel.postMessage({
                        type: 'SERIES_CREATED',
                        payload: {
                            uniqueId: result.data.uniqueId,
                            slug: result.data.slug,
                            title: result.data.title,
                            description: result.data.description,
                            defaultTags: result.data.defaultTags,
                            thumbnailImage: result.data.thumbnailImage,
                            thumbnailAltText: result.data.thumbnailAltText,
                        },
                    });
                    channel.close();
                }
                router.push(`/series/${result.data.slug}`);
            } else {
                setPublishStatus('failed');

                const errorMessage = result.error?.message || 'Failed to publish series';

                if ('field' in result.error && result.error.field) {
                    setError(result.error.field as keyof SeriesFormValues, {
                        type: 'manual',
                        message: errorMessage
                    });
                }
                notify.error(errorMessage);
            }
        } catch (e) {
            setPublishStatus('failed');
            notify.error("UNEXPECTED_ERROR");
        } finally {
            setIsPublishing(false);
        }
    };


    const statusIcons = {
        idle: null,
        pending: (
            <div className="w-full h-max flex flex-row gap-2 my-auto">
                <div className="w-5 aspect-square">
                    <Clock className="text-gray-500" />
                </div>
                <p className="text-sm text-muted-foreground">Publishing series...</p>
            </div>
        ),
        failed: (
            <div className="w-full h-max flex flex-row gap-2 my-auto">
                <div className="w-5 aspect-square">
                    <CircleX className="text-red-500" />
                </div>
                <p className="text-sm text-red-600">Failed to save series!</p>
            </div>
        ),
    };

    return (
        <FormProvider {...methods}>
            <section className="max-w-4xl mx-auto max-h-max mt-8 pb-20">
                <div className="w-full flex flex-row justify-between px-5 py-2">
                    <div className="w-full h-max flex flex-row gap-2 my-auto">
                        {statusIcons[publishStatus]}
                    </div>
                    <div className="my-auto">
                        <Button
                            variant="outline"
                            disabled={isPublishing}
                            onClick={handleSubmit(onPublish)}
                        >
                            {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Series
                        </Button>
                    </div>
                </div>

                <div className="px-5">
                    <div className="text-center">
                        <h2 className="font-bold opacity-80 text-md my-5 ml-2 md:ml-0 lg:mt-5 lg:text-xl">Identity</h2>
                    </div>
                    <BaseIdentityForm
                        titleFieldName="title"
                        slugFieldName="slug"
                        descriptionFieldName="description"
                        maxTitleLength={36}
                        descriptionPlaceholder="Enter series description..."
                    />
                </div>
                <Separator />

                <div className="px-5">
                    <div className="text-center">
                        <h2 className="font-bold opacity-80 text-md my-5 ml-2 md:ml-0 lg:mt-5 lg:text-xl">Assets</h2>
                    </div>
                    <BaseAssetsForm />
                </div>
                <Separator />

                <div className="px-5 py-3">
                    <div className="text-center">
                        <h2 className="font-bold opacity-80 text-md my-5 ml-2 md:ml-0 lg:mt-5 lg:text-xl">Classification</h2>
                    </div>
                    <div className="space-y-2 w-md mb-8">
                        <span className="text-xs text-muted-foreground">Selected</span>
                        <SeriesCreationTagsDisplay
                            tags={defaultTags}
                            onRemoveTag={handleRemoveTag}
                        />
                    </div>
                    <TagSelector
                        fieldName="defaultTags"
                        label="Series Default Tags"
                        placeholder="Search or add default tags for this series..."
                    />
                </div>
                <Separator />

                <div className="px-5 py-3">
                    <div className="text-center">
                        <h2 className="font-bold opacity-80 text-md my-5 ml-2 md:ml-0 lg:mt-5 lg:text-xl">SEO</h2>
                    </div>
                    <BaseSEOForm entityType="series" />
                </div>
            </section>
        </FormProvider>
    );
}

export default SeriesCreationSection;