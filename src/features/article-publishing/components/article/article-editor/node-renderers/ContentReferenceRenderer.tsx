import React from 'react';
import { DynamicReferenceCard } from './DynamicReferenceCard';
import {
    NodeRendererContext,
    NodeRendererStrategy,
    TipTapNode,
} from "@/features/article-publishing/types/node-renderers.type";

export const contentReferenceStrategy: NodeRendererStrategy = {
    canRender: (node: TipTapNode) => node.type === 'contentReference',

    render: (
        node: TipTapNode,
        index: number,
        _context: NodeRendererContext
    ): React.ReactNode => {
        const refId = (node.attrs?.id as string | null) || null;
        const refType = ((node.attrs?.type as 'article' | 'series') || 'article');

        return (
            <div key={index} className="my-6 max-w-2xl">
                <DynamicReferenceCard refId={refId} refType={refType} />
            </div>
        );
    },
};