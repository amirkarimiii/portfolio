import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ArticleCardSkeleton } from "@/features/article-publishing/components/reference-card/ArticleCardSkeleton";

export function SeriesLandingSkeleton() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Card className="p-6 sm:p-8 space-y-4 border">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                </div>

                <Skeleton className="h-9 w-3/4 sm:h-10" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="flex gap-1 pt-2">
                    <Skeleton className="h-5 w-14 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded-md" />
                </div>
            </Card>

            <div className="space-y-4 pt-4">
                <Skeleton className="h-6 w-40" />

                <div className="flex flex-col gap-4 items-center">
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                </div>
            </div>
        </main>
    );
}