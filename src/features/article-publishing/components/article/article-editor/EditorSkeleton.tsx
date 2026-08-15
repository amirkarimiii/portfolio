import { Skeleton } from "@/shared/components/ui/skeleton";

export function EditorSkeleton() {
    return (
        <div className="mx-auto mt-6 max-w-[728px] space-y-4">
            <div className="mx-auto flex h-10 w-fit items-center gap-2 rounded-md border bg-background p-1 shadow-sm">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-16" />
            </div>
            <div className="mt-4 min-h-[500px] w-full max-w-[728px] rounded-lg border bg-background p-6 md:p-8 space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}