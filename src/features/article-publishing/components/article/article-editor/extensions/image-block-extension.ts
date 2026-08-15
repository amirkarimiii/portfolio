import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageBlockView } from './ImageBlockView';

export interface ImageBlockOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageBlock: {
            setImageBlock: (attributes?: {
                src?: string;
                alt?: string;
                caption?: string;
                isEditing?: boolean;
            }) => ReturnType;
        };
    }
}

export const ImageBlockExtension = Node.create<ImageBlockOptions>({
    name: 'imageBlock',

    group: 'block',

    atom: true,

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: '',
            },
            alt: {
                default: '',
            },
            caption: {
                default: '',
            },
            isEditing: {
                default: true,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'figure[data-type="image-block"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': 'image-block' })];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageBlockView);
    },

    addCommands() {
        return {
            setImageBlock:
                (attrs) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: {
                                isEditing: true,
                                ...attrs,
                            },
                        });
                    },
        };
    },
});