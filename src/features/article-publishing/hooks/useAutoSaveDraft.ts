import { useCallback, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useArticleFormStore } from '../stores/useArticleFormStore';
import { useDraftSyncStore } from '../stores/useDraftSyncStore';
import { saveDraftAction } from '../actions/saveDraftAction';
import type { ArticleFormValues } from '../schemas/articleFormSchema';

const INACTIVITY_DELAY = 5000;

export function useAutoSaveDraft() {
    const { watch, getValues } = useFormContext<ArticleFormValues>();
    const articleId = useArticleFormStore((state) => state.articleId);
    const setDraftStatus = useDraftSyncStore((state) => state.setStatus);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const saveVersionRef = useRef(0);
    const isSavingRef = useRef(false);

    const executeAutoSave = useCallback(async () => {
        const currentVersion = ++saveVersionRef.current;
        isSavingRef.current = true;
        setDraftStatus('pending');

        try {
            const currentData = getValues();

            const payload: Partial<ArticleFormValues> =
                structuredClone(currentData);

            const result = await saveDraftAction({
                uniqueId: articleId,
                formData: payload,
            });

            if (saveVersionRef.current !== currentVersion) return;

            setDraftStatus(result.success ? 'success' : 'failed');
        } catch {
            if (saveVersionRef.current !== currentVersion) return;
            setDraftStatus('failed');
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
    }, [watch, executeAutoSave]);
}