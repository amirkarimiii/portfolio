import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import { ArticleService } from '@/features/article-publishing/services/articleService';
import { ArticleViewSkeleton } from '@/features/article-publishing/components/article/ArticleViewSkeleton';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function StandaloneArticleFetcher({ slug }: { slug: string }) {
    const article = await ArticleService.getPublishedStandaloneArticle(slug);

    if (!article) {
        notFound();
    }

    return <ArticleView article={article} />;
}

export default async function StandaloneArticlePage({ params }: PageProps) {
    const { slug } = await params;

    return (
        <Suspense fallback={<ArticleViewSkeleton />}>
            <StandaloneArticleFetcher slug={slug} />
        </Suspense>
    );
}