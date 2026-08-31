import { notFound } from 'next/navigation';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import { ArticleService } from '@/features/article-publishing/services/articleService';

interface PageProps {
    params: Promise<{
        articleId: string;
    }>;
}

export default async function ArchivedArticlePage({ params }: PageProps) {
    const { articleId } = await params;

    const article = await ArticleService.getArchivedArticleById(articleId);

    if (!article) {
        notFound();
    }

    return <ArticleView article={article} />;
}