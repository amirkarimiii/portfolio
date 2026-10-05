import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export function ProjectsSkeleton() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Skeleton className="h-8 w-44 my-5 lg:mt-5 lg:h-9" />

                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-9 w-28 rounded-md" />
                    <Skeleton className="h-9 w-32 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>

                <Card className="w-full">
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-5 h-5 rounded-full" />
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-5 w-12 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3 md:flex-row">
                            <div className="w-full sm:min-w-xs max-w-sm mx-auto">
                                <Card className="p-5">
                                    <Skeleton className="w-full aspect-[1.62] rounded-md" />
                                    <Skeleton className="h-6 w-40 mx-auto mt-4 rounded-full" />
                                </Card>
                            </div>

                            <div className="md:w-md space-y-4">
                                <div>
                                    <Skeleton className="h-7 w-28 rounded-lg" />
                                    <Skeleton className="h-4 w-48 mt-2" />
                                </div>
                                <div>
                                    <Skeleton className="h-7 w-24 rounded-lg" />
                                    <Skeleton className="h-4 w-40 mt-2" />
                                </div>
                            </div>
                        </div>

                        <Skeleton className="h-10 w-full max-w-md mt-5 mx-auto rounded-md" />
                    </CardContent>
                </Card>
            </div>
            <Separator />
        </section>
    );
}