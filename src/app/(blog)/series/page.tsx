import { Suspense } from 'react';
import {SeriesStack} from "@/features/article-publishing/components/SeriesStack";

interface SeriesPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function SeriesPage(props: SeriesPageProps) {
    const searchParams = await props.searchParams;

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense
                fallback={
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        Loading series...
                    </div>
                }
            >
                <SeriesStack searchParams={searchParams} />
            </Suspense>
        </main>
    );
}