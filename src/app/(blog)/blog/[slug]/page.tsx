import { notFound } from 'next/navigation';
import mockNewArticles from '@/mock-files/new-published-articles.json';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function StandaloneArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const articles = (mockNewArticles.articles || []) as ArticleItem[];
    const article = articles.find((a) => a.slug === slug);

    if (!article || article.lifecycle !== 'Published' || article.seriesId !== null) {
        notFound();
    }

    return <ArticleView article={article} />;
}