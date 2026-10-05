import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";

export function BannerSkeleton() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 flex flex-col gap-10 lg:flex-row-reverse mb-5 lg:mt-20">
                <div className="w-full lg:my-auto flex flex-col items-center">
                    <Skeleton className="w-60 h-60 md:w-90 md:h-90 rounded-full" />
                    <Skeleton className="h-6 w-32 mt-5 rounded-full" />
                </div>

                <div className="w-full flex flex-col justify-center">
                    <Skeleton className="h-9 w-64 lg:h-10 lg:w-80" />

                    <Skeleton className="h-4 w-40 mt-2" />

                    <Skeleton className="h-5 w-full mt-3" />
                    <Skeleton className="h-5 w-3/4 mt-1" />

                    <Skeleton className="h-10 w-full my-5 rounded-md" />

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-1" />

                    <Skeleton className="h-20 w-full mt-4 rounded-lg" />
                    <div className="flex gap-1 mt-2">
                        <Skeleton className="h-9 flex-1 rounded-md" />
                        <Skeleton className="h-9 flex-1 rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-full mt-2 rounded-md" />
                </div>
            </div>
            <Separator />
        </section>
    );
}