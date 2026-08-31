import { notFound } from 'next/navigation';
import { SeriesService } from '@/features/article-publishing/services/seriesService';
import {SeriesLandingView} from "@/features/article-publishing/components/SeriesLandingView";

interface SeriesLandingPageProps {
    params: Promise<{
        seriesSlug: string;
    }>;
}

export default async function SeriesLandingPage({ params }: SeriesLandingPageProps) {
    const { seriesSlug } = await params;

    const data = await SeriesService.getSeriesWithArticles(seriesSlug);

    if (!data) {
        notFound();
    }

    return <SeriesLandingView series={data.series} articles={data.articles} />;
}