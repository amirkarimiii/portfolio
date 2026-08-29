import { notFound } from 'next/navigation';
import mockNewArticles from '@/mock-files/new-published-articles.json';
import mockSeries from '@/mock-files/new-series.json';
import { ArticleView } from '@/features/article-publishing/components/article/ArticleView';
import { SeriesCardData } from '@/features/article-publishing/types/reference-card.type';
import {ArticleItem} from "@/features/article-publishing/types/article-item.type";

interface PageProps {
    params: Promise<{
        seriesSlug: string;
        articleSlug: string;
    }>;
}

export default async function SeriesMemberArticlePage({ params }: PageProps) {
    const { seriesSlug, articleSlug } = await params;

    const seriesList = (mockSeries.series || []) as SeriesCardData[];
    const currentSeries = seriesList.find((s) => s.slug === seriesSlug);

    if (!currentSeries) {
        notFound();
    }

    const articles = (mockNewArticles.articles || []) as ArticleItem[];
    const article = articles.find((a) => a.slug === articleSlug);

    if (
        !article ||
        article.lifecycle !== 'Published' ||
        article.seriesId !== currentSeries.uniqueId
    ) {
        notFound();
    }

    const seriesTags = currentSeries.defaultTags || [];
    const articleManualTags = article.tags || [];
    const uniqueArticleTags = articleManualTags.filter((tag) => !seriesTags.includes(tag));
    const finalTags = [...seriesTags, ...uniqueArticleTags];

    return (
        <ArticleView
            article={{
                ...article,
                tags: finalTags,
                seriesTitle: currentSeries.title,
            }}
        />
    );
}