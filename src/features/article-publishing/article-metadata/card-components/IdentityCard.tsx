'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/shared/components/ui/form';
import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function IdentityCard() {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingSummary, setIsEditingSummary] = useState(false);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const titleTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const summaryTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    const form = useFormContext<ArticleFormValues>();
    const { control, setValue, formState: { errors } } = form;

    const titleValue = useWatch({ control, name: 'title' });
    const summaryValue = useWatch({ control, name: 'summary' });

    useEffect(() => {
        if (!isSlugManuallyEdited && titleValue !== undefined) {
            const generatedSlug = slugify(titleValue);
            setValue('slug', generatedSlug, {
                shouldValidate: true,
                shouldDirty: false,
            });
        }
    }, [titleValue, isSlugManuallyEdited, setValue]);

    const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    };

    useEffect(() => {
        if (isEditingTitle && titleTextareaRef.current) {
            titleTextareaRef.current.focus();
            titleTextareaRef.current.selectionStart = titleTextareaRef.current.value.length;
            titleTextareaRef.current.selectionEnd = titleTextareaRef.current.value.length;
            adjustTextareaHeight(titleTextareaRef.current);
        }
    }, [isEditingTitle]);

    useEffect(() => {
        if (isEditingSummary && summaryTextareaRef.current) {
            summaryTextareaRef.current.focus();
            summaryTextareaRef.current.selectionStart = summaryTextareaRef.current.value.length;
            summaryTextareaRef.current.selectionEnd = summaryTextareaRef.current.value.length;
            adjustTextareaHeight(summaryTextareaRef.current);
        }
    }, [isEditingSummary]);

    return (
        <div className="py-3 space-y-8">
            <FormField
                control={control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            {isEditingTitle ? (
                                <textarea
                                    {...field}
                                    ref={(e) => {
                                        field.ref(e);
                                        titleTextareaRef.current = e;
                                    }}
                                    rows={1}
                                    placeholder="Untitled Header"
                                    className="w-full resize-none overflow-hidden bg-transparent text-[2rem] font-bold leading-[1.2] outline-none border-none focus:outline-none focus:ring-0 p-0"
                                    onInput={(e) => adjustTextareaHeight(e.currentTarget)}
                                    onBlur={() => {
                                        field.onBlur();
                                        setIsEditingTitle(false);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            setIsEditingTitle(false);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex flex-col gap-3 group">
                                    <Badge variant="outline" className="select-none opacity-80">
                                        Header - Click to edit
                                    </Badge>
                                    <h1
                                        onClick={() => setIsEditingTitle(true)}
                                        className="cursor-pointer text-[2rem] font-bold leading-[1.2] hover:text-muted-foreground/80 transition-colors"
                                    >
                                        {titleValue?.trim() ? titleValue : 'Untitled Header'}
                                    </h1>
                                </div>
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="slug"
                render={({ field }) => {
                    const hasSlugError = !!errors.slug;
                    const slugErrorMessage = errors.slug?.message as string | undefined;

                    return (
                        <FormItem className="space-y-1">
                            <div className="flex flex-col gap-2">
                                <Badge variant="outline" className="select-none opacity-80">
                                    Slug
                                </Badge>
                                <FormControl>
                                    <div className="relative flex-1 max-w-md flex items-center">
                                        <Input
                                            {...field}
                                            placeholder="article-slug"
                                            className="h-8 text-sm pr-8"
                                            onChange={(e) => {
                                                setIsSlugManuallyEdited(true);
                                                field.onChange(e);
                                            }}
                                        />
                                        <div className="absolute right-2 flex items-center">
                                            {!hasSlugError && (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                            {hasSlugError && (
                                <p className="text-xs font-medium text-destructive mt-1 flex items-center gap-1">
                                    <span className="w-4 aspect-square flex items-center justify-center">
                                        <AlertTriangle className="inline h-3.5 w-3.5" />
                                    </span>
                                    {slugErrorMessage}
                                </p>
                            )}
                        </FormItem>
                    );
                }}
            />
            <FormField
                control={control}
                name="summary"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            {isEditingSummary ? (
                                <textarea
                                    {...field}
                                    ref={(e) => {
                                        field.ref(e);
                                        summaryTextareaRef.current = e;
                                    }}
                                    rows={1}
                                    placeholder="Click to add article summary..."
                                    className="w-full resize-none overflow-hidden bg-transparent text-base text-muted-foreground leading-relaxed outline-none border-none focus:outline-none focus:ring-0 p-0"
                                    onInput={(e) => adjustTextareaHeight(e.currentTarget)}
                                    onBlur={() => {
                                        field.onBlur();
                                        setIsEditingSummary(false);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            setIsEditingSummary(false);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex flex-col gap-3 group">
                                    <Badge variant="outline" className="select-none opacity-80 w-fit">
                                        Summary - Click to edit
                                    </Badge>
                                    <p
                                        onClick={() => setIsEditingSummary(true)}
                                        className={`cursor-pointer text-base leading-relaxed transition-colors ${
                                            summaryValue?.trim()
                                                ? 'text-muted-foreground hover:text-foreground'
                                                : 'text-muted-foreground/50 italic hover:text-muted-foreground'
                                        }`}
                                    >
                                        {summaryValue?.trim() ? summaryValue : 'Click to add article summary...'}
                                    </p>
                                </div>
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}