import {notFound} from 'next/navigation';
import Image from 'next/image';
import {Layers} from 'lucide-react';
import dummySeries from '@/mock-files/series.json';
import dummyArticles from '@/mock-files/published-articles.json';
import {ContentCard} from '@/features/article-publishing/components/reference-card/ContentCard';
import {Badge} from '@/shared/components/ui/badge';
import {
    ArticleCardData,
    SeriesCardData,
} from '@/features/article-publishing/types/reference-card.type';

interface SeriesLandingPageProps {
    params: Promise<{
        seriesSlug: string;
    }>;
}

export default async function SeriesLandingPage({
                                                    params,
                                                }: SeriesLandingPageProps) {
    const {seriesSlug} = await params;

    const rawSeries =
        (dummySeries as { series?: SeriesCardData[] }).series || [];
    const rawArticles =
        (dummyArticles as { articles?: ArticleCardData[] }).articles || [];

    const currentSeries = rawSeries.find((s) => s.slug === seriesSlug);

    if (!currentSeries) {
        notFound();
    }

    const memberArticles = rawArticles
        .filter(
            (art) =>
                art.seriesId === currentSeries.uniqueId &&
                art.lifecycle?.toLowerCase() === 'published'
        )
        .sort((a, b) => {
            const dateA = new Date(a.firstPublishedAt || a.publishedAt || 0).getTime();
            const dateB = new Date(b.firstPublishedAt || b.publishedAt || 0).getTime();
            return dateA - dateB;
        });

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-10">
            <header className="flex flex-col md:flex-row gap-6 items-start rounded-xl border bg-card p-6 shadow-sm">
                <div className="relative h-44 w-full md:w-44 shrink-0 bg-muted rounded-lg overflow-hidden border">
                    <Image
                        src={currentSeries.thumbnailImage}
                        alt={currentSeries.thumbnailAltText || currentSeries.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div
                        className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm p-1.5 rounded-md shadow-sm border">
                        <Layers className="w-4 h-4 text-primary"/>
                    </div>
                </div>

                <div className="flex flex-col justify-between space-y-4 flex-1">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary">
                                Series Collection
                            </Badge>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            {currentSeries.title}
                        </h1>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {currentSeries.description}
                        </p>
                    </div>

                    {currentSeries.defaultTags && currentSeries.defaultTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {currentSeries.defaultTags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <section className="space-y-6">
                <div className="border-b pb-3 flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Articles in this Series
                    </h2>
                    <span className="text-xs font-medium text-muted-foreground">
            {memberArticles.length} {memberArticles.length === 1 ? 'Article' : 'Articles'}
          </span>
                </div>

                {memberArticles.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                        No published articles in this series yet.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 items-center">
                        {memberArticles.map((article) => (
                            <ContentCard key={article.uniqueId} type="article" data={article}/>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}