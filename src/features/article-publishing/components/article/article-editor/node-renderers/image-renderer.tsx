import React from 'react';
import Image from 'next/image';
import {
    NodeRendererContext,
    NodeRendererStrategy,
    TipTapNode
} from "@/features/article-publishing/types/node-renderers.type";

export const imageBlockStrategy: NodeRendererStrategy = {
    canRender: (node: TipTapNode) => node.type === 'imageBlock',

    render: (
        node: TipTapNode,
        index: number,
        context: NodeRendererContext
    ): React.ReactNode => {
        const src = (node.attrs?.src as string) || '';
        const alt = (node.attrs?.alt as string) || context.fallbackTitle;
        const caption = node.attrs?.caption as string | undefined;

        if (!src) return null;

        return (
            <figure key={index} className="my-6 flex flex-col items-center">
                <div className="relative w-full max-w-2xl overflow-hidden rounded-xl">
                    <Image
                        src={src}
                        alt={alt}
                        width={800}
                        height={450}
                        className="h-auto w-full rounded-xl object-cover"
                    />
                </div>
                {caption && (
                    <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
                        {caption}
                    </figcaption>
                )}
            </figure>
        );
    },
};