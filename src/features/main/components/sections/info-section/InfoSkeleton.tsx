import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";

export function InfoSkeleton() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-9 w-28 rounded-md" />
                    <Skeleton className="h-9 w-44 rounded-md" />
                </div>

                <Skeleton className="h-8 w-40 mt-3 lg:mt-5 lg:h-9" />

                <div className="mt-10 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-72" />
                </div>

                <div className="flex flex-col gap-3 mt-3 md:flex-row">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                </div>
            </div>
            <Separator />
        </section>
    );
}