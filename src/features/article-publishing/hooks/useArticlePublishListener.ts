'use client';

import { useEffect } from 'react';
import { articleDraftChannel } from '../channels/articleDraftChannel';

interface UseArticlePublishListenerProps {
    currentArticleId: string;
}

export function useArticlePublishListener({ currentArticleId }: UseArticlePublishListenerProps) {
    useEffect(() => {
        const unsubscribe = articleDraftChannel.subscribe((event) => {
            if (event.type === 'ARTICLE_PUBLISHED' && event.articleId === currentArticleId) {
                if (currentArticleId) {
                    localStorage.removeItem(`draft_fallback_${currentArticleId}`);
                }

                window.location.reload();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [currentArticleId]);
}