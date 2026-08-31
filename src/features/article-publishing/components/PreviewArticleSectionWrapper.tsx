import { notFound } from 'next/navigation';
import { ArticleService } from '@/features/article-publishing/services/articleService';
import { SeriesService } from '@/features/article-publishing/services/seriesService';
import { PreviewArticleClient } from '@/features/article-publishing/components/article/PreviewArticleClient';

interface PreviewArticleSectionWrapperProps {
    articleId: string;
}

export async function PreviewArticleSectionWrapper({ articleId }: PreviewArticleSectionWrapperProps) {
    const draftArticle = await ArticleService.getDraftArticleById(articleId);

    if (!draftArticle) {
        notFound();
    }

    let seriesTitle: string | undefined;

    if (draftArticle.seriesId) {
        const series = await SeriesService.getSeriesById(draftArticle.seriesId);
        seriesTitle = series?.title;
    }

    return (
        <PreviewArticleClient
            initialArticle={draftArticle}
            seriesTitle={seriesTitle}
        />
    );
}