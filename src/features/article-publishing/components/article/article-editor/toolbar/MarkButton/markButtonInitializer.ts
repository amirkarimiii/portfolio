import {Bold, Highlighter, Italic, Strikethrough, Underline, Code} from "lucide-react";
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
    underline: {
        icon: Underline,
        command: () => editor?.chain().focus().toggleUnderline().run(),
        hint: "Underline",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('underline') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleUnderline().run() ?? false,
    },
    highlight: {
        icon: Highlighter,
        command: () => editor?.chain().focus().toggleHighlight().run(),
        hint: "Highlight",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('highlight') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleHighlight().run() ?? false,
    },
    inlineCode: {
        icon: Code,
        command: () => editor?.chain().focus().toggleCode().run(),
        hint: "Inline Code",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('code') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleCode().run() ?? false,
    }
});