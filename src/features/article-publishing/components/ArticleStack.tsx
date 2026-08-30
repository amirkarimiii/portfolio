import Link from 'next/link';
import { ContentCard } from '@/features/article-publishing/components/reference-card/ContentCard';
import { ArticleService } from '@/features/article-publishing/services/articleService';
import { Button } from '@/shared/components/ui/button';

export interface ArticleStackProps {
    searchParams: {
        page?: string;
        sort?: string;
    };
    pageSize?: number;
}

export async function ArticleStack({ searchParams, pageSize = 20 }: ArticleStackProps) {
    const sortOrder = searchParams.sort === 'oldest' ? 'oldest' : 'newest';

    const { articles, totalPages, currentPage } = await ArticleService.getPublishedStandaloneArticles({
        page: searchParams.page,
        sort: searchParams.sort,
        pageSize,
    });

    return (
        <>
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Archive</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Explore articles and insights
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
                                    pathname: '/blog',
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
                                    pathname: '/blog',
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

            {articles.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                    No published articles found.
                </div>
            ) : (
                <section className="flex flex-col gap-4 items-center">
                    {articles.map((article) => (
                        <ContentCard origin="publish" key={article.uniqueId} type="article" data={article} />
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
                                pathname: '/blog',
                                query: { page: (currentPage - 1).toString(), sort: sortOrder },
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
                                pathname: '/blog',
                                query: { page: (currentPage + 1).toString(), sort: sortOrder },
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