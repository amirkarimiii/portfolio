import Image from 'next/image';
import { ContentCard } from '@/features/article-publishing/components/reference-card/ContentCard';
import { Badge } from '@/shared/components/ui/badge';
import type { SeriesItem } from '@/features/article-publishing/types/series-item.type';
import type { ArticleCardData } from '@/features/article-publishing/types/reference-card.type';

export interface SeriesLandingViewProps {
    series: SeriesItem;
    articles: ArticleCardData[];
}

export function SeriesLandingView({ series, articles }: SeriesLandingViewProps) {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-10">
            <header className="relative w-full overflow-hidden rounded-2xl border bg-card">
                <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] bg-muted overflow-hidden">
                    <Image
                        src={series.coverImage || series.thumbnailImage}
                        alt={series.coverAltText || series.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                <div className="p-6 md:p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs font-semibold border-primary/40 text-primary">
                            Series Collection
                        </Badge>

                        {series.defaultTags && series.defaultTags.length > 0 && (
                            <>
                                <span className="text-muted-foreground/40">•</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {series.defaultTags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        {series.title}
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                        {series.description}
                    </p>
                </div>
            </header>

            <section className="space-y-6">
                <div className="border-b pb-3 flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Articles in this Series
                    </h2>
                    <span className="text-xs font-medium text-muted-foreground">
                        {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                    </span>
                </div>

                {articles.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                        No published articles in this series yet.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 items-center">
                        {articles.map((article) => (
                            <ContentCard
                                origin="publish"
                                key={article.uniqueId}
                                type="article"
                                data={article}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}