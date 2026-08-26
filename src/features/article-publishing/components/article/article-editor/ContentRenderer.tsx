import React from 'react';
import { strategyRegistry } from './node-renderers/strategy-registry';
import {NodeRendererContext, TipTapDocument, TipTapNode} from "@/features/article-publishing/types/node-renderers.type";

interface ContentRendererProps {
    content: TipTapDocument;
    fallbackTitle: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
                                                                    content,
                                                                    fallbackTitle,
                                                                }) => {
    if (!content || !Array.isArray(content.content)) {
        return null;
    }

    const renderNode = (node: TipTapNode, index: number): React.ReactNode => {
        const strategy = strategyRegistry.getStrategy(node);

        if (!strategy) {
            return null;
        }

        const context: NodeRendererContext = {
            fallbackTitle,
            renderChildren: (children?: TipTapNode[]) => {
                if (!children) return null;
                return children.map((child, childIndex) => renderNode(child, childIndex));
            },
        };

        return strategy.render(node, index, context);
    };

    return (
        <div className="prose dark:prose-invert max-w-none">
            {content.content.map((node, index) => renderNode(node, index))}
        </div>
    );
};