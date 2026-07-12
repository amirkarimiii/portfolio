import {Skeleton} from "@/components/ui/shadcn/skeleton";

export default function EditorSectionSkeleton() {
    return (
        <div className="mt-10 w-full rounded-md border p-4">
            <div className="min-h-[300px] space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    );
}