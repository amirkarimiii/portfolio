import { Editor } from "@tiptap/react";

export function useImageButton(editor: Editor | null) {
    const addImageBlock = () => {
        if (!editor) return;
        editor.chain().focus().setImageBlock().run();
    };

    const isActive = editor?.isActive('imageBlock') ?? false;
    const canRun = editor?.can().setImageBlock() ?? false;

    return {
        addImageBlock,
        isActive,
        canRun,
    };
}