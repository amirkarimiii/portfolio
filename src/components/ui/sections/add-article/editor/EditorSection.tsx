'use client'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Tiptap from './Tiptap'
import {Button} from "@/components/ui/shadcn/button";

const EditorSection = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'mt-10 min-h-[300px] w-full rounded-md border p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg mx-auto',
            },
        },
    })

    const handleLogContent = () => {
        if (!editor) return
        console.log(editor.getJSON());
    }

    return (
        <section className="max-w-4xl mx-auto max-h-max mt-8">
            <Button onClick={handleLogContent}>log</Button>
            <Tiptap editor={editor} />
        </section>
    )
}
export default EditorSection