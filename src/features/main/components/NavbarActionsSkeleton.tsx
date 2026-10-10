import { Skeleton } from "@/shared/components/ui/skeleton";

export function NavbarActionsSkeleton() {
    return (
        <>
            <div className="flex flex-row gap-1">
                <Skeleton className="w-9 h-9 rounded-md" />
                <Skeleton className="w-9 h-9 rounded-md" />
            </div>
            <div className="flex flex-row gap-1">
                <Skeleton className="w-9 h-9 rounded-md" />
            </div>
        </>
    );
}