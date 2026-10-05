import { Skeleton } from "@/shared/components/ui/skeleton";

export function ContactSkeleton() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Skeleton className="h-8 w-52 my-5 lg:mt-5 lg:h-9" />

                <div className="space-y-2">
                    <Skeleton className="h-11 w-full rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                </div>
            </div>
            <Skeleton className="h-4 w-44 mx-auto mb-5" />
        </section>
    );
}