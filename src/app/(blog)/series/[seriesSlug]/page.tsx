import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { SeriesService } from '@/features/article-publishing/services/seriesService';
import { SeriesLandingView } from "@/features/article-publishing/components/SeriesLandingView";
import { SeriesLandingSkeleton } from "@/features/article-publishing/components/SeriesLandingSkeleton";

interface SeriesLandingPageProps {
    params: Promise<{
        seriesSlug: string;
    }>;
}

async function SeriesLandingFetcher({ seriesSlug }: { seriesSlug: string }) {
    const data = await SeriesService.getSeriesWithArticles(seriesSlug);

    if (!data) {
        notFound();
    }

    return <SeriesLandingView series={data.series} articles={data.articles} />;
}

export default async function SeriesLandingPage({ params }: SeriesLandingPageProps) {
    const { seriesSlug } = await params;

    return (
        <Suspense fallback={<SeriesLandingSkeleton />}>
            <SeriesLandingFetcher seriesSlug={seriesSlug} />
        </Suspense>
    );
}