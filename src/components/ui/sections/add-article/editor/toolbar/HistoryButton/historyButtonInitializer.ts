import { RedoIcon, UndoIcon } from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const historyButtonInitializer = (editor: Editor | null) => ({
    undo: {
        icon: UndoIcon,
        command: () => editor?.chain().focus().undo().run(),
        hint: "Undo",
        canExecute: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().undo().run() ?? false,
    },
    redo: {
        icon: RedoIcon,
        command: () => editor?.chain().focus().redo().run(),
        hint: "Redo",
        canExecute: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().redo().run() ?? false,
    },
});