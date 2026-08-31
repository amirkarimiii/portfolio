import { Suspense } from 'react';
import {PreviewArticleSectionWrapper} from "@/features/article-publishing/components/PreviewArticleSectionWrapper";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PreviewPageProps {
    params: Promise<{
        articleId: string;
    }>;
}

export default async function PreviewArticlePage(props: PreviewPageProps) {
    const { articleId } = await props.params;

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8">
            <Suspense
                fallback={
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        Loading preview draft...
                    </div>
                }
            >
                <PreviewArticleSectionWrapper articleId={articleId} />
            </Suspense>
        </main>
    );
}