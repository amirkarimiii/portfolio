import { Skeleton } from "@/shared/components/ui/skeleton";

export function ArticleViewSkeleton() {
    return (
        <article className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
            <header className="space-y-4">
                <div className="relative hidden sm:block w-full aspect-4/1 md:aspect-5/1 overflow-hidden rounded-2xl border">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="relative sm:hidden w-full aspect-5/2 overflow-hidden rounded-2xl border">
                    <Skeleton className="w-full h-full" />
                </div>

                <Skeleton className="h-4 w-36 rounded-md" />

                <div className="space-y-2">
                    <Skeleton className="h-8 w-4/5 sm:h-9 md:h-10" />
                    <Skeleton className="h-8 w-2/3 sm:h-9 md:h-10" />
                </div>

                <div className="space-y-1.5 pt-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-md" />
                </div>
            </header>

            <main className="space-y-6 pt-4">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                </div>

                <Skeleton className="w-full aspect-video rounded-xl my-6" />

                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-9/12" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </main>
        </article>
    );
}