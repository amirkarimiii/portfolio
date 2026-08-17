import {Suspense} from 'react';
import Link from 'next/link';
import dummyData from '@/dummy-content.json';
import {ContentCard} from '../../../features/article-publishing/components/cards/ContentCard';
import {
    ArticleCardData,
    SeriesCardData,
} from '@/features/article-publishing/types/reference-card.type';
import {Button} from '@/shared/components/ui/button';

interface SeriesPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

async function SeriesArchiveContent({searchParams}: SeriesPageProps) {
    const resolvedSearchParams = await searchParams;
    const currentPage = Math.max(
        1,
        parseInt(resolvedSearchParams.page || '1', 10)
    );

    const rawSeries =
        (dummyData as { series?: (SeriesCardData & { updatedAt?: string })[] }).series || [];
    const rawArticles =
        (dummyData as { articles?: ArticleCardData[] }).articles || [];

    const sortedSeries = [...rawSeries].sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateB - dateA;
    });

    const pageSize = 20;
    const totalItems = sortedSeries.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const validPage = Math.min(currentPage, totalPages);

    const startIndex = (validPage - 1) * pageSize;
    const paginatedSeries = sortedSeries.slice(
        startIndex,
        startIndex + pageSize
    );

    return (
        <>
            <header className="border-b pb-6">
                <h1 className="text-3xl font-bold tracking-tight">Series Archive</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Explore curated article collections and series
                </p>
            </header>

            {paginatedSeries.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                    No series found.
                </div>
            ) : (
                <section className="flex flex-col gap-4 items-center">
                    {paginatedSeries.map((series) => {

                        return (
                            <div key={series._id} className="space-y-4">
                                <ContentCard
                                    type="series"
                                    data={series}
                                    selective={true}
                                />
                            </div>
                        );
                    })}
                </section>
            )}

            {totalPages > 1 && (
                <footer className="flex items-center justify-center gap-2 pt-6 border-t">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        disabled={validPage <= 1}
                        className={validPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    >
                        <Link
                            href={{
                                pathname: '/series',
                                query: {page: (validPage - 1).toString()},
                            }}
                            prefetch={true}
                        >
                            Previous
                        </Link>
                    </Button>

                    <span className="text-xs font-medium text-muted-foreground px-2">
            Page {validPage} of {totalPages}
          </span>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        disabled={validPage >= totalPages}
                        className={
                            validPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                        }
                    >
                        <Link
                            href={{
                                pathname: '/series',
                                query: {page: (validPage + 1).toString()},
                            }}
                            prefetch={true}
                        >
                            Next
                        </Link>
                    </Button>
                </footer>
            )}
        </>
    );
}

export default function SeriesPage(props: SeriesPageProps) {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense
                fallback={
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        Loading series...
                    </div>
                }
            >
                <SeriesArchiveContent {...props} />
            </Suspense>
        </main>
    );
}