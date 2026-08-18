import { Suspense } from 'react';
import Link from 'next/link';
import dummyData from '@/mock-files/draft-articles.json';
import { ContentCard } from '@/features/article-publishing/components/reference-card/ContentCard';
import { ArticleCardData } from '@/features/article-publishing/types/reference-card.type';
import { Button } from '@/shared/components/ui/button';

interface DraftsPageProps {
    searchParams: Promise<{
        page?: string;
        sort?: string;
    }>;
}

async function DraftsArchiveContent({ searchParams }: DraftsPageProps) {
    const resolvedSearchParams = await searchParams;
    const currentPage = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10));
    const sortOrder = resolvedSearchParams.sort === 'oldest' ? 'oldest' : 'newest';

    const rawArticles = (dummyData as { articles?: ArticleCardData[] }).articles || [];

    const draftArticles = rawArticles.filter(
        (article) => article.lifecycle?.toLowerCase() === 'draft'
    );

    const sortedArticles = [...draftArticles].sort((a, b) => {
        const dateA = new Date(a.firstPublishedAt || a.publishedAt || 0).getTime();
        const dateB = new Date(b.firstPublishedAt || b.publishedAt || 0).getTime();

        return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
    });

    const pageSize = 20;
    const totalItems = sortedArticles.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const validPage = Math.min(currentPage, totalPages);

    const startIndex = (validPage - 1) * pageSize;
    const paginatedArticles = sortedArticles.slice(
        startIndex,
        startIndex + pageSize
    );

    return (
        <>
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Draft Articles</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and edit unpublished article drafts
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">Sort by:</span>
                    <div className="flex border rounded-lg overflow-hidden p-0.5 bg-muted/20">
                        <Button
                            asChild
                            variant={sortOrder === 'newest' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-7 px-3 text-xs"
                        >
                            <Link
                                href={{
                                    pathname: '/admin/articles/drafts',
                                    query: { page: '1', sort: 'newest' },
                                }}
                                replace
                            >
                                Newest
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={sortOrder === 'oldest' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-7 px-3 text-xs"
                        >
                            <Link
                                href={{
                                    pathname: '/admin/articles/drafts',
                                    query: { page: '1', sort: 'oldest' },
                                }}
                                replace
                            >
                                Oldest
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {paginatedArticles.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                    No draft articles found.
                </div>
            ) : (
                <section className="flex flex-col gap-4 items-center">
                    {paginatedArticles.map((article) => (
                        <ContentCard key={article.uniqueId} type="article" data={article} />
                    ))}
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
                                pathname: '/admin/articles/drafts',
                                query: { page: (validPage - 1).toString(), sort: sortOrder },
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
                                pathname: '/admin/articles/drafts',
                                query: { page: (validPage + 1).toString(), sort: sortOrder },
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

export default function DraftsPage(props: DraftsPageProps) {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense fallback={<div className="py-12 text-center text-sm text-muted-foreground">Loading drafts...</div>}>
                <DraftsArchiveContent {...props} />
            </Suspense>
        </main>
    );
}