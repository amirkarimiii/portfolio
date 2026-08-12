'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import {
    classificationSchema,
    type ClassificationFormValues,
} from '@/features/article-publishing/schemas/classificationSchema';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Badge } from '@/shared/components/ui/badge';

export const MOCK_EXISTING_TAGS = [
    'React',
    'React Native',
    'TypeScript',
    'Next.js',
    'Architecture',
    'Tailwind CSS',
    'Zustand',
    'Node.js',
] as const;

const defaultValues: ClassificationFormValues = {
    tags: ['React', 'TypeScript', 'Next.js'],
};

export function ClassificationCard() {
    const form = useForm<ClassificationFormValues>({
        resolver: zodResolver(classificationSchema),
        defaultValues,
        mode: 'onChange',
    });

    const currentTags = useWatch({
        control: form.control,
        name: 'tags',
    }) || [];

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
        form.setValue('tags', updatedTags, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    function onSubmit(data: ClassificationFormValues) {
        console.log('Classification Form Data:', data);
    }

    return (
        <div className="py-3">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="tags"
                        render={() => (
                            <FormItem className="space-y-3">
                                <FormLabel className="sr-only">
                                    Selected Tags
                                </FormLabel>
                                <Badge variant="outline"
                                       className="w-fit select-none opacity-80">
                                    Selected Tags
                                </Badge>
                                <div className="flex flex-wrap gap-2 min-h-9.5 p-2">
                                    {currentTags.length > 0 ? (
                                        currentTags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="flex items-center select-none gap-1.5 px-2.5 py-0.5 text-xs"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="w-4 aspect-square rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                                                    aria-label={`Remove ${tag} tag`}
                                                >
                                                    <div className="w-3 aspect-square mx-auto">
                                                        <X/>
                                                    </div>
                                                </button>
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-xs text-muted-foreground self-center px-1">
                                            No tags selected yet.
                                        </p>
                                    )}
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