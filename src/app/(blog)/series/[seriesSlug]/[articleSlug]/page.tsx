import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import { ArticleService } from '@/features/article-publishing/services/articleService';
import { ArticleViewSkeleton } from '@/features/article-publishing/components/article/ArticleViewSkeleton';

interface PageProps {
    params: Promise<{
        seriesSlug: string;
        articleSlug: string;
    }>;
}

async function SeriesMemberArticleFetcher({
                                              seriesSlug,
                                              articleSlug,
                                          }: {
    seriesSlug: string;
    articleSlug: string;
}) {
    const result = await ArticleService.getSeriesArticleDetails(seriesSlug, articleSlug);

    if (!result) {
        notFound();
    }

    const { article, seriesTitle, mergedTags } = result;

    return (
        <ArticleView
            article={{
                ...article,
                tags: mergedTags,
                seriesTitle: seriesTitle,
            }}
        />
    );
}

export default async function SeriesMemberArticlePage({ params }: PageProps) {
    const { seriesSlug, articleSlug } = await params;

    return (
        <Suspense fallback={<ArticleViewSkeleton />}>
            <SeriesMemberArticleFetcher seriesSlug={seriesSlug} articleSlug={articleSlug} />
        </Suspense>
    );
}