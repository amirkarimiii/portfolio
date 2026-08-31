import { Suspense } from 'react';
import { DraftStack } from '@/features/article-publishing/components/DraftStack';

interface DraftsPageProps {
    searchParams: Promise<{
        page?: string;
        sort?: string;
    }>;
}

export default async function DraftsPage(props: DraftsPageProps) {
    const searchParams = await props.searchParams;

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense fallback={<div className="py-12 text-center text-sm text-muted-foreground">Loading drafts...</div>}>
                <DraftStack searchParams={searchParams} />
            </Suspense>
        </main>
    );
}