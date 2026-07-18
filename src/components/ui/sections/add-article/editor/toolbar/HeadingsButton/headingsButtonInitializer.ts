import { Heading2, Heading3, Heading4 } from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const headingButtonInitializer = (editor: Editor | null) => ({
    h2: {
        icon: Heading2,
        command: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        hint: "Heading 2",
        isActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.isActive('heading', { level: 2 }) ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleHeading({ level: 2 }).run() ?? false,
    },
    h3: {
        icon: Heading3,
        command: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        hint: "Heading 3",
        isActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.isActive('heading', { level: 3 }) ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleHeading({ level: 3 }).run() ?? false,
    },
    h4: {
        icon: Heading4,
        command: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
        hint: "Heading 4",
        isActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.isActive('heading', { level: 4 }) ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleHeading({ level: 4 }).run() ?? false,
    },
});