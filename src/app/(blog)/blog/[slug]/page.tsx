import { notFound } from 'next/navigation';
import Image from 'next/image';
import mockNewArticles from '@/mock-files/new-published-articles.json';
import { Badge } from '@/shared/components/ui/badge';
import {TipTapDocument} from "@/features/article-publishing/types/node-renderers.type";
import {ContentRenderer} from "@/features/article-publishing/components/article/article-editor/ContentRenderer";

export interface ArticleItem {
    uniqueId: string;
    slug: string;
    title: string;
    summary: string;
    lifecycle: string;
    seriesId: string | null;
    tags: string[];
    coverImage: string;
    coverAltText: string;
    thumbnailImage: string;
    thumbnailAltText: string;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl: string | null;
    relatedArticleIds: string[];
    inboundReferencingIds: string[];
    createdAt: string;
    updatedAt: string | null;
    firstPublishedAt: string | null;
    publishedAt: string | null;
    archivedAt: string | null;
    content: TipTapDocument;
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const articles = (mockNewArticles.articles || []) as ArticleItem[];
    return articles
        .filter((article) => article.seriesId === null && article.lifecycle === 'Published')
        .map((article) => ({
            slug: article.slug,
        }));
}

export default async function StandaloneArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const articles = (mockNewArticles.articles || []) as ArticleItem[];
    const article = articles.find((a) => a.slug === slug);

    if (!article || article.lifecycle !== 'Published') {
        notFound();
    }

    if (article.seriesId !== null) {
        notFound();
    }

    const altCover = article.coverAltText || article.title;

    return (
        <article className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
            <header className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    {article.title}
                </h1>
                {article.summary && (
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {article.summary}
                    </p>
                )}
                {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {article.tags.map((tag) => (
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
                <ContentRenderer content={article.content} fallbackTitle={article.title} />
            </main>
        </article>
    );
}