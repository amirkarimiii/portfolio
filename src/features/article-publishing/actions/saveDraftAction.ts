'use server';

import type { ArticleFormValues } from '../schemas/articleFormSchema';
import { ArticleRepository } from "@/features/article-publishing/repository/articleRepository";
import { isReservedSlug } from "@/features/article-publishing/utils/slugValidation";

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

        if (formData.slug && formData.slug.trim() !== '') {
            const slugExists = await ArticleRepository.isSlugExists(formData.slug, uniqueId);
            if (slugExists) {
                return {
                    success: false,
                    error: 'This slug already exists',
                    field: 'slug',
                };
            }

            if (isReservedSlug(formData.slug)) {
                return {
                    success: false,
                    field: 'slug',
                    error: 'This slug is reserved and cannot be used.',
                };
            }
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