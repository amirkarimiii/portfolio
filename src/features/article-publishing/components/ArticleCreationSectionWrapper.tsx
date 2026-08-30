'use client';

import { useEffect, useState } from 'react';
import { useArticleFormStore } from '../stores/useArticleFormStore';
import { ArticleCreationSection } from './ArticleCreationSection';
import { mapDraftArticleToFormValues } from '../utils/mapDraftArticleToFormValues';
import type { ArticleFormValues } from '../schemas/articleFormSchema';
import { Loader2 } from 'lucide-react';
import {getDraftArticleAction} from "@/features/article-publishing/actions/articleCSWActions";

interface ArticleCreationSectionWrapperProps {
    uniqueId?: string;
}

export function ArticleCreationSectionWrapper({ uniqueId: initialUniqueId }: ArticleCreationSectionWrapperProps) {
    const storeArticleId = useArticleFormStore((state) => state.articleId);
    const setArticleId = useArticleFormStore((state) => state.setArticleId);

    const [isLoading, setIsLoading] = useState(!!initialUniqueId);
    const [initialValues, setInitialValues] = useState<ArticleFormValues | undefined>(undefined);
    const [notFound, setNotFound] = useState(false);

    const finalUniqueId = initialUniqueId || storeArticleId;

    useEffect(() => {
        if (!initialUniqueId) {
            setIsLoading(false);
            return;
        }

        setArticleId(initialUniqueId);

        async function loadDraft() {
            try {
                const draft = await getDraftArticleAction(initialUniqueId!);
                if (draft) {
                    setInitialValues(mapDraftArticleToFormValues(draft));
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Failed to load draft for editing:', error);
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        }

        loadDraft();
    }, [initialUniqueId, setArticleId]);

    if (isLoading) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Loading draft article...</p>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-2">
                <p className="text-lg font-semibold text-red-600">Article Draft Not Found</p>
                <p className="text-sm text-muted-foreground">
                    The requested draft article with ID `{initialUniqueId}` could not be found.
                </p>
            </div>
        );
    }

    return (
        <ArticleCreationSection
            uniqueId={finalUniqueId}
            initialValues={initialValues}
        />
    );
}