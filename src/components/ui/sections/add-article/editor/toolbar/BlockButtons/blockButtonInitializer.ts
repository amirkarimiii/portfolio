import {FileCodeCorner, Quote, SquarePilcrow} from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const blockButtonInitializer = (editor: Editor | null) => ({
    quote: {
        icon: Quote,
        command: () => editor?.chain().focus().setBlockquote().run(),
        hint: "Quote",
        canExecute: (ctx: EditorStateSnapshot) =>
            !ctx.editor?.isActive('blockquote') &&
            (ctx.editor?.can().chain().focus().setBlockquote().run() ?? false),
        paddingX: "px-1.5"
    },
    code: {
        icon: FileCodeCorner,
        command: () => editor?.chain().focus().setCodeBlock().run(),
        hint: "Code Block",
        canExecute: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setCodeBlock().run() ?? false,
        paddingX: "px-1.5"
    },
    paragraph: {
        icon: SquarePilcrow,
        command: () => editor?.chain().focus().clearNodes().run(),
        hint: "paragraph",
        canExecute: (ctx: EditorStateSnapshot) =>
            (ctx.editor?.isActive('blockquote') || ctx.editor?.isActive('codeBlock')),
        paddingX: "px-2"
    }
});