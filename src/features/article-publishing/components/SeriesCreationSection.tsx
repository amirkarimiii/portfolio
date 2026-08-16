'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, CircleX, Clock } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { seriesFormSchema, type SeriesFormValues } from '@/features/article-publishing/schemas/seriesFormSchema';
import {BaseIdentityForm} from "./article/article-form/BaseIdentityForm";
import {BaseAssetsForm} from "./article/article-form/BaseAssetsForm";
import {Separator} from "@/shared/components/ui/separator";
import {BaseSEOForm} from "./article/article-form/BaseSEOForm";
import {TagSelector} from "./tags/TagSelector";
import {SeriesCreationTagsDisplay} from "./tags/SeriesCreationTagsDisplay";

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

export function SeriesCreationSection() {
    const methods = useForm<SeriesFormValues>({
        resolver: zodResolver(seriesFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const status = {
        success: [<CircleCheck key="success" color="green" />, 'saved as draft!'],
        failed: [<CircleX key="failed" color="red" />, 'failed to save!'],
        pending: [<Clock key="pending" color="gray" />, 'pending'],
    } as const;

    const { watch, setValue } = methods;

    const defaultTags: string[] = watch('defaultTags');

    const handleRemoveTag = (tagName: string) => {
        const updated = defaultTags.filter(
            (tag) => tag.trim().toLowerCase() !== tagName.trim().toLowerCase()
        );
        setValue('defaultTags', updated, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <FormProvider {...methods}>
            <section className="max-w-4xl mx-auto max-h-max mt-8 pb-20">
                <div className="w-full flex flex-row justify-between px-5 py-2">
                    <div className="w-full h-max flex flex-row gap-2 my-auto">
                        <div className="w-5 aspect-square">
                            {status.success[0]}
                        </div>
                        <p>{status.success[1]}</p>
                    </div>
                    <div className="my-auto">
                        <Button
                            variant="outline"
                            onClick={methods.handleSubmit((data) => {
                                console.log('Publish Series payload:', data);
                            })}
                        >
                            Add Series
                        </Button>
                    </div>
                </div>
                <div className="px-5">
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
                    <BaseAssetsForm />
                </div>
                <Separator />
                <div className="px-5 py-3">
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
                    <BaseSEOForm entityType="series" />
                </div>
            </section>
        </FormProvider>
    );
}

export default SeriesCreationSection;