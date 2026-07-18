import {Bold, Italic, Strikethrough} from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const markButtonInitializer = (editor: Editor | null) => ({
    bold: {
        icon: Bold,
        command: () => editor?.chain().focus().toggleBold().run(),
        hint: "Bold",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('bold') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleBold().run() ?? false,
    },
    italic: {
        icon: Italic,
        command: () => editor?.chain().focus().toggleItalic().run(),
        hint: "Italic",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('italic') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleItalic().run() ?? false,
    },
    strikethrough: {
        icon: Strikethrough,
        command: () => editor?.chain().focus().toggleStrike().run(),
        hint: "Strikethrough",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('strike') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleStrike().run() ?? false,
    },
});