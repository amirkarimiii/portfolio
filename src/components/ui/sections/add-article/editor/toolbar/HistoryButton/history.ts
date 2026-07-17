import {RedoIcon, UndoIcon} from "lucide-react";
import {Editor} from "@tiptap/react";

export const HISTORY = {
    undo: {
        icon: UndoIcon,
        command: (editor: Editor | null) => editor?.chain().focus().undo().run(),
        hint: "Undo",
    },
    redo: {
        icon: RedoIcon,
        command: (editor: Editor | null) => editor?.chain().focus().redo().run(),
        hint: "Redo",
    },
} as const;