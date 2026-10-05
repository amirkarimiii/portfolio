import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function SeriesCardSkeleton() {
    return (
        <Card className="overflow-hidden w-full flex flex-col sm:flex-row p-0 border">
            <div className="relative w-full sm:w-36 md:w-40 aspect-square shrink-0">
                <Skeleton className="w-full h-full rounded-none" />
                <Skeleton className="absolute top-2 right-2 w-7 h-7 rounded-md" />
            </div>

            <div className="flex flex-col justify-between p-3.5 sm:p-4 flex-1 min-w-0">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-14 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-12 rounded-md" />
                </div>
            </div>
        </Card>
    );
}

export function SeriesStackSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            <div className="flex flex-col gap-4 items-center">
                <SeriesCardSkeleton />
                <SeriesCardSkeleton />
                <SeriesCardSkeleton />
            </div>
        </div>
    );
}