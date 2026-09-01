'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleView } from './ArticleView';
import { articleDraftChannel } from '../../channels/articleDraftChannel';
import { Button } from '@/shared/components/ui/button';
import { publishArticleAction } from '../../actions/publishArticleAction';
import { toast } from 'sonner';
import { ArticleItem } from "@/features/article-publishing/types/article-item.type";

interface PreviewArticleClientProps {
    initialArticle: ArticleItem;
    seriesTitle?: string;
}

export function PreviewArticleClient({ initialArticle, seriesTitle }: PreviewArticleClientProps) {
    const [article, setArticle] = useState<ArticleItem>(initialArticle);
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

    const handlePublish = () => {
        startTransition(async () => {
            try {
                const result = await publishArticleAction({ uniqueId: article.uniqueId });

                if (result.success) {
                    toast.success('Article has been successfully published!');

                    const publishedSlug = result.data.slug;
                    const publishedSeriesSlug = result.data.seriesSlug || null;

                    articleDraftChannel.publish({
                        type: 'ARTICLE_PUBLISHED',
                        articleId: article.uniqueId,
                        slug: publishedSlug,
                        seriesSlug: publishedSeriesSlug,
                        seriesId: article.seriesId,
                    });

                    localStorage.removeItem(`draft_fallback_${article.uniqueId}`);

                    if (window.opener && window.opener !== window) {
                        window.close();
                    } else {
                        if (publishedSeriesSlug && publishedSlug) {
                            router.push(`/series/${publishedSeriesSlug}/${publishedSlug}`);
                        } else if (publishedSlug) {
                            router.push(`/blog/${publishedSlug}`);
                        }
                    }
                } else {
                    const errorMessage = result.error?.message || 'Error in publishing article';
                    toast.error(errorMessage);
                }
            } catch {
                toast.error('Unexpected error during publishing article');
            }
        });
    };

    return (
        <div className="relative">
            <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground">Draft Preview</span>
                </div>
                <Button onClick={handlePublish} disabled={isPending}>
                    {isPending ? 'Publishing...' : 'Publish'}
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