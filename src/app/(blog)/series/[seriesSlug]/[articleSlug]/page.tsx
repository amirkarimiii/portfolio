import { notFound } from 'next/navigation';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import { ArticleService } from '@/features/article-publishing/services/articleService';

interface PageProps {
    params: Promise<{
        seriesSlug: string;
        articleSlug: string;
    }>;
}

export default async function SeriesMemberArticlePage({ params }: PageProps) {
    const { seriesSlug, articleSlug } = await params;

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