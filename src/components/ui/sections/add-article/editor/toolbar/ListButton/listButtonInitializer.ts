import {List, ListOrdered} from "lucide-react";
import { Editor } from "@tiptap/react";

export const listButtonInitializer = (editor: Editor | null) => ({
    bullet: {
        icon: List,
        command: () => editor?.chain().focus().toggleBulletList().run(),
        hint: "bullet list",
    },
    ordered: {
        icon: ListOrdered,
        command: () => editor?.chain().focus().toggleOrderedList().run(),
        hint: "ordered list",
    },
});