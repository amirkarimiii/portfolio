'use client'
import {useEditor} from '@tiptap/react'
import Tiptap from './article-editor/Tiptap'
import Toolbar from "./article-editor/toolbar/Toolbar";
import {extensions} from "@/features/article-publishing/article-editor/extensions";
import {Button} from "@/shared/components/ui/button";

const EditorSection = () => {
    const editor = useEditor({
        extensions: [
            ...extensions
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'mt-3 min-h-75 w-full rounded-md border p-4 focus:outline-none mx-auto',
            },
        },
    })

    const handleLogContent = () => {
        if (!editor) return
        console.log(editor.getJSON());
        console.log(editor.getHTML());
    }

    return (
        <section className="max-w-4xl mx-auto max-h-max mt-8">
            <Button onClick={handleLogContent}>log</Button>
            <div className="flex flex-col">
                <div className="w-max self-center sticky top-2 z-10 mt-10 bg-background rounded-md border p-1 shadow-lg">
                    <Toolbar editor={editor} />
                </div>
                <Tiptap editor={editor}/>
            </div>
        </section>
    )
}
export default EditorSection