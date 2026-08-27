import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { useArticleFormStore } from '../stores/useArticleFormStore';
import { articleFormSchema, type ArticleFormValues } from '../schemas/articleFormSchema';

const LOCAL_STORAGE_KEY_PREFIX = 'draft_fallback_';

function getCacheKey(articleId: string | number | undefined | null): string | null {
    if (articleId === undefined || articleId === null || articleId === '') {
        return null;
    }
    return `${LOCAL_STORAGE_KEY_PREFIX}${articleId}`;
}

export function useRestoreDraftFallback() {
    const { reset } = useFormContext<ArticleFormValues>();
    const articleId = useArticleFormStore((state) => state.articleId);

    const restoredForArticleIdRef = useRef<string | number | null>(null);

    useEffect(() => {
        const cacheKey = getCacheKey(articleId);
        if (!cacheKey) return;
        if (restoredForArticleIdRef.current === articleId) return;

        const cachedData = localStorage.getItem(cacheKey);
        if (!cachedData) return;

        try {
            const parsedData = JSON.parse(cachedData);

            const validation = articleFormSchema.partial().safeParse(parsedData);
            if (!validation.success) {
                console.warn('Cached draft failed schema validation, discarding:', validation.error);
                localStorage.removeItem(cacheKey);
                return;
            }

            reset(validation.data as Partial<ArticleFormValues>);
            restoredForArticleIdRef.current = articleId;
            toast.info('Unsaved offline changes have been restored!');
        } catch (error) {
            console.error('Failed to restore draft from localStorage:', error);
            localStorage.removeItem(cacheKey);
        }
    }, [articleId, reset]);
}