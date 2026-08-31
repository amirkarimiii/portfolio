import Link from 'next/link';
import { ContentCard } from '@/features/article-publishing/components/reference-card/ContentCard';
import { SeriesService } from '@/features/article-publishing/services/seriesService';
import { Button } from '@/shared/components/ui/button';

export interface SeriesStackProps {
    searchParams: {
        page?: string;
    };
    pageSize?: number;
}

export async function SeriesStack({ searchParams, pageSize = 20 }: SeriesStackProps) {
    const { series, totalPages, currentPage } = await SeriesService.getPaginatedSeries({
        page: searchParams.page,
        pageSize,
    });

    return (
        <>
            <header className="border-b pb-6">
                <h1 className="text-3xl font-bold tracking-tight">Series Archive</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Explore curated article collections and series
                </p>
            </header>

            {series.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                    No series found.
                </div>
            ) : (
                <section className="flex flex-col gap-4 items-center">
                    {series.map((item) => (
                        <div key={item.uniqueId} className="space-y-4">
                            <ContentCard
                                type="series"
                                data={item}
                                selective={true}
                            />
                        </div>
                    ))}
                </section>
            )}

            {totalPages > 1 && (
                <footer className="flex items-center justify-center gap-2 pt-6 border-t">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        disabled={currentPage <= 1}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    >
                        <Link
                            href={{
                                pathname: '/series',
                                query: { page: (currentPage - 1).toString() },
                            }}
                            prefetch={true}
                        >
                            Previous
                        </Link>
                    </Button>

                    <span className="text-xs font-medium text-muted-foreground px-2">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                    >
                        <Link
                            href={{
                                pathname: '/series',
                                query: { page: (currentPage + 1).toString() },
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