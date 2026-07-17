import {FileCodeCorner, Quote} from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const blockButtonInitializer = (editor: Editor | null) => ({
    quote: {
        icon: Quote,
        command: () => editor?.chain().focus().setBlockquote().run(),
        hint: "Quote",
        canExecute: (ctx: EditorStateSnapshot) =>
            !ctx.editor?.isActive('blockquote') &&
            (ctx.editor?.can().chain().focus().setBlockquote().run() ?? false)
    },
    code: {
        icon: FileCodeCorner,
        command: () => editor?.chain().focus().setCodeBlock().run(),
        hint: "Code Block",
        canExecute: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setCodeBlock().run() ?? false,
    },
});