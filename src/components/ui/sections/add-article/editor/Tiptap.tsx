'use client'
import { EditorContent, Editor } from '@tiptap/react'

interface TiptapProps {
    editor: Editor | null
}

const Tiptap = ({ editor }: TiptapProps) => {
    return <EditorContent editor={editor} />
}
export default Tiptap