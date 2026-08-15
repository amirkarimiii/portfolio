import { Link } from "lucide-react";
import { Editor, EditorStateSnapshot } from "@tiptap/react";

export const linkButtonInitializer = (editor: Editor | null) => ({
    link: {
        icon: Link,
        hint: "Link",
        isActive: (ctx: EditorStateSnapshot) => ctx.editor?.isActive('link') ?? false,
        canRun: (ctx: EditorStateSnapshot) => {
            if (!ctx.editor) return false;
            return !ctx.editor.state.selection.empty || ctx.editor.isActive('link');
        },
        getHref: (ctx: EditorStateSnapshot) => ctx.editor?.getAttributes('link').href ?? "",
        setLink: (href: string) =>
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run(),
        unsetLink: () =>
            editor?.chain().focus().extendMarkRange('link').unsetLink().run(),
    }
});