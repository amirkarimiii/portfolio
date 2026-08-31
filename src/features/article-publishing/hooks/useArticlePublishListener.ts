'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { articleDraftChannel } from '../channels/articleDraftChannel';

interface UseArticlePublishListenerProps {
    currentArticleId: string;
}

export function useArticlePublishListener({ currentArticleId }: UseArticlePublishListenerProps) {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = articleDraftChannel.subscribe((event) => {
            if (event.type === 'ARTICLE_PUBLISHED' && event.articleId === currentArticleId) {
                if (currentArticleId) {
                    localStorage.removeItem(`draft_fallback_${currentArticleId}`);
                }

                if (event.seriesSlug && event.slug) {
                    router.push(`/series/${event.seriesSlug}/${event.slug}`);
                } else if (event.slug) {
                    router.push(`/blog/${event.slug}`);
                } else {
                    router.push('/admin/articles/drafts');
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [currentArticleId, router]);
}