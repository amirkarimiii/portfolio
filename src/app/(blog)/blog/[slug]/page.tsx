import { notFound } from 'next/navigation';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import { ArticleService } from '@/features/article-publishing/services/articleService';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function StandaloneArticlePage({ params }: PageProps) {
    const { slug } = await params;

    const article = await ArticleService.getPublishedStandaloneArticle(slug);

    if (!article) {
        notFound();
    }

    return <ArticleView article={article} />;
}