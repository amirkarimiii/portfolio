import { notFound } from 'next/navigation';
import { ArticleRepository } from '@/features/article-publishing/repository/articleRepository';
import { PreviewArticleClient } from '@/features/article-publishing/components/article/PreviewArticleClient';
import mockSeries from '@/mock-files/new-series.json';
import { SeriesCardData } from '@/features/article-publishing/types/reference-card.type';

interface PageProps {
    params: Promise<{
        seriesId: string;
        articleId: string;
    }>;
}

export default async function PreviewSeriesMemberArticlePage({ params }: PageProps) {
    const { seriesId, articleId } = await params;

    const seriesList = (mockSeries.series || []) as SeriesCardData[];
    const currentSeries = seriesList.find((s) => s.uniqueId === seriesId);

    const draftArticle = await ArticleRepository.getDraftArticle(articleId);

    if (!draftArticle) {
        notFound();
    }

    return (
        <PreviewArticleClient
            initialArticle={draftArticle}
            seriesTitle={currentSeries?.title}
        />
    );
}