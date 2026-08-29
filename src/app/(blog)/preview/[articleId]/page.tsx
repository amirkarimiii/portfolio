import { notFound } from 'next/navigation';
import { ArticleRepository } from '@/features/article-publishing/repository/articleRepository';
import { PreviewArticleClient } from '@/features/article-publishing/components/article/PreviewArticleClient';

interface PageProps {
    params: Promise<{
        articleId: string;
    }>;
}

export default async function PreviewArticlePage({ params }: PageProps) {
    const { articleId } = await params;
    const draftArticle = await ArticleRepository.getDraftArticle(articleId);

    if (!draftArticle) {
        notFound();
    }

    return <PreviewArticleClient initialArticle={draftArticle} />;
}