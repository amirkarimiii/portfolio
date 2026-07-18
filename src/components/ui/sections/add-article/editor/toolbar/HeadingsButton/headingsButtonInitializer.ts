import {Heading2, Heading3, Heading4} from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const headingButtonInitializer = (editor: Editor | null) => ({
    h2: {
        icon: Heading2,
        command: () => editor?.chain().focus().toggleHeading({level: 2}).run(),
        hint: "Heading 2",
        notActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setHeading({level: 2}).run() ?? false,
    },
    h3: {
        icon: Heading3,
        command: () => editor?.chain().focus().toggleHeading({level: 3}).run(),
        hint: "Heading 3",
        notActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setHeading({level: 3}).run() ?? false,
    },
    h4: {
        icon: Heading4,
        command: () => editor?.chain().focus().toggleHeading({level: 4}).run(),
        hint: "Heading 4",
        notActive: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().setHeading({level: 4}).run() ?? false,
    },
});