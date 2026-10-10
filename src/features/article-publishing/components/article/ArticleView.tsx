import Image from 'next/image';
import { Badge } from '@/shared/components/ui/badge';
import { ContentRenderer } from "@/features/article-publishing/components/article/article-editor/ContentRenderer";
import type { TipTapDocument } from "@/features/article-publishing/types/node-renderers.type";

export interface ArticleViewData {
    title: string;
    summary?: string;
    tags?: string[];
    coverImage?: string;
    coverAltText?: string;
    content?: TipTapDocument | Record<string, unknown>;
    seriesTitle?: string;
    thumbnailImage: string;
    thumbnailAltText: string;
}

interface ArticleViewProps {
    article: ArticleViewData;
}

export function ArticleView({ article }: ArticleViewProps) {
    const altCover = article.coverAltText || article.title || 'Article Cover';
    const tags = article.tags || [];

    return (
        <article className="container max-w-4xl mx-auto px-4 py-8 space-y-8">

            <header className="space-y-4">
                {article.coverImage && (
                    <>
                        <div className="relative hidden sm:block w-full aspect-4/1 md:aspect-5/1 overflow-hidden rounded-2xl border">
                            <Image
                                src={article.coverImage}
                                alt={altCover}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="relative sm:hidden w-full aspect-5/2 overflow-hidden rounded-2xl border">
                            <Image
                                src={article.thumbnailImage}
                                alt={altCover}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </>
                )}
                {article.seriesTitle && (
                    <div className="text-sm font-medium text-primary">
                        Series: {article.seriesTitle}
                    </div>
                )}
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    {article.title || 'untitled'}
                </h1>
                {article.summary && (
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {article.summary}
                    </p>
                )}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </header>

            <main>
                <ContentRenderer
                    content={(article.content as TipTapDocument) || { type: 'doc', content: [] }}
                    fallbackTitle={article.title}
                />
            </main>
        </article>
    );
}