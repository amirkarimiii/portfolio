import { Image } from "@tiptap/extension-image";

export const embedExtensions = [
    Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
            class: 'rounded-lg my-4 max-w-full h-auto',
        },
    }),
]