'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleView } from './ArticleView';
import { articleDraftChannel } from '../../channels/articleDraftChannel';
import { ArticleRecord } from '../../repository/articleRepository';
import { Button } from '@/shared/components/ui/button';
import { publishArticleAction } from '../../actions/publishArticleAction';
import { toast } from 'sonner';

interface PreviewArticleClientProps {
    initialArticle: ArticleRecord;
    seriesTitle?: string;
}

export function PreviewArticleClient({ initialArticle, seriesTitle }: PreviewArticleClientProps) {
    const [article, setArticle] = useState<ArticleRecord>(initialArticle);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = articleDraftChannel.subscribe((event) => {
            if (event.type === 'DRAFT_UPDATED' && event.articleId === article.uniqueId) {
                startTransition(() => {
                    router.refresh();
                });
            }
        });

        return () => unsubscribe();
    }, [article.uniqueId, router]);

    useEffect(() => {
        setArticle(initialArticle);
    }, [initialArticle]);

    const handlePublish = async () => {
        try {
            const result = await publishArticleAction({ uniqueId: article.uniqueId });
            if (result.success) {
                toast.success('article has been successfully published!');

                articleDraftChannel.publish({
                    type: 'ARTICLE_PUBLISHED',
                    articleId: article.uniqueId,
                });

                window.close();
            } else {
                toast.error(result.error || 'error in publishing article');
            }
        } catch {
            toast.error('unexpected error during publishing article');
        }
    };

    return (
        <div className="relative">
            <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground">draft preview</span>
                </div>
                <Button onClick={handlePublish} disabled={isPending}>
                    {isPending ? 'publishing...' : 'publish'}
                </Button>
            </div>

            <ArticleView
                article={{
                    title: article.title,
                    summary: article.summary,
                    tags: article.tags,
                    coverImage: article.coverImage,
                    coverAltText: article.coverAltText,
                    content: article.content,
                    seriesTitle: seriesTitle,
                }}
            />
        </div>
    );
}