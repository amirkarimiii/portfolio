import { Skeleton } from "@/shared/components/ui/skeleton";

export function ArticleViewSkeleton() {
    return (
        <article className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <div className="space-y-4 border-b pb-6">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-10 w-4/5 sm:h-12" />

                <div className="flex items-center gap-4 pt-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                </div>

                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
            </div>

            <Skeleton className="w-full aspect-video rounded-xl" />

            <div className="space-y-4 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-32 w-full rounded-lg my-6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-9/12" />
            </div>
        </article>
    );
}