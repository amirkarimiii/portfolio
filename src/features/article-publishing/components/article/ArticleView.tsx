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
                {article.seriesTitle && (
                    <div className="text-sm font-medium text-primary">
                        Series: {article.seriesTitle}
                    </div>
                )}
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    {article.title || 'بدون عنوان'}
                </h1>
                {article.summary && (
                    <p className="text-xl text-muted-foreground leading-relaxed">
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

            {article.coverImage && (
                <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl border">
                    <Image
                        src={article.coverImage}
                        alt={altCover}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
            )}

            <main className="pt-4">
                <ContentRenderer
                    content={(article.content as TipTapDocument) || { type: 'doc', content: [] }}
                    fallbackTitle={article.title}
                />
            </main>
        </article>
    );
}