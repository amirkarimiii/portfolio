import { Bold } from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const markButtonInitializer = (editor: Editor | null) => ({
    bold: {
        icon: Bold,
        command: () => editor?.chain().focus().toggleBold().run(),
        hint: "Bold",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('bold') ?? false,
        canRun: (ctx: EditorStateSnapshot) =>
            ctx.editor?.can().chain().focus().toggleBold().run() ?? false,
    }
});