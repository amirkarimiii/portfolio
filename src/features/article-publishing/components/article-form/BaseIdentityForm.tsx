'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
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

interface BaseIdentityFormProps {
    titleFieldName?: string;
    slugFieldName?: string;
    descriptionFieldName?: string;
    maxTitleLength?: number;
    descriptionPlaceholder?: string;
}

export function BaseIdentityForm({
                                     titleFieldName = 'title',
                                     slugFieldName = 'slug',
                                     descriptionFieldName = 'summary',
                                     maxTitleLength,
                                     descriptionPlaceholder = 'Click to add summary...',
                                 }: BaseIdentityFormProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const titleTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const descTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    const form = useFormContext();
    const { control, setValue, formState: { errors } } = form;

    const titleValue = useWatch({ control, name: titleFieldName });
    const descValue = useWatch({ control, name: descriptionFieldName });

    useEffect(() => {
        if (!isSlugManuallyEdited && titleValue !== undefined) {
            const generatedSlug = slugify(titleValue);
            setValue(slugFieldName, generatedSlug, {
                shouldValidate: true,
                shouldDirty: false,
            });
        }
    }, [titleValue, isSlugManuallyEdited, setValue, slugFieldName]);

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
        if (isEditingDesc && descTextareaRef.current) {
            descTextareaRef.current.focus();
            descTextareaRef.current.selectionStart = descTextareaRef.current.value.length;
            descTextareaRef.current.selectionEnd = descTextareaRef.current.value.length;
            adjustTextareaHeight(descTextareaRef.current);
        }
    }, [isEditingDesc]);

    return (
        <div className="py-3 space-y-8">
            {/* Title Field */}
            <FormField
                control={control}
                name={titleFieldName}
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
                                    maxLength={maxTitleLength}
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
                                    <Badge variant="outline" className="select-none opacity-80 w-fit">
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

            {/* Slug Field */}
            <FormField
                control={control}
                name={slugFieldName}
                render={({ field }) => {
                    const slugError = errors[slugFieldName];
                    const hasSlugError = !!slugError;
                    const slugErrorMessage = slugError?.message as string | undefined;

                    return (
                        <FormItem className="space-y-1">
                            <div className="flex flex-col gap-2">
                                <Badge variant="outline" className="select-none opacity-80 w-fit">
                                    Slug
                                </Badge>
                                <FormControl>
                                    <div className="relative flex-1 max-w-md flex items-center">
                                        <Input
                                            {...field}
                                            placeholder="entry-slug"
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

            {/* Description / Summary Field */}
            <FormField
                control={control}
                name={descriptionFieldName}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            {isEditingDesc ? (
                                <textarea
                                    {...field}
                                    ref={(e) => {
                                        field.ref(e);
                                        descTextareaRef.current = e;
                                    }}
                                    rows={1}
                                    placeholder={descriptionPlaceholder}
                                    className="w-full resize-none overflow-hidden bg-transparent text-base text-muted-foreground leading-relaxed outline-none border-none focus:outline-none focus:ring-0 p-0"
                                    onInput={(e) => adjustTextareaHeight(e.currentTarget)}
                                    onBlur={() => {
                                        field.onBlur();
                                        setIsEditingDesc(false);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            setIsEditingDesc(false);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex flex-col gap-3 group">
                                    <Badge variant="outline" className="select-none opacity-80 w-fit">
                                        Summary - Click to edit
                                    </Badge>
                                    <p
                                        onClick={() => setIsEditingDesc(true)}
                                        className={`cursor-pointer text-base leading-relaxed transition-colors ${
                                            descValue?.trim()
                                                ? 'text-muted-foreground hover:text-foreground'
                                                : 'text-muted-foreground/50 italic hover:text-muted-foreground'
                                        }`}
                                    >
                                        {descValue?.trim() ? descValue : descriptionPlaceholder}
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