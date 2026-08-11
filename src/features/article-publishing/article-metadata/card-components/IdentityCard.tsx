'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    identitySchema,
    type IdentityFormValues,
} from '@/features/article-publishing/schemas/identitySchema';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/shared/components/ui/form';
import { Badge } from '@/shared/components/ui/badge';

const defaultValues: IdentityFormValues = {
    title: '',
    slug: '',
    summary: '',
};

export function IdentityCard() {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const form = useForm<IdentityFormValues>({
        resolver: zodResolver(identitySchema),
        defaultValues,
        mode: 'onChange',
    });

    const titleValue = form.watch('title');

    const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    };

    useEffect(() => {
        if (isEditingTitle && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.value.length;
            textareaRef.current.selectionEnd = textareaRef.current.value.length;
            adjustTextareaHeight(textareaRef.current);
        }
    }, [isEditingTitle]);

    function onSubmit(data: IdentityFormValues) {
        console.log('Identity Form Data:', data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {isEditingTitle ? (
                                    <textarea
                                        {...field}
                                        ref={(e) => {
                                            field.ref(e);
                                            textareaRef.current = e;
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
                                        <h1
                                            onClick={() => setIsEditingTitle(true)}
                                            className="cursor-pointer text-[2rem] font-bold leading-[1.2] hover:text-muted-foreground/80 transition-colors"
                                        >
                                            {titleValue?.trim() ? titleValue : 'Untitled Header'}
                                        </h1>
                                        <Badge
                                            variant="outline"
                                            className="cursor-pointer select-none opacity-80 group-hover:opacity-100 transition-opacity"
                                        >
                                            Click to edit
                                        </Badge>
                                    </div>
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}