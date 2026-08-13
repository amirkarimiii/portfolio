'use client';

import { useEditor } from '@tiptap/react';
import { useFormContext } from 'react-hook-form';
import { extensions } from '@/features/article-publishing/article-editor/extensions';
import Toolbar from '@/features/article-publishing/article-editor/toolbar/Toolbar';
import Tiptap from '@/features/article-publishing/article-editor/Tiptap';
import { EditorSkeleton } from './EditorSkeleton';
import type { ArticleFormValues } from '@/features/article-publishing/schemas/articleFormSchema';

export function ContentTab() {
    const { setValue, getValues } = useFormContext<ArticleFormValues>();

    const editor = useEditor({
        extensions,
        content: getValues('content'),
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    'mx-auto mt-4 min-h-[500px] w-full max-w-[728px] rounded-lg border bg-background p-6 md:p-8 text-foreground focus:outline-none transition-colors shadow-sm',
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
        <section className="mx-auto mt-6 max-w-[728px] space-y-4">
            <div className="sticky top-2 z-10 mx-auto w-fit rounded-md border bg-background/95 p-1 shadow-md backdrop-blur-md">
                <Toolbar editor={editor} />
            </div>
            <Tiptap editor={editor} />
        </section>
    );
}