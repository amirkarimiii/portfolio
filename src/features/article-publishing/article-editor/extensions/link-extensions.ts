import { Link } from "@tiptap/extension-link";

export const linkExtensions = [
    Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
    }),
]