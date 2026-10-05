import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";

export function StackSkeleton() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Skeleton className="h-8 w-48 my-5 lg:mt-5 lg:h-9" />

                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-32 rounded-md" />
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                    <Skeleton className="h-6 w-36 mb-2" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-16 w-full rounded-md" />
                    </div>
                </div>
            </div>
            <Separator />
        </section>
    );
}