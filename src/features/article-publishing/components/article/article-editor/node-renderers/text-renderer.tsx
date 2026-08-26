import React from 'react';
import { renderInlineContent } from './mark-renderer';
import {
    NodeRendererContext,
    NodeRendererStrategy,
    TipTapNode
} from "@/features/article-publishing/types/node-renderers.type";

export const textNodeStrategy: NodeRendererStrategy = {
    canRender: (node: TipTapNode) => {
        return [
            'paragraph',
            'heading',
            'blockquote',
            'codeBlock',
            'bulletList',
            'orderedList',
            'listItem',
        ].includes(node.type);
    },

    render: (
        node: TipTapNode,
        index: number,
        context: NodeRendererContext
    ): React.ReactNode => {
        switch (node.type) {
            case 'paragraph': {
                if (!node.content || node.content.length === 0) {
                    return <p key={index} className="h-4" />;
                }
                return (
                    <p key={index} className="mb-4 text-base leading-relaxed">
                    {renderInlineContent(node.content)}
                </p>
            );
            }

            case 'heading': {
                const level = (node.attrs?.level as number) || 2;
                const headingText = renderInlineContent(node.content);

                if (level === 2) {
                    return (
                        <h2 key={index} className="mb-3 mt-7 text-2xl font-bold leading-snug">
                        {headingText}
                        </h2>
                );
                }
                if (level === 3) {
                    return (
                        <h3 key={index} className="mb-2 mt-6 text-xl font-semibold leading-snug">
                        {headingText}
                        </h3>
                );
                }
                if (level === 4) {
                    return (
                        <h4 key={index} className="mb-2 mt-5 text-lg font-semibold leading-normal">
                        {headingText}
                        </h4>
                );
                }
                return (
                    <h2 key={index} className="mb-3 mt-7 text-2xl font-bold leading-snug">
                    {headingText}
                    </h2>
            );
            }

            case 'blockquote': {
                return (
                    <blockquote
                        key={index}
                className="my-4 border-l-2 border-primary bg-primary/5 py-1 pl-4 pr-4 italic [&>p]:m-0"
                    >
                    {context.renderChildren(node.content)}
                    </blockquote>
            );
            }

            case 'codeBlock': {
                const codeText = node.content?.map((c) => c.text || '').join('') || '';
                return (
                    <pre
                        key={index}
                className="my-4 overflow-x-auto rounded-lg border border-border bg-primary/5 p-4 text-foreground dark:bg-muted"
                >
                <code className="font-mono text-sm leading-relaxed">{codeText}</code>
                    </pre>
            );
            }

            case 'bulletList': {
                return (
                    <ul key={index} className="my-4 list-disc pl-6 space-y-1">
                    {context.renderChildren(node.content)}
                    </ul>
            );
            }

            case 'orderedList': {
                const start = (node.attrs?.start as number) || 1;
                return (
                    <ol key={index} start={start} className="my-4 list-decimal pl-6 space-y-1">
                    {context.renderChildren(node.content)}
                    </ol>
            );
            }

            case 'listItem': {
                return (
                    <li key={index} className="my-1 [&>p]:m-0">
                    {context.renderChildren(node.content)}
                    </li>
            );
            }

            default:
                return null;
        }
    },
};