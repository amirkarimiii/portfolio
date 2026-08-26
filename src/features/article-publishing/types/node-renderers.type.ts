import React from 'react';

export type TipTapMarkType =
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strike'
    | 'code'
    | 'highlight'
    | 'link';

export interface TipTapMark {
    type: TipTapMarkType;
    attrs?: Record<string, unknown>;
}

export interface TipTapNode {
    type: string;
    text?: string;
    attrs?: Record<string, unknown>;
    marks?: TipTapMark[];
    content?: TipTapNode[];
}

export interface TipTapDocument {
    type: string;
    content?: TipTapNode[];
}

export interface NodeRendererContext {
    fallbackTitle: string;
    renderChildren: (nodes?: TipTapNode[]) => React.ReactNode;
}

export interface NodeRendererStrategy {
    canRender: (node: TipTapNode) => boolean;
    render: (node: TipTapNode, index: number, context: NodeRendererContext) => React.ReactNode;
}