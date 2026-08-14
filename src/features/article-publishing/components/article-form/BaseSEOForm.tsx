'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';

interface BaseSEOFormProps {
    entityType: 'article' | 'series';
    titleFieldName?: string;
    descriptionFieldName?: string;
}

export function BaseSEOForm({
                                entityType,
                                titleFieldName = 'title',
                                descriptionFieldName = entityType === 'article' ? 'summary' : 'description',
                            }: BaseSEOFormProps) {
    const form = useFormContext();
    const { control } = form;

    const mainTitle = useWatch({ control, name: titleFieldName }) || '';
    const mainDescription = useWatch({ control, name: descriptionFieldName }) || '';

    const seoTitleValue = useWatch({ control, name: 'seoTitle' }) || '';
    const seoDescriptionValue = useWatch({ control, name: 'seoDescription' }) || '';
    const canonicalUrlValue = useWatch({ control, name: 'canonicalUrl' }) || '';

    const titleCharCount = seoTitleValue.length;
    const isTitleLengthOptimal = titleCharCount >= 30 && titleCharCount <= 60;

    const descCharCount = seoDescriptionValue.length;
    const isDescLengthOptimal = descCharCount >= 120 && descCharCount <= 160;

    const isArticle = entityType === 'article';
    const entityLabel = isArticle ? 'Article' : 'Series';

    return (
        <div className="space-y-2">
            <div className="space-y-6">
                {/* SEO Title */}
                <FormField
                    control={control}
                    name="seoTitle"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <div className="flex items-center justify-between">
                                <FormLabel className="sr-only">SEO Title</FormLabel>
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
                                <Input {...field} placeholder="Enter custom SEO title..." />
                            </FormControl>
                            {titleCharCount > 0 && !isTitleLengthOptimal && (
                                <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                    <span className="w-3 mt-px aspect-square flex items-center justify-center">
                                        <AlertCircle className="h-3 w-3" />
                                    </span>
                                    Recommended length for search engines is 30–60 characters.
                                </p>
                            )}
                            {!seoTitleValue.trim() && (
                                <div className="p-2.5 rounded-md bg-muted/40 border border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal shrink-0">
                                        Fallback Active
                                    </Badge>
                                    <span className="truncate">
                                        Using {entityLabel} Title (&quot;{mainTitle.trim() || `Untitled ${entityLabel}`}&quot;)
                                    </span>
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* SEO Description */}
                <FormField
                    control={control}
                    name="seoDescription"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <div className="flex items-center justify-between">
                                <FormLabel className="sr-only">SEO Description</FormLabel>
                                <Badge variant="outline" className="w-fit select-none opacity-80">
                                    SEO Description
                                </Badge>
                                <span
                                    className={`text-xs font-mono transition-colors ${
                                        descCharCount === 0
                                            ? 'text-muted-foreground'
                                            : isDescLengthOptimal
                                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                                : 'text-amber-600 dark:text-amber-400'
                                    }`}
                                >
                                    {descCharCount} / 160 chars
                                </span>
                            </div>
                            <FormControl>
                                <Textarea {...field} rows={3} placeholder="Enter meta description for search engines..." />
                            </FormControl>
                            {descCharCount > 0 && !isDescLengthOptimal && (
                                <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                    <span className="w-3 mt-px aspect-square flex items-center justify-center">
                                        <AlertCircle className="h-3 w-3" />
                                    </span>
                                    Recommended length for meta description is 120–160 characters.
                                </p>
                            )}
                            {!seoDescriptionValue.trim() && (
                                <div className="p-2.5 rounded-md bg-muted/40 border border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal shrink-0">
                                        Fallback Active
                                    </Badge>
                                    <span className="truncate">
                                        Using {entityLabel} {isArticle ? 'Summary' : 'Description'} (&quot;{mainDescription.trim() || 'No description provided'}&quot;)
                                    </span>
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Canonical URL */}
                <FormField
                    control={control}
                    name="canonicalUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <div className="flex items-center justify-between">
                                <FormLabel className="sr-only">Canonical URL</FormLabel>
                                <Badge variant="outline" className="w-fit select-none opacity-80">
                                    Canonical URL
                                </Badge>
                            </div>
                            <FormControl>
                                <Input {...field} type="url" placeholder="https://example.com/blog/my-article" />
                            </FormControl>
                            {!canonicalUrlValue.trim() && (
                                <div className="p-2.5 rounded-md bg-muted/40 border border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal shrink-0">
                                        Fallback Active
                                    </Badge>
                                    <span className="truncate">
                                        Will resolve to the current published {entityType} URL at runtime.
                                    </span>
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}