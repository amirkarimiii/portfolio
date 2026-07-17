import {RedoIcon, UndoIcon} from "lucide-react";
import {Editor} from "@tiptap/react";

export const HISTORY = {
    undo: {
        icon: UndoIcon,
        command: (editor: Editor | null) => editor?.chain().focus().undo().run(),
    },
    redo: {
        icon: RedoIcon,
        command: (editor: Editor | null) => editor?.chain().focus().redo().run(),
    },
} as const;