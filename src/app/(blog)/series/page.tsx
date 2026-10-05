import { Suspense } from 'react';
import { SeriesStack } from "@/features/article-publishing/components/SeriesStack";
import { SeriesStackSkeleton } from "@/features/article-publishing/components/reference-card/SeriesCardSkeleton";

interface SeriesPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function SeriesPage(props: SeriesPageProps) {
    const searchParams = await props.searchParams;

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense fallback={<SeriesStackSkeleton />}>
                <SeriesStack searchParams={searchParams} />
            </Suspense>
        </main>
    );
}