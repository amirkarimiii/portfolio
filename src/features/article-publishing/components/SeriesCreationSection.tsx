'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, CircleX, Clock } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { seriesFormSchema, type SeriesFormValues } from '@/features/article-publishing/schemas/seriesFormSchema';
import {BaseIdentityForm} from "@/features/article-publishing/components/article-form/BaseIdentityForm";

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

    return (
        <FormProvider {...methods}>
            <section className="max-w-4xl mx-auto max-h-max mt-8">
                {/* Header Actions & Status Bar */}
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
                <div className="w-full p-4">
                    {/* Form content will be placed here */}
                </div>
            </section>
        </FormProvider>
    );
}

export default SeriesCreationSection;