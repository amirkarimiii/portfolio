import React from 'react';
import {TipTapNode} from "@/features/article-publishing/types/node-renderers.type";

export const renderInlineContent = (nodes?: TipTapNode[]): React.ReactNode => {
    if (!nodes) return null;

    return nodes.map((node, index) => {
        if (node.type !== 'text' || !node.text) return null;

        let element: React.ReactNode = node.text;

        if (node.marks && node.marks.length > 0) {
            node.marks.forEach((mark) => {
                switch (mark.type) {
                    case 'bold':
                        element = <strong key={index}>{element}</strong>;
                        break;
                    case 'italic':
                        element = <em key={index}>{element}</em>;
                        break;
                    case 'underline':
                        element = <u key={index}>{element}</u>;
                        break;
                    case 'strike':
                        element = <s key={index}>{element}</s>;
                        break;
                    case 'code':
                        element = (
                            <code
                                key={index}
                                className="rounded border border-border bg-muted/50 px-[0.38rem] py-[0.12rem] font-mono text-[0.85em] font-medium"
                            >
                                {element}
                            </code>
                        );
                        break;
                    case 'highlight':
                        element = (
                            <mark
                                key={index}
                                className="rounded px-[0.18em] py-[0.05em] bg-[#fde68a] text-inherit dark:bg-[#a16207] dark:text-white"
                            >
                                {element}
                            </mark>
                        );
                        break;
                    case 'link': {
                        const href = (mark.attrs?.href as string) || '#';
                        element = (
                            <a
                                key={index}
                                href={href}
                                className="rounded-[0.45rem] border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-600 text-decoration-none transition-all hover:brightness-95 dark:border-blue-500/40 dark:bg-slate-800 dark:text-blue-300"
                            >
                                {element}
                            </a>
                        );
                        break;
                    }
                }
            });
        }

        return <React.Fragment key={index}>{element}</React.Fragment>;
    });
};