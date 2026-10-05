import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function ArticleCardSkeleton() {
    return (
        <Card className="overflow-hidden w-full flex flex-col sm:flex-row p-0 border">
            <Skeleton className="w-full sm:w-36 md:w-40 aspect-square shrink-0 rounded-none" />

            <div className="flex flex-col justify-between p-3.5 sm:p-4 flex-1 min-w-0">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex gap-1">
                        <Skeleton className="h-5 w-12 rounded-md" />
                        <Skeleton className="h-5 w-16 rounded-md" />
                    </div>
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </Card>
    );
}

export function ArticleStackSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-8 w-36 rounded-lg" />
            </div>

            <div className="flex flex-col gap-4 items-center">
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
            </div>
        </div>
    );
}