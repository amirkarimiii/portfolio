import { useCallback, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { useArticleFormStore } from '../stores/useArticleFormStore';
import { useDraftSyncStore } from '../stores/useDraftSyncStore';

import { articleDraftChannel } from '../channels/articleDraftChannel';
import type { ArticleFormValues } from '../schemas/articleFormSchema';
import { saveDraftAction } from '@/features/article-publishing/actions/saveDraftAction';

const INACTIVITY_DELAY = 5000;
const RETRY_DELAYS = [500, 1000, 2000, 4000, 8000];
const LOCAL_STORAGE_KEY_PREFIX = 'draft_fallback_';
const AUTO_SAVE_ERROR_TOAST_ID = 'auto-save-network-error';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getCacheKey(articleId: string | number | undefined | null): string | null {
    if (!articleId) return null;
    return `${LOCAL_STORAGE_KEY_PREFIX}${articleId}`;
}

export function useAutoSaveDraft() {
    const { watch, getValues, formState: { isDirty } } = useFormContext<ArticleFormValues>();
    const articleId = useArticleFormStore((state) => state.articleId);
    const setDraftStatus = useDraftSyncStore((state) => state.setStatus);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const saveVersionRef = useRef(0);
    const isSavingRef = useRef(false);
    const isUserTriggeredRef = useRef(false);

    const executeAutoSave = useCallback(async () => {
        if (isSavingRef.current || !isUserTriggeredRef.current) return;

        const currentVersion = ++saveVersionRef.current;
        isSavingRef.current = true;
        setDraftStatus('pending');

        try {
            const currentData = getValues();
            const payload: Partial<ArticleFormValues> = structuredClone(currentData);
            const cacheKey = getCacheKey(articleId);

            if (cacheKey) {
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(payload));
                } catch (e) {
                    console.warn('Failed to save draft to localStorage fallback:', e);
                }
            }

            let isSuccess = false;
            let lastError: unknown = null;

            for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
                if (saveVersionRef.current !== currentVersion) return;

                if (attempt > 0) {
                    await sleep(RETRY_DELAYS[attempt - 1]);
                    if (saveVersionRef.current !== currentVersion) return;
                }

                try {
                    const result = await saveDraftAction({
                        uniqueId: articleId,
                        formData: payload,
                    });

                    if (result.success) {
                        isSuccess = true;
                        break;
                    }
                    lastError = null;
                    break;
                } catch (error) {
                    console.warn(`Auto-save attempt ${attempt + 1} failed:`, error);
                    lastError = error;
                }
            }

            if (saveVersionRef.current !== currentVersion) return;

            if (isSuccess) {
                if (cacheKey) {
                    localStorage.removeItem(cacheKey);
                }
                toast.dismiss(AUTO_SAVE_ERROR_TOAST_ID);
                setDraftStatus('success');

                if (articleId) {
                    articleDraftChannel.publish({
                        type: 'DRAFT_UPDATED',
                        articleId,
                        slug: payload.slug,
                        seriesId: payload.seriesId,
                    });
                }
            } else {
                setDraftStatus('failed');
                if (lastError !== null) {
                    toast.error('Network connection issue. Auto-save failed.', {
                        duration: Infinity,
                        id: AUTO_SAVE_ERROR_TOAST_ID,
                    });
                }
            }
        } catch (error) {
            console.warn('Auto-save failed unexpectedly:', error);
            if (saveVersionRef.current === currentVersion) {
                setDraftStatus('failed');
            }
        } finally {
            if (saveVersionRef.current === currentVersion) {
                isSavingRef.current = false;
            }
        }
    }, [articleId, getValues, setDraftStatus]);

    useEffect(() => {
        let isFirstEmit = true;

        const subscription = watch(() => {
            if (isFirstEmit) {
                isFirstEmit = false;
                return;
            }

            if (!isUserTriggeredRef.current && isDirty) {
                isUserTriggeredRef.current = true;
            }

            if (!isUserTriggeredRef.current) return;

            setDraftStatus('idle');

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                executeAutoSave();
            }, INACTIVITY_DELAY);
        });

        return () => {
            subscription.unsubscribe();
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            saveVersionRef.current++;
        };
    }, [watch, executeAutoSave, isDirty, setDraftStatus]);
}