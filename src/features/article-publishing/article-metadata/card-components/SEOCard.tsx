'use client';

import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {AlertCircle} from 'lucide-react';
import {
    seoSchema,
    type SEOFormValues,
} from '@/features/article-publishing/schemas/seoSchema';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/shared/components/ui/form';
import {Input} from '@/shared/components/ui/input';
import {Badge} from '@/shared/components/ui/badge';

interface SEOCardProps {
    articleTitle?: string;
}

const defaultValues: SEOFormValues = {
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
};

export function SEOCard({articleTitle = ''}: SEOCardProps) {
    const form = useForm<SEOFormValues>({
        resolver: zodResolver(seoSchema),
        defaultValues,
        mode: 'onChange',
    });

    const seoTitleValue = useWatch({
        control: form.control,
        name: 'seoTitle',
    }) || '';

    const titleCharCount = seoTitleValue.length;
    const isTitleLengthOptimal = titleCharCount >= 30 && titleCharCount <= 60;

    function onSubmit(data: SEOFormValues) {
        console.log('SEO Form Data:', data);
    }

    return (
        <div className="space-y-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="seoTitle"
                        render={({field}) => (
                            <FormItem className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <FormLabel className="sr-only">
                                        SEO Title
                                    </FormLabel>
                                    <Badge variant="outline" className="w-fit select-none opacity-80">
                                        SEO Title
                                    </Badge>
                                    <span
                                        className={`text-xs font-mono transition-colors ${
                                            titleCharCount === 0
                                                ? 'text-muted-foreground'
                                                : isTitleLengthOptimal
                                                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                                    : 'text-amber-600 dark:text-amber-400'
                                        }`}
                                    >
                                        {titleCharCount} / 60 chars
                                    </span>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter custom SEO title..."
                                    />
                                </FormControl>
                                {titleCharCount > 0 && !isTitleLengthOptimal && (
                                    <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                        <div className="w-3 mt-px aspect-square">
                                            <AlertCircle/>
                                        </div>
                                        Recommended length for search engines is 30–60 characters.
                                    </p>
                                )}
                                {!seoTitleValue.trim() && (
                                    <div
                                        className="p-2.5 rounded-md bg-muted/40 border border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                                        <Badge variant="outline"
                                               className="text-[10px] py-0 px-1.5 font-normal shrink-0">
                                            Fallback Active
                                        </Badge>
                                        <span className="truncate">
                        Using Article Title (&quot;{articleTitle.trim() || 'Untitled Article'}&quot;)
                      </span>
                                    </div>
                                )}

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}