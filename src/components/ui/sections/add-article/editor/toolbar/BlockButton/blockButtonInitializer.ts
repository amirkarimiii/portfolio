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
    },
    code: {
        icon: FileCodeCorner,
        command: () => editor?.chain().focus().toggleCodeBlock().run(),
        hint: "Code Block",
        notActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setCodeBlock().run() ?? false,
    }
});