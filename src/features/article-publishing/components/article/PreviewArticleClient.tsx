'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleView } from './ArticleView';
import { articleDraftChannel } from '../../channels/articleDraftChannel';
import { Button } from '@/shared/components/ui/button';
import { publishArticleAction } from '../../actions/publishArticleAction';
import { ArticleItem } from "@/features/article-publishing/types/article-item.type";
import {notify} from "@/shared/notification/notification.service";
import {logger} from "@/shared/logger/logger";

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
                    notify.success("ARTICLE_PUBLISHED");

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
                    logger.warn('Publish article failed with business error', {
                        context: 'handlePublish',
                        uniqueId: article.uniqueId,
                        error: result.error,
                    });
                    const errorMessage = result.error?.message || 'Error in publishing article';
                    notify.error(errorMessage);
                }
            } catch (error) {
                logger.error(
                    error as Error,
                    'Unexpected error while publishing article',
                    { context: 'handlePublish', uniqueId: article.uniqueId }
                );
                notify.error("ARTICLE_PUBLISH_UNEXPECTED_ERROR");
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