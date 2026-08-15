import { FileCodeCorner, Quote } from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const blockButtonInitializer = (editor: Editor | null) => ({
    quote: {
        icon: Quote,
        command: () => editor?.chain().focus().toggleBlockquote().run(),
        hint: "Quote",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('blockquote') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleBlockquote().run() ?? false,
    },
    code: {
        icon: FileCodeCorner,
        command: () => editor?.chain().focus().toggleCodeBlock().run(),
        hint: "Code Block",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('codeBlock') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleCodeBlock().run() ?? false,
    }
});