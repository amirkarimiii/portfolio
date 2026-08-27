'use server';

import type { ArticleFormValues } from '../schemas/articleFormSchema';
import { ArticleRepository } from "@/features/article-publishing/repository/articleRepository";

interface SaveDraftInput {
    uniqueId: string;
    formData: Partial<ArticleFormValues>;
}

export async function saveDraftAction({ uniqueId, formData }: SaveDraftInput) {
    try {
        if (!uniqueId) {
            return {
                success: false,
                error: 'Article ID is required for saving draft',
            };
        }

        const draftArticle = await ArticleRepository.saveDraftArticle(uniqueId, formData);
        return { success: true, data: draftArticle };
    } catch (error) {
        console.error('Failed to save draft:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Something went wrong while saving draft',
        };
    }
}