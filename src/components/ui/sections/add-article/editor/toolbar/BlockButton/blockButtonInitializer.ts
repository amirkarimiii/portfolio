import {FileCodeCorner, Quote, SquarePilcrow} from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const blockButtonInitializer = (editor: Editor | null) => ({
    quote: {
        icon: Quote,
        command: () => editor?.chain().focus().toggleBlockquote().run(),
        hint: "Quote",
        notActive: (ctx: EditorStateSnapshot) =>
            !ctx.editor?.isActive('blockquote') &&
            (ctx.editor?.can().chain().focus().setBlockquote().run() ?? false),
        paddingX: "px-1.5"
    },
    code: {
        icon: FileCodeCorner,
        command: () => editor?.chain().focus().toggleCodeBlock().run(),
        hint: "Code Block",
        notActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setCodeBlock().run() ?? false,
        paddingX: "px-1.5"
    },
    paragraph: {
        icon: SquarePilcrow,
        command: () => editor?.chain().focus().clearNodes().run(),
        hint: "paragraph",
        notActive: (ctx: EditorStateSnapshot) =>
            (ctx.editor?.isActive('blockquote') || ctx.editor?.isActive('codeBlock')),
        paddingX: "px-2"
    }
});