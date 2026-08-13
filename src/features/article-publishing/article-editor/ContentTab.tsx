'use client';

import { useEditor } from '@tiptap/react';
import { extensions } from "@/features/article-publishing/article-editor/extensions";
import Toolbar from "@/features/article-publishing/article-editor/toolbar/Toolbar";
import Tiptap from "@/features/article-publishing/article-editor/Tiptap";

export function ContentTab() {
    const editor = useEditor({
        extensions: [
            ...extensions
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'mt-4 min-h-[300px] w-full rounded-md border bg-background p-6 focus:outline-none transition-colors',
            },
        },
    });

    return (
        <section className="max-w-4xl mx-auto mt-6 space-y-4">
            <div className="sticky top-2 z-10 mx-auto w-fit rounded-md border bg-background/95 p-1 shadow-md backdrop-blur-md">
                <Toolbar editor={editor} />
            </div>
            <Tiptap editor={editor} />
        </section>
    );
}