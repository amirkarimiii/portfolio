import { Suspense } from 'react';
import { ArticleStack } from "@/features/article-publishing/components/ArticleStack";
import { ArticleStackSkeleton } from "@/features/article-publishing/components/reference-card/ArticleCardSkeleton";

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        sort?: string;
    }>;
}

export default async function BlogPage(props: BlogPageProps) {
    const searchParams = await props.searchParams;

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <Suspense fallback={<ArticleStackSkeleton />}>
                <ArticleStack searchParams={searchParams} />
            </Suspense>
        </main>
    );
}