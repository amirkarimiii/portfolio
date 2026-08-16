import { Node, mergeAttributes } from '@tiptap/core';

export interface ContentReferenceAttributes {
    id: string | null;
    type: 'article' | 'series';
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        contentReference: {
            setContentReference: (attributes: ContentReferenceAttributes) => ReturnType;
        };
    }
}

export const ContentReferenceNode = Node.create({
    name: 'contentReference',

    group: 'block',

    atom: true,

    selectable: true,

    draggable: true,

    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-id'),
                renderHTML: (attributes) => {
                    if (!attributes.id) {
                        return {};
                    }
                    return {
                        'data-id': attributes.id,
                    };
                },
            },
            type: {
                default: 'article',
                parseHTML: (element) => element.getAttribute('data-reference-type') || 'article',
                renderHTML: (attributes) => {
                    return {
                        'data-reference-type': attributes.type,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="content-reference"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, { 'data-type': 'content-reference' }),
        ];
    },

    addCommands() {
        return {
            setContentReference:
                (attributes) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: attributes,
                        });
                    },
        };
    },
});

export default ContentReferenceNode;