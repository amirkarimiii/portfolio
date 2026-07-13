'use client'
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Tiptap from './Tiptap'
import {Button} from "@/components/ui/shadcn/button";
import SimpleToolbar from "./toolbar/SimpleToolbar";

const EditorSection = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'mt-3 min-h-[300px] w-full rounded-md border p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg mx-auto',
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
            <div className="flex flex-col">
                <div className="bg-background self-center sticky top-2 z-10 mt-10 w-[calc(100%-2.5rem)] rounded-md border p-1 shadow-lg">
                    <SimpleToolbar editor={editor} />
                </div>
                <Tiptap editor={editor}/>
                <Button className="self-center w-sm mt-3 mb-15" onClick={handleLogContent}>log</Button>
            </div>
        </section>
    )
}
export default EditorSection