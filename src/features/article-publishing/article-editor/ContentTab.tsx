'use client';

import { useEditor } from '@tiptap/react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { extensions } from '@/features/article-publishing/article-editor/extensions';
import Toolbar from '@/features/article-publishing/article-editor/toolbar/Toolbar';
import Tiptap from '@/features/article-publishing/article-editor/Tiptap';
import { EditorSkeleton } from '@/features/article-publishing/article-editor/EditorSkeleton';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';
import { cn } from "@/shared/utils/shadcnUtils";

export function ContentTab() {
    const {
        setValue,
        getValues,
        formState: { errors },
    } = useFormContext<ArticleFormValues>();

    const contentError = errors.content?.message;

    const editor = useEditor({
        extensions,
        content: getValues('content') || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: cn(
                    'mx-auto mt-4 min-h-[500px] w-full max-w-[728px] rounded-lg border bg-background p-6 md:p-8 text-foreground focus:outline-none transition-colors shadow-sm',
                    contentError && 'border-destructive ring-1 ring-destructive'
                ),
            },
        },
        onUpdate: ({ editor }) => {
            setValue('content', editor.getHTML(), {
                shouldDirty: true,
                shouldValidate: true,
            });
        },
    });

    if (!editor) {
        return <EditorSkeleton />;
    }

    return (
        <div className="py-4 pb-20">
            <section className="mx-auto max-w-[728px] space-y-4">
                <div className="sticky top-2 z-10 mx-auto w-fit rounded-md border bg-background/95 p-1 shadow-md backdrop-blur-md">
                    <Toolbar editor={editor} />
                </div>
                <div className="space-y-2">
                    <Tiptap editor={editor} />

                    {contentError && (
                        <div className="flex items-center gap-1.5 px-1 text-sm font-medium text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>{contentError}</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ContentTab;