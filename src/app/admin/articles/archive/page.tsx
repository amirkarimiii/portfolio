import { Suspense } from 'react';
import { ArchivedArticleStack } from '@/features/article-publishing/components/ArchivedArticleStack';

interface ArchivePageProps {
    searchParams: Promise<{
        page?: string;
        sort?: string;
    }>;
}

export default async function ArchivePage(props: ArchivePageProps) {
    const searchParams = await props.searchParams;

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense fallback={<div className="py-12 text-center text-sm text-muted-foreground">Loading archived articles...</div>}>
                <ArchivedArticleStack searchParams={searchParams} />
            </Suspense>
        </main>
    );
}