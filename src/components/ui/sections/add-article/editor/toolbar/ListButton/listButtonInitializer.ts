import {List, ListOrdered} from "lucide-react";
import {Editor, EditorStateSnapshot} from "@tiptap/react";

export const listButtonInitializer = (editor: Editor | null) => ({
    bullet: {
        icon: List,
        command: () => editor?.chain().focus().toggleBulletList().run(),
        hint: "Bullet list",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('bulletList') ?? false,
        canRun: (ctx: EditorStateSnapshot) => ctx.editor?.can().chain().focus().toggleBulletList().run() ?? false,
    },
    ordered: {
        icon: ListOrdered,
        command: () => editor?.chain().focus().toggleOrderedList().run(),
        hint: "Ordered list",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('orderedList') ?? false,
        canRun: (ctx: EditorStateSnapshot) => ctx.editor?.can().chain().focus().toggleOrderedList().run() ?? false,
    },
});