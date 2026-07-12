'use client'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Tiptap from './Tiptap'
import {Button} from "@/components/ui/shadcn/button";

const EditorSection = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        immediatelyRender: false,
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